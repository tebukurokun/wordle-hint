import "./App.css";
import { H1, H2 } from "@blueprintjs/core";
import { InputBoard } from "./components/InputBoard";
import { RecoilRoot } from "recoil";
import { WordListArea } from "./components/WordListArea";

function App() {
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
                href="https://www.powerlanguage.co.uk/wordle/"
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
              <H2 className={"text-white"}>word candidates</H2>
              <WordListArea />
            </div>
          </div>
          <div id="appFooter" className={"absolute bottom-0 right-0"}>
            <a
              href="https://github.com/tebukurokun/wordle-hint"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-github-square text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;
