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

export interface Course {
	id: string;
	number: number;
	title: T;
	ship: T;
	hours: number;
	lessons: Lesson[];
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

export const courseHref = (course: Course, lang: Lang) => `${prefix(lang)}/courses/${course.id}/`;
export const lessonHref = (course: Course, lesson: Lesson, lang: Lang) =>
	`${prefix(lang)}/courses/${course.id}/${lesson.slug}/`;
/** Progress key for a lesson: the same in both languages. */
export const lessonKey = (course: Course, lesson: Lesson) => `${course.id}/${lesson.slug}`;

export const available = (course: Course) => course.lessons.filter((l) => l.slug);
export const isOpen = (course: Course) => available(course).length > 0;

/** Every lesson that has a page, in program order. */
export const allLessons = courses.flatMap((course) => available(course).map((lesson) => ({ course, lesson })));

/** Where a page sits in the program, from its id (e.g. "es/courses/hello-internet/apis"). */
export function locate(id: string) {
	const parts = id.replace(/^es\//, '').split('/');
	if (parts[0] !== 'courses') return undefined;
	const course = courses.find((c) => c.id === parts[1]);
	if (!course) return undefined;
	const lesson = parts[2] ? course.lessons.find((l) => l.slug === parts[2]) : undefined;
	return { course, lesson, index: lesson ? course.lessons.indexOf(lesson) : -1 };
}

export const ui = {
	en: {
		course: 'Course',
		level: 'Level',
		lesson: 'Lesson',
		project: 'Project',
		of: 'of',
		lessons: 'lessons',
		hours: 'h',
		minutes: 'min',
		youShip: 'You’ll ship',
		start: 'Start course',
		continue: 'Continue',
		review: 'Review',
		comingSoon: 'Coming soon',
		allCourses: 'All courses',
		program: 'The program',
		howItWorks: 'How it works',
		glossary: 'Glossary',
		markComplete: 'Mark complete',
		completed: 'Completed ✓',
		next: 'Next lesson',
		prev: 'Previous lesson',
		backToCourse: 'Back to the course',
		nextCourse: 'Next course',
		done: 'done',
		continueTitle: 'Pick up where you left off',
		startTitle: 'Start here',
		createdBy: 'Created by',
		follow: 'Follow on X',
		progressNote: 'Your progress is saved in this browser.',
	},
	es: {
		course: 'Curso',
		level: 'Nivel',
		lesson: 'Lección',
		project: 'Proyecto',
		of: 'de',
		lessons: 'lecciones',
		hours: 'h',
		minutes: 'min',
		youShip: 'Vas a publicar',
		start: 'Empezar el curso',
		continue: 'Continuar',
		review: 'Repasar',
		comingSoon: 'Próximamente',
		allCourses: 'Todos los cursos',
		program: 'El programa',
		howItWorks: 'Cómo funciona',
		glossary: 'Glosario',
		markComplete: 'Marcar como completada',
		completed: 'Completada ✓',
		next: 'Siguiente lección',
		prev: 'Lección anterior',
		backToCourse: 'Volver al curso',
		nextCourse: 'Siguiente curso',
		done: 'listas',
		continueTitle: 'Sigue donde ibas',
		startTitle: 'Empieza aquí',
		createdBy: 'Creado por',
		follow: 'Seguir en X',
		progressNote: 'Tu progreso se guarda en este navegador.',
	},
} as const;

export const creator = { name: 'Julian Arango', handle: '@ja818_', url: 'https://x.com/ja818_' };
