# ⚛️ React Lab

This directory is a pure Vite + React environment for rapid experiments, component prototyping, and frontend exploration.

---

## 🛠️ Setup & Running

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Open in your browser:
`http://localhost:5173`

---

## 📦 Scripts

- `npm run dev`: Starts the Vite development server with Hot Module Replacement (HMR).
- `npm run build`: Bundles the project for production into the `dist/` directory.
- `npm run preview`: Previews the production build locally.

---

## 🧪 Experiments & Features

- **[table-row-dialog/](src/table-row-dialog/)**: Demonstrates triggering a modal dialog form pre-populated with row details upon clicking a table row, preventing event bubbling on action buttons (`stopPropagation`), and managing modal state at the table level without page routing.
