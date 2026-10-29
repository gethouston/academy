// The program map: every level, course and lesson, in order, in both languages. Navigation
// (the program page, course pages, the sidebar, next/previous, progress) is built from this.
// A lesson with a `slug` has a page at /courses/<course id>/<slug>/; one without is coming soon.

export type Lang = 'en' | 'es';
type T = Record<Lang, string>;

export interface Lesson {
	slug?: string;
	title: T;
	minutes?: number;
	kind?: 'lesson' | 'project';
}

export interface Section {
	title: T;
	/** How many of the course's lessons, in order, belong to this section. */
	count: number;
}

export interface Course {
	id: string;
	number: number;
	title: T;
	ship: T;
	hours: number;
	lessons: Lesson[];
	sections?: Section[];
}

export interface Level {
	number: number;
	title: T;
	courses: Course[];
}

const soon = (en: string, es: string): Lesson => ({ title: { en, es } });

export const program: Level[] = [
	{
		number: 1,
		title: { en: 'Foundations', es: 'Fundamentos' },
		courses: [
			{
				id: 'hello-internet',
				number: 0,
				title: { en: 'Hello, internet', es: 'Hola, internet' },
				ship: {
					en: 'A personal page, live at a URL you open on your phone',
					es: 'Una página personal, en vivo en una URL que abres en tu celular',
				},
				hours: 1,
				sections: [{ title: { en: 'Your first hour', es: 'Tu primera hora' }, count: 4 }],
				lessons: [
					{ slug: 'set-up-your-workbench', title: { en: 'Set up your workbench', es: 'Prepara tu mesa de trabajo' }, minutes: 15 },
					{ slug: 'ask-for-your-page', title: { en: 'Ask for your page', es: 'Pide tu página' }, minutes: 20 },
					{ slug: 'put-it-on-the-internet', title: { en: 'Put it on the internet', es: 'Ponla en internet' }, minutes: 15 },
					{ slug: 'check-it', title: { en: 'Check it', es: 'Verifícala' }, minutes: 10, kind: 'project' },
				],
			},
			{
				id: 'how-software-works',
				number: 1,
				title: { en: 'How software works', es: 'Cómo funciona el software' },
				ship: {
					en: 'A page with live data from an API, and a secret key kept safe',
					es: 'Una página con datos en vivo de una API, y una clave secreta bien guardada',
				},
				hours: 10,
				sections: [
					{ title: { en: 'The basics', es: 'Lo básico' }, count: 5 },
					{ title: { en: 'Programs talking to programs', es: 'Programas que hablan con programas' }, count: 2 },
					{ title: { en: 'Data and people', es: 'Datos y personas' }, count: 2 },
					{ title: { en: 'Going online', es: 'En línea' }, count: 2 },
					{ title: { en: 'AI', es: 'IA' }, count: 1 },
				],
				lessons: [
					soon('Computers, files and folders, programs', 'Computadores, archivos y carpetas, programas'),
					soon('Apps vs websites vs "the cloud"', 'Apps vs sitios web vs "la nube"'),
					soon('The internet: client and server', 'Internet: cliente y servidor'),
					soon('Frontend and backend', 'Frontend y backend'),
					soon('What code is, and why you don’t need to read it', 'Qué es el código, y por qué no necesitas leerlo'),
					{ slug: 'apis', title: { en: 'APIs', es: 'APIs' }, minutes: 25 },
					{ slug: 'api-keys', title: { en: 'API keys', es: 'Claves de API' }, minutes: 20 },
					soon('Databases', 'Bases de datos'),
					soon('Accounts and login', 'Cuentas e inicio de sesión'),
					soon('Hosting and domains', 'Hosting y dominios'),
					soon('Open source and GitHub', 'Código abierto y GitHub'),
					soon('AI models: prompts, tokens, cost', 'Modelos de IA: prompts, tokens, costos'),
				],
			},
			{
				id: 'think-like-a-builder',
				number: 2,
				title: { en: 'Think like a builder', es: 'Piensa como constructor' },
				ship: {
					en: 'Your product’s brief, its slices, and slice 1 as a prototype',
					es: 'El brief de tu producto, sus rebanadas y la rebanada 1 como prototipo',
				},
				hours: 8,
				sections: [
					{ title: { en: 'The idea', es: 'La idea' }, count: 4 },
					{ title: { en: 'Slices', es: 'Rebanadas' }, count: 3 },
					{ title: { en: 'Building with an agent', es: 'Construir con un agente' }, count: 2 },
					{ title: { en: 'Learning from people', es: 'Aprender de las personas' }, count: 2 },
				],
				lessons: [
					soon('Problem before solution', 'El problema antes que la solución'),
					soon('Who it’s for, and what they need done', 'Para quién es, y qué necesita resolver'),
					{ slug: 'the-gta-6-problem', title: { en: 'The GTA 6 problem', es: 'El problema GTA 6' }, minutes: 25 },
					soon('The smallest useful version', 'La versión útil más pequeña'),
					soon('Slicing', 'Dividir en rebanadas'),
					soon('User stories and "done when"', 'Historias de usuario y "listo cuando"'),
					soon('Prototype vs product', 'Prototipo vs producto'),
					soon('Writing a brief an agent can follow', 'Escribir un brief que un agente pueda seguir'),
					soon('Plan mode: review before anything is built', 'Modo plan: revisar antes de construir'),
					soon('Testing each slice, with 3 real people', 'Probar cada rebanada, con 3 personas reales'),
					soon('Deciding what’s next', 'Decidir qué sigue'),
				],
			},
			{
				id: 'your-workshop',
				number: 3,
				title: { en: 'Your workshop', es: 'Tu taller' },
				ship: {
					en: 'Your product on GitHub, with save points, a proposal and a rollback',
					es: 'Tu producto en GitHub, con puntos de guardado, una propuesta y una vuelta atrás',
				},
				hours: 6,
				lessons: [],
			},
		],
	},
	{
		number: 2,
		title: { en: 'Going live', es: 'Salir en vivo' },
		courses: [
			{
				id: 'going-live',
				number: 4,
				title: { en: 'Going live', es: 'Salir en vivo' },
				ship: { en: 'Your product at a URL, with a preview for every change', es: 'Tu producto en una URL, con una vista previa para cada cambio' },
				hours: 6,
				lessons: [],
			},
			{
				id: 'data-that-survives',
				number: 5,
				title: { en: 'Data that survives', es: 'Datos que sobreviven' },
				ship: { en: 'A real database, and a backup you’ve restored', es: 'Una base de datos real, y una copia de seguridad que ya restauraste' },
				hours: 8,
				lessons: [],
			},
			{
				id: 'users-and-permissions',
				number: 6,
				title: { en: 'Users and permissions', es: 'Usuarios y permisos' },
				ship: { en: 'Login and roles, where nobody sees anyone else’s data', es: 'Inicio de sesión y roles, donde nadie ve los datos de los demás' },
				hours: 8,
				lessons: [],
			},
			{
				id: 'secrets-and-security',
				number: 7,
				title: { en: 'Secrets and not getting hacked', es: 'Secretos y cómo no te hackeen' },
				ship: { en: 'A security review of your product, with everything fixed', es: 'Una revisión de seguridad de tu producto, con todo corregido' },
				hours: 8,
				lessons: [],
			},
		],
	},
	{
		number: 3,
		title: { en: 'A real product', es: 'Un producto real' },
		courses: [
			{
				id: 'connecting-to-the-world',
				number: 8,
				title: { en: 'Connecting to the world', es: 'Conectarse con el mundo' },
				ship: { en: 'Email, an AI feature, and (optional) payments', es: 'Correos, una función de IA y (opcional) pagos' },
				hours: 8,
				lessons: [],
			},
			{
				id: 'keeping-it-alive',
				number: 9,
				title: { en: 'Keeping it alive', es: 'Mantenerlo vivo' },
				ship: { en: 'Error alerts, uptime checks, cost alerts, and an incident drill', es: 'Alertas de errores, monitoreo, alertas de costos y un simulacro de incidente' },
				hours: 6,
				lessons: [],
			},
			{
				id: 'launch-and-learn',
				number: 10,
				title: { en: 'Launch and learn', es: 'Lanzar y aprender' },
				ship: { en: 'Your first 10 real users, and one slice built from their feedback', es: 'Tus primeros 10 usuarios reales, y una rebanada hecha con lo que te dijeron' },
				hours: 6,
				lessons: [],
			},
		],
	},
	{
		number: 4,
		title: { en: 'Lead', es: 'Liderar' },
		courses: [
			{
				id: 'leading-agents',
				number: 11,
				title: { en: 'Leading agents', es: 'Liderar agentes' },
				ship: { en: 'A big feature built from a brief alone, accepted on evidence', es: 'Una función grande construida solo con un brief, aceptada con evidencia' },
				hours: 8,
				lessons: [],
			},
			{
				id: 'capstone',
				number: 12,
				title: { en: 'Capstone', es: 'Proyecto final' },
				ship: { en: 'Your product, live with real users for two weeks', es: 'Tu producto, en vivo con usuarios reales durante dos semanas' },
				hours: 40,
				lessons: [],
			},
		],
	},
];

