import { H1, H3 } from "@blueprintjs/core";
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
        <div className={"p-5 max-w-screen-md relative h-full"}>
          <H1 className={"mb-1"}>
            <span
              className={"text-white cursor-pointer"}
              onClick={() => {
                window.location.reload();
              }}
            >
              Wordle Hint
            </span>
          </H1>
          <div>
            <p>
              Get clues to solve{" "}
              <a
                className="font-bold text-lg text-green-500	"
                href="https://www.nytimes.com/games/wordle/index.html"
                target="_blank"
                rel="noreferrer"
              >
                Wordle
              </a>
            </p>
          </div>
          <div className="grid grid-cols-1 mt-5">
            <div className={"mb-5 container px-10"}>
              <InputBoard />
            </div>
            <div className="mt-5 container px-5">
              <H3 className={"text-white"}>
                word candidates(sorted by recommendation)
              </H3>
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
