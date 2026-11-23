# Prashant Prajapati — Portfolio (MERN Stack)

The same portfolio, rebuilt on a pure **MERN** stack:

| Layer    | Technology                                                     |
| -------- | -------------------------------------------------------------- |
| Frontend | React 19, Vite, React Router DOM, JavaScript (ES6+), HTML5, CSS3 |
| Backend  | Node.js, Express.js, REST APIs                                 |
| Database | MongoDB with the Mongoose ODM                                  |

The UI, animations, theme switching, responsive layout and local portfolio FAQ assistant carry over from the original
Next.js version. The assistant runs in the browser from a local knowledge base; it is not a live generative AI model and needs no API key. Only the technology underneath was replaced (no Next.js, no Next.js API routes, no server components).
The stylesheet has since been given a centralized typography/spacing system (see
[Typography & design system](#typography--design-system)); content, colours and functionality are unchanged.

---

## Project structure

```
portfolio-mern/
├── client/                     # React + Vite frontend
│   ├── public/                 # Static files: profile photo, resume PDF, icons
│   ├── src/
│   │   ├── components/         # SiteHeader, Footer, Starfield, CursorGlow, AIAssistant, …
│   │   ├── sections/           # Hero, About, Education, Skills, Projects, Journey, Resume, …
│   │   ├── pages/              # HomePage, NotFoundPage (React Router)
│   │   ├── context/            # ThemeContext (dark / light)
│   │   ├── hooks/              # usePortfolio (loads data from the API)
│   │   ├── services/           # api.js (all fetch calls)
│   │   ├── styles/             # globals.css (stylesheet + design tokens)
│   │   ├── utils/              # navItems, local assistant knowledge base
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html              # SEO + social meta tags
│   └── vite.config.js
├── server/                     # Express + MongoDB backend
│   ├── config/                 # db.js (Mongoose connection)
│   ├── controllers/            # portfolio, health
│   ├── data/                   # portfolio.seed.js  ← your portfolio content
│   ├── middleware/             # error handler, security headers
│   ├── models/                 # Portfolio.js (Mongoose schema)
│   ├── routes/                 # api.js
│   ├── utils/                  # portfolioStore.js, seed.js
│   └── server.js
├── package.json                # root scripts
├── .env.example
└── README.md
```

## How it works

* Your portfolio content (profile, education, skills, projects, journey, certificates, goals) lives in **MongoDB**
  as a single `Portfolio` document. On the first start against an empty database the server **seeds it automatically**
  from `server/data/portfolio.seed.js`.
* `GET /api/portfolio` returns that content; the React app renders every section from it.
* The portfolio FAQ assistant runs entirely in the React frontend using a local knowledge base populated from portfolio data. It makes no AI-provider requests and requires no API key; it is not a live generative AI model.
* If MongoDB is unreachable, the server logs a warning and serves the bundled seed data, so the site still works.
  Check `/api/health` to see the real database status.

---

## Installation (beginner friendly)

### 1. Prerequisites

* **Node.js 18 or newer** — download from <https://nodejs.org> (check with `node -v`)
* **MongoDB** — pick one:
  * **MongoDB Atlas (free, no install):** create a free cluster at <https://www.mongodb.com/atlas>, create a database
    user, allow your IP address, then click *Connect → Drivers* and copy the connection string.
  * **Local MongoDB:** install MongoDB Community Server from <https://www.mongodb.com/try/download/community>.

### 2. Install dependencies

Open a terminal in the project folder and run:

```bash
npm run install-all
```

### 3. Configure environment variables

```bash
cp .env.example .env        # Windows (cmd): copy .env.example .env
```

Open `.env` and configure `MONGODB_URI` if you use a local or Atlas database. No AI provider configuration or API key is needed for the portfolio assistant.

| Variable      | Purpose                                                  |
| ------------- | -------------------------------------------------------- |
| `PORT`        | Express port (default `5000`)                            |
| `NODE_ENV`    | `development` or `production`                            |
| `CLIENT_URL`  | Origin allowed by CORS (default `http://localhost:5173`) |
| `MONGODB_URI` | MongoDB connection string                                |

> Never commit `.env`. It is already listed in `.gitignore`.

### 4. Run in development

```bash
npm run dev
```

* Website: <http://localhost:5173>  (Vite, hot reload; `/api` is proxied to Express)
* API: <http://localhost:5000/api/health>

### 5. Run in production

```bash
npm run build      # builds the React app into client/dist
npm start          # Express serves the API and the built site on http://localhost:5000
```

### Re-seeding the database

If you edit `server/data/portfolio.seed.js`, push the changes to MongoDB with:

```bash
npm run seed
```

---

## API reference

| Method | Endpoint          | Description                                                        |
| ------ | ----------------- | ------------------------------------------------------------------ |
| GET    | `/api/health`     | Server + database status (`503` when MongoDB is disconnected)      |
| GET    | `/api/portfolio`  | All portfolio content. Header `X-Data-Source`: `mongodb` or `seed-fallback` |


The chatbot has no backend AI endpoint; its FAQ matching and answers are handled locally in the React app.

## Deployment notes

* Deploy the whole repo as one Node service (Render, Railway, Fly.io, a VPS…): build command `npm run install-all && npm run build`,
  start command `npm start`, and set the environment variables from `.env.example` (use `NODE_ENV=production` and an Atlas `MONGODB_URI`).
* To host the frontend separately (Netlify/Vercel static), set `VITE_API_URL` to the API's URL at build time and set
  `CLIENT_URL` on the server to the frontend's origin.

## Troubleshooting

| Problem | Fix |
| ------- | --- |
| `MongoDB connection failed …` | Check `MONGODB_URI`, that MongoDB is running (local) or your IP is allowed (Atlas). The site keeps working from bundled data meanwhile. |
| `Port 5000 is already in use` | Change `PORT` in `.env` (and the proxy target in `client/vite.config.js` if you use dev mode). |
| Chat does not answer a topic | Ask about Prashant, skills, experience, portfolio projects, or contact details; unsupported questions receive a local FAQ fallback. |
| Blank page with "couldn't load the portfolio" | The API isn't reachable: make sure the server is running (`npm run dev` starts both). |

## Typography & design system

All typography, spacing and component sizing lives in **one stylesheet**, `client/src/styles/globals.css`, driven by CSS
variables ("design tokens") defined near the top of the file (search for `DESIGN TOKENS`). Colours are *not* part of this
layer; the original palette and the dark/light themes are untouched.

| Token group        | Examples                                                                 |
| ------------------ | ------------------------------------------------------------------------ |
| Font sizes (fluid) | `--fs-hero` (40→72px), `--fs-h2` (28→36px), `--fs-card-title` (19→22px), `--fs-body` (15→17px) |
| Fixed sizes        | `--fs-nav` 15px, `--fs-button` 15px, `--fs-chip` 13→14px, `--fs-label` 12px |
| Weights / leading  | `--fw-hero`, `--fw-h2`, `--fw-card`, `--lh-hero`, `--lh-body`, …          |
| Spacing            | `--header-h`, `--space-section`, `--card-pad`, `--gap-card`               |
| Controls & radii   | `--btn-h`, `--control-h`, `--chip-h`, `--radius-card`, `--radius-btn`     |
| Icons              | `--icon-sm/md/lg/xl`, `--icon-box-sm/md/lg`                               |
| Compact app UI     | `--fs-ui-*` (chat widget; also reserved for dashboard/form screens)       |

Fluid sizes use `clamp()`, so desktop, tablet and mobile sizes come from one declaration instead of per-breakpoint overrides.
The only structural breakpoints are `1279px` (navigation collapses to the menu button), `820px` and `560px`.

Each text role is defined once in the **TYPOGRAPHY ROLES** block (e.g. `.type-card-title`, `.type-body`, `.type-label`).
To style a new component, either add a class from that list to the element or add your selector to the matching role rule;
avoid writing a new `font-size` in a component rule.

**Font note:** the font stack starts with `Inter`, but the project does not bundle or load that font, so visitors who do not
have it installed see their system UI font. To use Inter everywhere, add the Google Fonts `<link>` for Inter (weights 400-800)
to `client/index.html`; the tokens need no changes.

## Notes on the migration

* During the migration, all markup, class names and `globals.css` were carried over unchanged (only two imports for unused
  shadcn/Tailwind helper plugins were removed, plus a few lines of styling for the loading/error state). The typography
  revision described above was applied afterwards, to `globals.css` only.
* Removed because they were Next.js / Vercel specific: `@vercel/analytics`, the `next.config.mjs` header config (re-created in Express),
  and unused boilerplate (`components/ui/button.tsx` and the `placeholder-*` images).
* The provided profile photograph is stored locally at `client/public/prashant-profile.jpeg` and used in the navbar and hero.
* The exact provided resume PDF is stored at `client/public/Prashant_Prajapati_Resume.pdf`; both resume buttons use this static asset.
"# PrashantPortfolio" 
