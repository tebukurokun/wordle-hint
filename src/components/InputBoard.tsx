import { useEffect, useRef, useState } from "react";
import {
  letterColorActions,
  letterColorSelecters,
  selectedWordActions,
  selectedWordSelecters,
} from "../states";
import { LetterPanel } from "./LetterPanel";

interface LetterState {
  letter: string;
  isYellow: boolean;
  isGreen: boolean;
}

export function InputBoard() {
  const letterColorState = letterColorSelecters.useLetterColor();
  const setLetterColorState = letterColorActions.useSetLetterColor();
  const selectedWord = selectedWordSelecters.useSelectedWord();
  const setSelectedWord = selectedWordActions.useSetSelectedWord();

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

  const applyWord = (rawWord: string) => {
    const word = rawWord.toUpperCase();
    setInputValue(word);

    if (word.length === 5 && word.match(/^[A-Za-z]{5}$/)) {
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    applyWord(event.target.value);
  };

  // 候補リストの単語がクリックされたら入力欄へ反映する
  // biome-ignore lint/correctness/useExhaustiveDependencies: applyWord/setSelectedWord are stable; only react to selectedWord changes
  useEffect(() => {
    if (selectedWord) {
      applyWord(selectedWord);
      setSelectedWord("");
    }
  }, [selectedWord]);

  const handleLetterClick = (index: number) => {
    const letterState = letterStates[index];
    const newLetterState = {
      ...letterState,
      isYellow: letterState.isYellow ? false : !letterState.isGreen,
      isGreen: letterState.isGreen ? false : !!letterState.isYellow,
    };

    const newLetterStates = [...letterStates];
    newLetterStates[index] = newLetterState;

    setLetterStates(newLetterStates);
  };

  const handleInputKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
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

    // push to state
    const newLetterColorState = {
      grayLetters: [...letterColorState.grayLetters],
      yellowLetters: [...letterColorState.yellowLetters],
      greenLetters: [...letterColorState.greenLetters],
    };
    letterStates.forEach((s, i) => {
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
                // biome-ignore lint/suspicious/noArrayIndexKey: append-only submission history, never reordered
                key={`index-${index}`}
              >
                {states.map((s, i) => (
                  <LetterPanel
                    key={`${index.toString()}-${i.toString()}`}
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
        <div className="grid grid-cols-5 gap-1 justify-center">
          {letterStates.map((s, i) => (
            <LetterPanel
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed 5-letter row, never reordered
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
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-neutral-800 ring-1 ring-slate-600" />
          not in word
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-amber-400" />
          wrong spot
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-emerald-600" />
          correct spot
        </span>
      </div>
      <div className="mt-5 grid grid-cols-5 gap-2">
        <input
          ref={input}
          type="text"
          placeholder="5-letter word"
          maxLength={5}
          minLength={5}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeydown}
          className="col-start-2 col-end-5 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-center text-lg font-semibold uppercase tracking-[0.3em] text-white placeholder:text-base placeholder:font-normal placeholder:normal-case placeholder:tracking-normal placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        />
        <button
          type="button"
          aria-label="submit word"
          disabled={!isInputValid}
          onClick={goNext}
          className="col-span-1 flex cursor-pointer items-center justify-center rounded-lg bg-emerald-600 text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
            role="img"
            aria-label="submit"
          >
            <title>submit</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
