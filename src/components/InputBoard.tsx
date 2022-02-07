import { InputGroup } from "@blueprintjs/core";
import { useState } from "react";
import { LetterPanel } from "./LetterPanel";

interface LetterState {
  letter: string;
  isYellow: boolean;
  isGreen: boolean;
}

export function InputBoard() {
  const [letterStates, setLetterStates] = useState<LetterState[]>([
    { letter: "", isYellow: false, isGreen: false },
    { letter: "", isYellow: false, isGreen: false },
    { letter: "", isYellow: false, isGreen: false },
    { letter: "", isYellow: false, isGreen: false },
    { letter: "", isYellow: false, isGreen: false },
  ]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value.length == 5) {
      const word = value.toUpperCase();
      setLetterStates([
        { letter: word[0], isYellow: false, isGreen: false },
        { letter: word[1], isYellow: false, isGreen: false },
        { letter: word[2], isYellow: false, isGreen: false },
        { letter: word[3], isYellow: false, isGreen: false },
        { letter: word[4], isYellow: false, isGreen: false },
      ]);
    }
  };

  const handleLetterClick = (index: number) => {
    const letterState = letterStates[index];
    const newLetterState = {
      ...letterState,
      isYellow: letterState.isYellow
        ? false
        : letterState.isGreen
        ? false
        : true,
      isGreen: letterState.isGreen
        ? false
        : letterState.isYellow
        ? true
        : false,
    };

    const newLetterStates = [...letterStates];
    newLetterStates[index] = newLetterState;

    setLetterStates(newLetterStates);
  };

  return (
    <div className="mx-4">
      <div>
        <div className="row flex flex-row space-x-2">
          {letterStates.map((s, i) => (
            <LetterPanel
              key={i}
              index={i}
              isYellow={s.isYellow}
              isGreen={s.isGreen}
              handleLetterClick={handleLetterClick}
            >
              {s.letter}
            </LetterPanel>
          ))}
        </div>
      </div>
      <div className="w-80 my-2">
        <InputGroup
          placeholder="5-letter word"
          large={true}
          maxLength={5}
          minLength={5}
          className={"w-40 mx-auto"}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
