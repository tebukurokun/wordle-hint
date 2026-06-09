import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import { version } from "../package.json";
import "./App.css";
import { InputBoard } from "./components/InputBoard";
import { WordListArea } from "./components/WordListArea";

function App() {
  useEffect(() => {
    console.info(`Wordle Hint v${version}`);
  }, []);
  return (
    <RecoilRoot>
      <div className="App bg-slate-900 text-white h-screen">
        <div className={"p-5 max-w-screen-md mx-auto relative h-full"}>
          <h1 className="mb-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
            <span
              className="cursor-pointer text-white"
              onClick={() => {
                window.location.reload();
              }}
            >
              Wordle Hint
            </span>
          </h1>
          <div>
            <p className="text-slate-300">
              Get clues to solve{" "}
              <a
                className="font-bold text-lg text-green-400 hover:text-green-300"
                href="https://www.nytimes.com/games/wordle/index.html"
                target="_blank"
                rel="noreferrer"
              >
                Wordle
              </a>
            </p>
          </div>
          <details className="mx-auto mt-3 max-w-md rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-left text-sm text-slate-300">
            <summary className="cursor-pointer font-medium text-slate-200">
              How to use
            </summary>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              <li>Type the 5-letter word you guessed in Wordle.</li>
              <li>
                Tap each tile to match Wordle's colors — tapping cycles gray →
                yellow → green.
              </li>
              <li>
                Press → to filter the matching words, then click one to use it
                as your next guess.
              </li>
            </ol>
            <p className="mt-2 text-slate-400">
              Words are ranked by recommendation, so the ones at the top (e.g.
              ARISE) make strong opening guesses.
            </p>
          </details>
          <div className="grid grid-cols-1 mt-5">
            <div className={"mb-5 container px-10"}>
              <InputBoard />
            </div>
            <div className="mt-5 container px-5">
              <h3 className="mb-1 text-lg font-semibold text-white">
                word candidates
                <span className="ml-1 text-sm font-normal text-slate-400">
                  (sorted by recommendation)
                </span>
              </h3>
              <p className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-3 w-3 rounded-sm bg-emerald-200 ring-1 ring-emerald-400" />
                  possible answer
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-3 w-3 rounded-sm bg-slate-200" />
                  valid guess
                </span>
              </p>
              <WordListArea />
            </div>
          </div>
          <div id="appFooter" className={"absolute bottom-0 right-0"}></div>
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;
