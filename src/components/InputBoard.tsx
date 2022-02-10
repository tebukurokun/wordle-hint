import { InputGroup } from "@blueprintjs/core";
import { useEffect, useRef, useState } from "react";
import { LetterPanel } from "./LetterPanel";
import { Button } from "@blueprintjs/core";
import { letterColorActions, letterColorSelecters } from "../states";

interface LetterState {
  letter: string;
  isYellow: boolean;
  isGreen: boolean;
}

export function InputBoard() {
  const letterColorState = letterColorSelecters.useLetterColor();
  const setLetterColorState = letterColorActions.useSetLetterColor();

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
  }, [letterStates]);

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

    console.debug(letterColorState.grayLetters);
    // push to state
    // eslint-disable-next-line prefer-const
    const newLetterColorState = {
      grayLetters: [...letterColorState.grayLetters],
      yellowLetters: [...letterColorState.yellowLetters],
      greenLetters: [...letterColorState.greenLetters],
    };
    letterStates.map((s, i) => {
      if (s.isGreen) {
        newLetterColorState.greenLetters.push({
          letter: s.letter,
          index: i,
        });
      } else if (s.isYellow) {
        newLetterColorState.yellowLetters.push({
          letter: s.letter,
          index: i,
        });
      } else {
        newLetterColorState.grayLetters.push(s.letter);
      }
    });
    setLetterColorState(newLetterColorState);

    // reset letterStates
    setLetterStates([
      { letter: "", isYellow: false, isGreen: false },
      { letter: "", isYellow: false, isGreen: false },
      { letter: "", isYellow: false, isGreen: false },
      { letter: "", isYellow: false, isGreen: false },
      { letter: "", isYellow: false, isGreen: false },
    ]);

    setInputValue("");
    setIsInputValid(false);
  };

  return (
    <div className="">
      <div>
        <div>
          {submittedLetterStates.map((states, index) => {
            return (
              <div
                className="my-1 grid grid-cols-5 gap-1"
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
        <div className="grid grid-cols-5 gap-1 justify-center min-h-50 ">
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
      <div className="mt-5 grid grid-cols-5 gap-1">
        <InputGroup
          placeholder="5-letter word"
          large={true}
          maxLength={5}
          minLength={5}
          className={"col-start-2 col-end-5"}
          onChange={handleInputChange}
          value={inputValue}
          onKeyDown={handleInputKeydown}
          inputRef={input}
        />
        <Button
          rightIcon="arrow-right"
          intent="success"
          text=""
          disabled={!isInputValid}
          onClick={goNext}
          className={"col-span-1"}
        />
        {/* <Button icon="refresh" intent="danger" className={"col-span-1 mt-10"} /> */}
      </div>
    </div>
  );
}
