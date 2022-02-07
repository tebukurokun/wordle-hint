import { useState } from "react";
import "./App.css";
import { Button, H1 } from "@blueprintjs/core";
import { InputBoard } from "./components/InputBoard";
import { RecoilRoot } from "recoil";

function App() {
  const [count, setCount] = useState(0);

  return (
    <RecoilRoot>
      <div className="App">
        <div className={"bg-slate-900 h-screen py-10"}>
          <H1 className={"text-white"}>wordle hint</H1>
          <div className={"my-10 container mx-auto"}>
            <InputBoard />
          </div>
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;
