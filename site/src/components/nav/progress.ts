// Learner progress, kept in this browser only (localStorage). Keys are "<course id>/<lesson slug>",
// the same in both languages. Every element that shows progress is painted from data attributes:
//   [data-lesson-key]                 → gets .is-done when that lesson is complete
//   [data-progress-keys="a b c"]      → a bar (.ha-bar-fill inside) and/or [data-progress-text]
//   [data-cta-keys="a b c"]           → a link pointed at the first lesson not done yet
//                                        (data-hrefs and data-labels hold the matching values)
//   [data-mark-complete="key"]        → a toggle button

const KEY = 'ha:progress:v1';

interface State {
	done: Record<string, string>;
	last?: string;
}

export function read(): State {
	try {
		const parsed = JSON.parse(localStorage.getItem(KEY) ?? '{}');
		return { done: parsed.done ?? {}, last: parsed.last };
	} catch {
		return { done: {} };
	}
}

function write(state: State) {
	try {
		localStorage.setItem(KEY, JSON.stringify(state));
	} catch {
		/* storage blocked: progress just isn't remembered */
	}
	paint();
}

export function setDone(key: string, done: boolean) {
	const state = read();
	if (done) state.done[key] = new Date().toISOString();
	else delete state.done[key];
	write(state);
}

export function setLast(key: string) {
	const state = read();
	state.last = key;
	write(state);
}

const keysOf = (el: Element, attr: string) => (el.getAttribute(attr) ?? '').split(' ').filter(Boolean);

export function paint() {
	const { done, last } = read();
	document.querySelectorAll('[data-lesson-key]').forEach((el) => {
		el.classList.toggle('is-done', Boolean(done[el.getAttribute('data-lesson-key') ?? '']));
	});
	document.querySelectorAll('[data-progress-keys]').forEach((el) => {
		const keys = keysOf(el, 'data-progress-keys');
		const n = keys.filter((k) => done[k]).length;
		const fill = el.querySelector<HTMLElement>('.ha-bar-fill');
		if (fill) fill.style.width = keys.length ? `${(100 * n) / keys.length}%` : '0%';
		const text = el.querySelector('[data-progress-text]');
		if (text) text.textContent = `${n} / ${keys.length} ${el.getAttribute('data-done-label') ?? ''}`;
		el.classList.toggle('is-done', keys.length > 0 && n === keys.length);
		el.classList.toggle('is-started', n > 0);
	});
	document.querySelectorAll<HTMLAnchorElement>('[data-cta-keys]').forEach((a) => {
		const keys = keysOf(a, 'data-cta-keys');
		const hrefs = JSON.parse(a.dataset.hrefs ?? '[]') as string[];
		const started = keys.some((k) => done[k]);
		const i = keys.findIndex((k) => !done[k]);
		const all = keys.length > 0 && i === -1;
		a.href = hrefs[all ? 0 : Math.max(i, 0)] ?? a.href;
		const label = a.querySelector('[data-cta-label]') ?? a;
		label.textContent = (all ? a.dataset.review : started ? a.dataset.continue : a.dataset.start) ?? '';
	});
	document.querySelectorAll<HTMLButtonElement>('[data-mark-complete]').forEach((b) => {
		const isDone = Boolean(done[b.dataset.markComplete ?? '']);
		b.setAttribute('aria-pressed', String(isDone));
		b.textContent = (isDone ? b.dataset.completed : b.dataset.mark) ?? '';
	});
	document.querySelectorAll<HTMLElement>('[data-continue]').forEach((box) => {
		const lessons = JSON.parse(box.dataset.lessons ?? '{}') as Record<string, { href: string; label: string }>;
		const target = last && lessons[last];
		const link = box.querySelector<HTMLAnchorElement>('a');
		const title = box.querySelector('[data-continue-title]');
		const label = box.querySelector('[data-continue-label]');
		if (!target || !link) return;
		link.href = target.href;
		if (label) label.textContent = target.label;
		if (title) title.textContent = box.dataset.continueTitle ?? '';
	});
}

export function init() {
	const w = window as unknown as { __haProgress?: boolean };
	if (w.__haProgress) return paint();
	w.__haProgress = true;
	document.addEventListener('click', (e) => {
		const b = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-mark-complete]');
		if (!b) return;
		const key = b.dataset.markComplete ?? '';
		setDone(key, !read().done[key]);
	});
	window.addEventListener('storage', (e) => e.key === KEY && paint());
	paint();
}
