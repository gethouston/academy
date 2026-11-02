# Houston Academy

**From zero to hero:** a free, open-source program, in English and Spanish, that teaches non-technical people to plan, build and run production-grade software by steering AI agents. The agent writes the code. The Academy teaches everything around it.

- **Live (pilot):** https://gethouston-academy.web.app (later `academy.gethouston.ai`)
- **The plan:** [`PLAN.md`](PLAN.md): who it's for, the program, the format, the build plan. Research notes are in [`research/`](research/).
- **Status:** milestone M1, the pilot. Course 0 is complete, and Courses 1 and 2 have their first lessons, all in both languages.

## What's here

| Path | What it is |
|---|---|
| `site/` | The course site: Astro + MDX + Tailwind, with a clean, Odin-like layout. English at `/`, Spanish at `/es/`. Lessons are MDX files in `site/src/content/courses/<en|es>/<course>/`, and the program map (levels, courses, lessons) is `site/src/data/program.ts` |
| `site/src/components/` | Lesson building blocks: interactive diagrams, prompt cards, checklists, illustrative agent sessions, explain-back questions |
| `plugins/academy/` | The **academy** Claude Code plugin: the tutor that runs inside the learner's own project |
| `.claude-plugin/marketplace.json` | Makes this repo a plugin marketplace |
| `series/` | Scripts for the video series, recorded natively in both languages |
| `pilot/` | The M1 pilot: test plan, observation sheet, invite drafts |

## Run the site

```bash
cd site
npm install
npm run dev            # http://localhost:4321
npm run check:locales  # every page must exist in English and Spanish
npm run build
```

## Deploy

The site is hosted on Firebase Hosting, in the `gethouston` GCP project, on the site `gethouston-academy`.

```bash
cd site
npm run build
npm run deploy         # uses your gcloud login: gcloud auth login
```

CI runs the build, the locale check and the hook tests on every push and PR. It also deploys on `main`, once the repo variables `GCP_WIF_PROVIDER` and `GCP_DEPLOY_SA` point at a Workload Identity provider for this repo. Until those are set, CI skips that step.

## Install the tutor

In a Claude Code session (the terminal or the desktop app's Code tab):

```
/plugin install academy --marketplace gethouston/academy
```

Then, in the learner's project folder, run `/academy:start 0`.

The tutor's skills are `/academy:start`, `/academy:brief`, `/academy:explain` and `/academy:check`. Its red-flag hooks only act in folders that have an `.academy/` directory, which `/academy:start` creates. Test them with `plugins/academy/tests/test-hooks.sh`.

## Writing lessons

- Every lesson ships in **both languages or not at all** (`npm run check:locales`). Spanish is written natively, in neutral Latin American Spanish with *tú*. Terms follow the [glossary](site/src/content/docs/glossary.mdx).
- Every lesson has the same anatomy: the picture, **tell** (prompt cards), **watch**, a 🚩 red flag, **done when**, and **explain it back**.
- Never ask the learner to write or read code.

## License

Code: MIT ([`LICENSE`](LICENSE)). Course content: CC BY-SA 4.0 ([`LICENSE-CONTENT.md`](LICENSE-CONTENT.md)).
