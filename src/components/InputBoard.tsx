import { InputGroup } from "@blueprintjs/core";
import { useEffect, useRef, useState } from "react";
import { LetterPanel } from "./LetterPanel";
import { Button } from "@blueprintjs/core";

interface LetterState {
  letter: string;
  isYellow: boolean;
  isGreen: boolean;
}

export function InputBoard() {
  const [inputValue, setInputValue] = useState("");
  const [letterStates, setLetterStates] = useState<LetterState[]>([
    { letter: "", isYellow: false, isGreen: false },
    { letter: "", isYellow: false, isGreen: false },
    { letter: "", isYellow: false, isGreen: false },
    { letter: "", isYellow: false, isGreen: false },
    { letter: "", isYellow: false, isGreen: false },
  ]);

  const [submittedLetterStates, setSubmittedLetterStates] = useState<
    LetterState[][]
  >([[]]);

  const [isInputValid, setIsInputValid] = useState(false);

  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const word = event.target.value.toUpperCase();
    setInputValue(word);

    if (word.length == 5 && word.match(/^[A-Za-z]{5}$/)) {
      setLetterStates([
        { letter: word[0], isYellow: false, isGreen: false },
        { letter: word[1], isYellow: false, isGreen: false },
        { letter: word[2], isYellow: false, isGreen: false },
        { letter: word[3], isYellow: false, isGreen: false },
        { letter: word[4], isYellow: false, isGreen: false },
      ]);
      setIsInputValid(true);
    } else {
      setIsInputValid(false);
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

  const handleInputKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      goNext();
    }
  };

  const goNext = () => {
    if (!isInputValid) {
      return;
    }

    // update submittedLetterStates
    const newSubmittedLetterStates = [...submittedLetterStates];
    newSubmittedLetterStates.push(letterStates);
    setSubmittedLetterStates(newSubmittedLetterStates);

    setLetterStates([
      { letter: "", isYellow: false, isGreen: false },
      { letter: "", isYellow: false, isGreen: false },
      { letter: "", isYellow: false, isGreen: false },
      { letter: "", isYellow: false, isGreen: false },
      { letter: "", isYellow: false, isGreen: false },
    ]);

    setInputValue("");
  };

  return (
    <div className="mx-2">
      <div>
        <div>
          {submittedLetterStates.map((states, index) => {
            return (
              <div
                className="row flex flex-row space-x-2"
                key={`index-${index}`}
              >
                {states.map((s, i) => (
                  <LetterPanel
                    key={index.toString() + "-" + i.toString()}
                    index={i}
                    isYellow={s.isYellow}
                    isGreen={s.isGreen}
                  >
                    {s.letter}
                  </LetterPanel>
                ))}
              </div>
            );
          })}
        </div>
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
      <div className="w-80 my-2 row flex flex-row space-x-1">
        <InputGroup
          placeholder="5-letter word"
          large={true}
          maxLength={5}
          minLength={5}
          className={"w-40 mx-auto"}
          onChange={handleInputChange}
          value={inputValue}
          onKeyDown={handleInputKeydown}
          inputRef={input}
        />
        <Button
          rightIcon="arrow-right"
          intent="success"
          text="Next"
          disabled={!isInputValid}
          onClick={goNext}
        />
      </div>
      <div className="w-80 mt-20">
        <Button icon="refresh" intent="danger" text="Reset" />
      </div>
    </div>
  );
}