export const courses: Course[] = program.flatMap((level) => level.courses);

export const langOf = (locale: string | undefined): Lang => (locale === 'es' ? 'es' : 'en');
const prefix = (lang: Lang) => (lang === 'es' ? '/es' : '');

export const prefixOf = prefix;
export const courseHref = (course: Course, lang: Lang) => `${prefix(lang)}/courses/${course.id}/`;
export const lessonHref = (course: Course, lesson: Lesson, lang: Lang) =>
	`${prefix(lang)}/courses/${course.id}/${lesson.slug}/`;
/** Progress key for a lesson: the same in both languages. */
export const lessonKey = (course: Course, lesson: Lesson) => `${course.id}/${lesson.slug}`;

/** The course's lessons grouped in sections (one section named after the course if none). */
export function sectionsOf(course: Course) {
	const sections = course.sections ?? [{ title: course.title, count: course.lessons.length }];
	let at = 0;
	return sections.map((section) => {
		const lessons = course.lessons.slice(at, at + section.count).map((lesson, i) => ({ lesson, index: at + i }));
		at += section.count;
		return { title: section.title, lessons };
	});
}

export const available = (course: Course) => course.lessons.filter((l) => l.slug);
export const isOpen = (course: Course) => available(course).length > 0;

/** Every lesson that has a page, in program order. */
export const allLessons = courses.flatMap((course) => available(course).map((lesson) => ({ course, lesson })));


