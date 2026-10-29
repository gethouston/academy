// Static paths for every route, per language. The route files in src/pages and
// src/pages/es are one line each and call these.
import { getCollection } from 'astro:content';
import { available, courses, type Lang } from './program';

export async function pagePaths(lang: Lang) {
	const entries = await getCollection('pages', (e) => e.id.startsWith(`${lang}/`));
	return entries.map((entry) => ({ params: { page: entry.id.split('/')[1] }, props: { entry } }));
}

export async function coursePaths(lang: Lang) {
	const entries = await getCollection('courses', (e) => e.id.startsWith(`${lang}/`));
	return courses.flatMap((course) => {
		const entry = entries.find((e) => e.id === `${lang}/${course.id}`);
		return entry ? [{ params: { course: course.id }, props: { course, entry } }] : [];
	});
}

export async function lessonPaths(lang: Lang) {
	const entries = await getCollection('courses', (e) => e.id.startsWith(`${lang}/`));
	return courses.flatMap((course) =>
		available(course).map((lesson) => {
			const entry = entries.find((e) => e.id === `${lang}/${course.id}/${lesson.slug}`);
			if (!entry) throw new Error(`Missing lesson file: src/content/courses/${lang}/${course.id}/${lesson.slug}.mdx`);
			return { params: { course: course.id, lesson: lesson.slug as string }, props: { course, lesson, entry } };
		}),
	);
}
