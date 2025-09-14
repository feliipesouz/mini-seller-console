````markdown
# Mini Seller Console

Triage **Leads** and convert them into **Opportunities**.  
Built with **React + TypeScript + Vite + Tailwind (v4)**. No backend required — data is seeded from a local JSON and persisted to `localStorage` with simulated latency and failures.

**Live demo:** https://mini-seller-console-rouge.vercel.app/  
**Repository:** https://github.com/feliipesouz/mini-seller-console

---

## Features

### MVP
- Leads list loaded from `src/assets/leads.json`.
- Columns: `id`, `name`, `company`, `email`, `source`, `score`, `status`.
- Search by **name/company**, filter by **status**, sort by **score (desc)**.
- **Lead Detail Panel** (slide-over):
  - Inline edit of **email** (with format validation) and **status**.
  - Save / Cancel with basic error handling.
- **Convert to Opportunity** from the detail panel.
- Opportunities table: `name`, `stage`, `amount?`, `accountName`.

### Nice-to-haves implemented
- **Optimistic updates** with rollback on simulated failure.
- (Optional in code) **Persist** toolbar state (search/filter/sort) to `localStorage`.

### Performance
- Smooth with ~100 leads (selectors are pure and memoizable).

---

## Tech Stack
- **React 19**, **TypeScript 5**, **Vite 7** (`@vitejs/plugin-react-swc`)
- **Tailwind CSS v4** via `@tailwindcss/vite` (no PostCSS config)
- State: **Context + useReducer**
- Tooling: **ESLint** + TypeScript rules

---

## Getting Started

### Prerequisites
- Node.js **>= 18**
- **pnpm** (recommended)

### Install & Run
```bash
pnpm install
pnpm dev
# App at http://localhost:5173
````

### Production Build

```bash
pnpm build
pnpm preview
```

### Lint

```bash
pnpm lint
```

---

## UX States

* **Loading:** spinner/skeleton while fetching leads/opportunities.
* **Empty:** (a) no leads seeded or (b) no results after search/filter.
* **Error:** banner with message and retry.
* **Saving:** disables Save button; optimistic UI available.
* **Slide-over overlay:** click outside closes the panel.