export const ui = {
	en: {
		course: 'Course',
		level: 'Level',
		lesson: 'Lesson',
		project: 'Project',
		lessons: 'lessons',
		hours: 'hours',
		minutes: 'min',
		youShip: 'You’ll ship',
		overview: 'Overview',
		openCourse: 'Open course',
		start: 'Start course',
		continue: 'Continue',
		review: 'Review',
		comingSoon: 'Coming soon',
		curriculum: 'Curriculum',
		howItWorks: 'How it works',
		glossary: 'Glossary',
		getStarted: 'Get started',
		markComplete: 'Mark complete',
		completed: 'Completed',
		next: 'Next',
		prev: 'Previous',
		backToCourse: 'Back to course',
		lessonContents: 'Lesson contents',
		showLessons: 'Course lessons',
		done: 'done',
		continueTitle: 'Pick up where you left off',
		createdBy: 'Created by',
		follow: 'Follow on X',
		progressNote: 'Your progress is saved in this browser.',
		language: 'Español',
		languageHref: 'es',
		home: {
			title: ['Build real software', 'without writing code'],
			lead: 'A free, open-source program for people with no technical background. AI agents write the code; you learn everything around it, one real project at a time.',
			cta: 'View full curriculum',
			how: 'How it works',
			howLead: 'Writing code is no longer the hard part. What stops people is the world around the code: what an API is, where a key should live, how a page gets onto the internet. We teach exactly that, in order.',
			steps: [
				{ title: 'Learn', text: 'Every concept explained with a picture, in plain words. No jargon left unexplained.' },
				{ title: 'Build', text: 'Ask an AI agent to build it, watch what it does, and check the result. You never write code.' },
				{ title: 'Ship', text: 'Every course ends with something real, live on the internet. The finish line is a product with real users.' },
			],
			explore: 'What you’ll explore',
			exploreCta: 'Explore curriculum',
			madeBy: 'Made in the open',
			madeByLead: 'Houston Academy is free and open source, in English and Spanish. Follow along as it grows.',
			github: 'View on GitHub',
		},
		curriculumLead: 'One path, taken in order. Each course builds on the one before it and ends with something real that you ship. From Course 2 on, you build your own product, one slice at a time. About 100 hours, part-time.',
		pilot: 'This is an early pilot: Course 0 is complete, and Courses 1 and 2 have their first lessons.',
		footer: { academy: 'Academy', houston: 'Houston', follow: 'Follow', tagline: 'Learn to build real software with AI agents, without writing code.' },
	},
	es: {
		course: 'Curso',
		level: 'Nivel',
		lesson: 'Lección',
		project: 'Proyecto',
		lessons: 'lecciones',
		hours: 'horas',
		minutes: 'min',
		youShip: 'Vas a publicar',
		overview: 'Resumen',
		openCourse: 'Abrir curso',
		start: 'Empezar el curso',
		continue: 'Continuar',
		review: 'Repasar',
		comingSoon: 'Próximamente',
		curriculum: 'Programa',
		howItWorks: 'Cómo funciona',
		glossary: 'Glosario',
		getStarted: 'Empezar',
		markComplete: 'Marcar como completada',
		completed: 'Completada',
		next: 'Siguiente',
		prev: 'Anterior',
		backToCourse: 'Volver al curso',
		lessonContents: 'Contenido de la lección',
		showLessons: 'Lecciones del curso',
		done: 'listas',
		continueTitle: 'Sigue donde ibas',
		createdBy: 'Creado por',
		follow: 'Seguir en X',
		progressNote: 'Tu progreso se guarda en este navegador.',
		language: 'English',
		languageHref: 'en',
		home: {
			title: ['Construye software real', 'sin escribir código'],
			lead: 'Un programa gratuito y de código abierto para personas sin formación técnica. Los agentes de IA escriben el código; tú aprendes todo lo que hay alrededor, un proyecto real a la vez.',
			cta: 'Ver el programa completo',
			how: 'Cómo funciona',
			howLead: 'Escribir código ya no es lo difícil. Lo que frena a la gente es el mundo alrededor del código: qué es una API, dónde debe vivir una clave, cómo llega una página a internet. Enseñamos justo eso, en orden.',
			steps: [
				{ title: 'Aprende', text: 'Cada concepto explicado con una imagen, en palabras sencillas. Ninguna palabra técnica sin explicar.' },
				{ title: 'Construye', text: 'Pídele a un agente de IA que lo construya, mira lo que hace y verifica el resultado. Nunca escribes código.' },
				{ title: 'Publica', text: 'Cada curso termina con algo real, en vivo en internet. La meta es un producto con usuarios reales.' },
			],
			explore: 'Lo que vas a explorar',
			exploreCta: 'Explorar el programa',
			madeBy: 'Hecho en abierto',
			madeByLead: 'Houston Academy es gratis y de código abierto, en español e inglés. Síguela mientras crece.',
			github: 'Ver en GitHub',
		},
		curriculumLead: 'Un solo camino, en orden. Cada curso se apoya en el anterior y termina con algo real que publicas. Desde el Curso 2 construyes tu propio producto, una rebanada a la vez. Unas 100 horas, a tiempo parcial.',
		pilot: 'Esto es un piloto temprano: el Curso 0 está completo, y los Cursos 1 y 2 tienen sus primeras lecciones.',
		footer: { academy: 'Academy', houston: 'Houston', follow: 'Síguenos', tagline: 'Aprende a construir software real con agentes de IA, sin escribir código.' },
	},
} as const;

export const creator = { name: 'Julian Arango', handle: '@ja818_', url: 'https://x.com/ja818_' };
