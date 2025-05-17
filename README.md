# Jbook Development Environment

This project is a simple React and TypeScript notebook interface built with Vite and Tailwind CSS. It allows users to create cells containing either executable code or Markdown text. The repository structure and key concepts are summarized below.

## Project Layout

```
Jbook-dev/
├─ public/                # static assets (e.g. esbuild.wasm)
├─ src/
│  ├─ components/         # React components
│  ├─ bundler/            # esbuild-based code bundler
│  ├─ hooks/              # custom React hooks
│  ├─ store/              # Redux slices and store setup
│  ├─ App.tsx             # root component
│  └─ main.tsx            # Vite entry
├─ index.html             # HTML template
├─ tailwind.config.cjs    # Tailwind configuration
└─ package.json           # scripts and dependencies
```

## Key Points

- **Bundling user code** is handled in `src/bundler`. It initializes `esbuild-wasm` and uses custom plugins to fetch modules from unpkg.com and cache them locally.
- **Redux Toolkit** manages the application state with slices located in `src/store`. Cells and bundling results are stored here.
- **Components** in `src/components` implement the UI, including the Monaco-based `CodeEditor`, a preview iframe, markdown editing, and resizable layout elements.
- **Custom Hooks and Utilities** such as `useCumulativeCode` build up the code executed in each cell and provide convenience functions.
- **Tailwind CSS** provides most of the styling, found in `index.css` and component-specific styles.

## Getting Started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

This will launch Vite and open the project in development mode.

## Learn More

Explore the following areas to deepen your understanding:

1. **Code Bundling Flow** – See how updates in the `CodeEditor` dispatch the `createBundle` async action and update the `Preview` component.
2. **Esbuild Plugins** – Review `src/bundler/plugins` to understand how remote modules are loaded and cached.
3. **React and Redux Patterns** – Examine custom hooks and typed selectors in `src/hooks` and `src/store`.
4. **Persistence** – The project currently lacks saved cells or local storage. Implementing this could be a valuable enhancement.
5. **Tailwind and Styling** – Adjust the configuration or extend CSS for additional UI features.

This README provides a short overview of how the project is organized. For a deeper dive, explore the individual files and components mentioned above.
