// Every lesson and page ships in English and Spanish, or not at all: each file under
// src/content/<collection>/en/ needs a twin under src/content/<collection>/es/, and back.
import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const content = new URL('../src/content/', import.meta.url).pathname;

function files(dir) {
	return readdirSync(dir).flatMap((name) => {
		const path = join(dir, name);
		if (statSync(path).isDirectory()) return files(path);
		return /\.mdx?$/.test(name) ? [path] : [];
	});
}

let total = 0;
const missing = [];
for (const collection of readdirSync(content)) {
	const root = join(content, collection);
	if (!statSync(root).isDirectory()) continue;
	const [en, es] = ['en', 'es'].map((lang) => new Set(files(join(root, lang)).map((p) => relative(join(root, lang), p))));
	for (const p of en) if (!es.has(p)) missing.push(`missing Spanish version: ${collection}/es/${p}`);
	for (const p of es) if (!en.has(p)) missing.push(`missing English version: ${collection}/en/${p}`);
	total += en.size;
}
if (missing.length) {
	for (const m of missing) console.error(m);
	process.exit(1);
}
console.log(`locales ok: ${total} pages in English and Spanish`);
