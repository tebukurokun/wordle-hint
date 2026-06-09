# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Vite dev server (--host, accessible on LAN)
npm run build     # tsc type-check, then vite build -> dist/
npm run preview   # serve the production build locally
npm run lint      # Biome lint
npm run format    # Biome format (writes changes)
npm run check     # Biome lint + format check (no writes)
npx biome ci .    # what CI runs; same as check but CI-formatted output
```

There is no test framework in this project.

## Architecture

A single-page Wordle hint tool: Vite + React 18 + TypeScript, state via Recoil, styling via Tailwind CSS v4. The whole app is one screen (`App.tsx`) with two interactive areas.

**Core data flow.** The user types a 5-letter guess, clicks each tile to mark its Wordle color, then submits. Submitting accumulates color constraints into Recoil state; the candidate list re-filters live against those constraints.

- `src/util/WordList.ts` — a static array of ~8,700 lowercase 5-letter words, **pre-sorted by recommendation** (letter-frequency based). This ordering is the entire "sorted by recommendation" feature: filtering preserves array order, so no runtime ranking happens.
- `src/lib/filterWordList.ts` — the only real algorithm. Given gray/yellow/green letters it returns the surviving words. Gray = letter absent (but ignored if the same letter is also yellow/green elsewhere), yellow = letter present but **not** at that index, green = letter present **at** that index. All comparisons lowercase the letter because the word list is lowercase while the UI works in uppercase.
- `LetterIndex { letter, index }` (`src/interfaces`) carries position info for yellow/green letters.

**State (Recoil).** Each state lives in its own file under `src/states/` and follows the same pattern: an `atom`, a read hook bundle `xxxSelecters` (value via a `selector`), and a write hook bundle `xxxActions` (setter wrapped in `useCallback`). All are re-exported from `src/states/index.ts`; every atom/selector key is registered in `RecoilKeys.ts` (keys must be unique).
- `letterColorState` — accumulated `{ grayLetters, yellowLetters, greenLetters }` across all submissions. Written by `InputBoard` on submit, read by `WordListArea`.
- `selectedWordState` — bridges the two areas: clicking a candidate writes the word here; `InputBoard` watches it and fills the input, then resets it to `""` so the same word can be re-clicked.

**Components (`src/components/`).**
- `InputBoard` — owns local input/letter state, renders the input row, the 5 editable tiles, submission history, and the submit button. `applyWord()` is the shared path for both typing and click-to-fill.
- `LetterPanel` — one tile; clicking cycles its color gray → yellow → green → gray.
- `WordListArea` — re-filters `WordList` whenever `letterColorState` changes and renders candidates as clickable chips.

## Gotchas

- **Tailwind v4.** Styling is `@import "tailwindcss";` in `src/index.css` (no `@tailwind` directives — those are removed in v4). The v4 spacing scale is extended, so classes like `min-h-50` that were no-ops in v3 now resolve to real values. Config is CSS-first; there is no active `tailwind.config.js` driving anything.
- **No component library.** Blueprint was removed; build UI with plain elements + Tailwind. Icons are inline SVG.
- `vite.config.ts` injects `import React` via `esbuild.jsxInject` and uses the legacy `@vitejs/plugin-react-refresh`; `tsconfig` also sets `jsx: "react-jsx"`.

## CI / Deploy

- `.github/workflows/biome.yml` — runs `biome ci .` on push to `master` and on PRs.
- `.github/workflows/gh-pages.yml` — on push to `master`, builds and deploys `dist/` to GitHub Pages.
