import "./App.css";
import { H1, H2 } from "@blueprintjs/core";
import { InputBoard } from "./components/InputBoard";
import { RecoilRoot } from "recoil";
import { WordListArea } from "./components/WordListArea";

function App() {
  return (
    <RecoilRoot>
      <div className="App bg-slate-900 ">
        <div className={"h-screen py-10 max-w-screen-md"}>
          <H1 className={"text-white"}>Wordle Hint</H1>
          <div className="grid grid-cols-1">
            <div className={"my-5 container px-10"}>
              <InputBoard />
            </div>
            <div className="my-5 container px-5">
              <H2 className={"text-white"}>word candidates</H2>
              <WordListArea />
            </div>
          </div>
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;
