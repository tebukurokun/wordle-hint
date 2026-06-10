# wordle-hint

[Wordle](https://www.nytimes.com/games/wordle/index.html) hint site

published at: <https://wordle-hint.netlify.app/>

Type a guess, click each tile to mark its Wordle color (gray / yellow / green),
and the candidate list filters down to the words that still fit — ordered by
recommendation (letter frequency). Click any candidate to send it back into the
input.

## Tech stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
- [Jotai](https://jotai.org/) for state
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Biome](https://biomejs.dev/) for lint & format

## Installation

```bash
npm install
```

## Running

```bash
npm run dev      # dev server
npm run build    # production build -> dist/
npm run preview  # serve the production build
npm run check    # Biome lint + format check
```

## License

This software is released under the MIT License, see LICENSE.txt.

## References

- [Wordle](https://www.nytimes.com/games/wordle/index.html)
- [Letter frequency (Wikipedia)](https://en.wikipedia.org/wiki/Letter_frequency)
- [tailwindcss](https://tailwindcss.com/)
