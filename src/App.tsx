import { useState } from "react";
import "./App.css";
import { Button, H1, H2, TextArea } from "@blueprintjs/core";
import { InputBoard } from "./components/InputBoard";
import { RecoilRoot } from "recoil";
import { WordList } from "./util/WordList";

function App() {
  console.log(WordList[0]);
  const [wordList, setWordList] = useState(WordList);
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
              <div id="wordListArea" className="">
                <TextArea
                  value={wordList.join("\n")}
                  readOnly
                  rows={15}
                  fill={true}
                ></TextArea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;
