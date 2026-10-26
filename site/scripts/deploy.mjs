// Deploys site/dist to Firebase Hosting through its REST API, so the only login needed is
// gcloud's. Locally: `gcloud auth login`, then `npm run deploy`. In CI, pass a token in
// GOOGLE_OAUTH_ACCESS_TOKEN (google-github-actions/auth with token_format: access_token).
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { gzipSync } from 'node:zlib';

const project = process.env.FIREBASE_PROJECT ?? 'gethouston';
const site = process.env.FIREBASE_SITE ?? 'gethouston-academy';
const dist = new URL('../dist/', import.meta.url).pathname;
const api = 'https://firebasehosting.googleapis.com/v1beta1';
const token =
	process.env.GOOGLE_OAUTH_ACCESS_TOKEN ?? execFileSync('gcloud', ['auth', 'print-access-token']).toString().trim();
const auth = { Authorization: `Bearer ${token}`, 'x-goog-user-project': project };

async function call(method, url, body, headers = { 'Content-Type': 'application/json' }) {
	const res = await fetch(url, { method, headers: { ...auth, ...headers }, body });
	if (!res.ok) throw new Error(`${method} ${url}: ${res.status} ${await res.text()}`);
	const text = await res.text();
	return text ? JSON.parse(text) : {};
}

function walk(dir) {
	return readdirSync(dir).flatMap((name) => {
		const path = join(dir, name);
		return statSync(path).isDirectory() ? walk(path) : [path];
	});
}

// Hosting rules: clean URLs, security headers, long cache for hashed assets.
const security = {
	'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
	'X-Frame-Options': 'SAMEORIGIN',
	'X-Content-Type-Options': 'nosniff',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
};
const config = {
	cleanUrls: true,
	trailingSlashBehavior: 'ADD',
	headers: [
		{ glob: '**', headers: security },
		{ glob: '**/*.html', headers: { 'Cache-Control': 'public, max-age=60, must-revalidate' } },
		{ glob: '/_astro/**', headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
	],
};

const files = {};
const blobs = {};
for (const path of walk(dist)) {
	const gz = gzipSync(readFileSync(path), { level: 9 });
	const hash = createHash('sha256').update(gz).digest('hex');
	files[`/${relative(dist, path)}`] = hash;
	blobs[hash] = gz;
}

const version = await call('POST', `${api}/sites/${site}/versions`, JSON.stringify({ config }));
const { uploadRequiredHashes = [], uploadUrl } = await call(
	'POST',
	`${api}/${version.name}:populateFiles`,
	JSON.stringify({ files }),
);
for (const hash of uploadRequiredHashes) {
	await call('POST', `${uploadUrl}/${hash}`, blobs[hash], { 'Content-Type': 'application/octet-stream' });
}
await call('PATCH', `${api}/${version.name}?update_mask=status`, JSON.stringify({ status: 'FINALIZED' }));
const message = process.env.DEPLOY_MESSAGE ?? `deploy ${new Date().toISOString()}`;
await call(
	'POST',
	`${api}/sites/${site}/releases?versionName=${encodeURIComponent(version.name)}`,
	JSON.stringify({ message }),
);
console.log(
	`Deployed ${Object.keys(files).length} files (${uploadRequiredHashes.length} uploaded) to https://${site}.web.app`,
);
