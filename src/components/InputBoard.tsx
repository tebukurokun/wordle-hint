import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import {
  type LetterColorState,
  letterColorAtom,
  selectedWordAtom,
} from "../states";
import { LetterPanel } from "./LetterPanel";

interface LetterState {
  letter: string;
  isYellow: boolean;
  isGreen: boolean;
}

// The accumulated constraints are fully derived from the submission history,
// so we rebuild them from scratch whenever the history changes (submit / undo).
const computeColorState = (history: LetterState[][]): LetterColorState => {
  const next: LetterColorState = {
    grayLetters: [],
    yellowLetters: [],
    greenLetters: [],
  };
  for (const states of history) {
    states.forEach((s, i) => {
      if (s.isGreen) {
        next.greenLetters.push({ letter: s.letter, index: i });
      } else if (s.isYellow) {
        next.yellowLetters.push({ letter: s.letter, index: i });
      } else {
        next.grayLetters.push(s.letter);
      }
    });
  }
  return next;
};

// Wiktionary link shown beside a word row. Positioned by the caller in the
// board's px-10 gutter so tile widths are unaffected.
const DictionaryLink = ({
  word,
  className,
}: {
  word: string;
  className: string;
}) => (
  <a
    href={`https://en.wiktionary.org/wiki/${word.toLowerCase()}`}
    target="_blank"
    rel="noreferrer"
    aria-label={`look up ${word} in dictionary`}
    title={`Look up ${word} in Wiktionary`}
    className={`${className} rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-5 w-5"
      role="img"
      aria-label="dictionary"
    >
      <title>dictionary</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="m8 13 4-7 4 7" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.1 11h5.7" />
    </svg>
  </a>
);

const emptyLetterStates = (): LetterState[] =>
  Array.from({ length: 5 }, () => ({
    letter: "",
    isYellow: false,
    isGreen: false,
  }));

// Pre-mark a letter green when a prior submission already locked that exact
// letter at that exact index. Green is the only constraint safe to auto-apply:
// it is guaranteed correct. Yellow is not (the letter could turn out green at
// the new position), so we never auto-apply it.
const buildLetterStates = (
  word: string,
  greens: LetterColorState["greenLetters"],
): LetterState[] =>
  [...word].map((letter, i) => ({
    letter,
    isYellow: false,
    isGreen: greens.some(
      (g) => g.index === i && g.letter.toUpperCase() === letter,
    ),
  }));

export function InputBoard() {
  const letterColorState = useAtomValue(letterColorAtom);
  const setLetterColorState = useSetAtom(letterColorAtom);
  const selectedWord = useAtomValue(selectedWordAtom);
  const setSelectedWord = useSetAtom(selectedWordAtom);

  const [inputValue, setInputValue] = useState("");
  const [letterStates, setLetterStates] =
    useState<LetterState[]>(emptyLetterStates);

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
      setLetterStates(buildLetterStates(word, letterColorState.greenLetters));
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
    // append the word to history and rebuild the accumulated constraints
    const newSubmittedLetterStates = [...submittedLetterStates, letterStates];
    setSubmittedLetterStates(newSubmittedLetterStates);
    setLetterColorState(computeColorState(newSubmittedLetterStates));

    // reset the editable row
    setLetterStates(emptyLetterStates());
    setInputValue("");
    setIsInputValid(false);
  };

  const canUndo = submittedLetterStates.length > 1;

  // Remove the most recent submission and load it back into the editable row
  // so a mis-marked word can be fixed and re-submitted.
  const undoLast = () => {
    if (!canUndo) {
      return;
    }
    const removed = submittedLetterStates[submittedLetterStates.length - 1];
    const newSubmittedLetterStates = submittedLetterStates.slice(0, -1);
    setSubmittedLetterStates(newSubmittedLetterStates);
    setLetterColorState(computeColorState(newSubmittedLetterStates));

    setLetterStates(removed);
    setInputValue(removed.map((s) => s.letter).join(""));
    setIsInputValid(true);
  };

  return (
    <div className="">
      <div>
        <div>
          {submittedLetterStates.map((states, index) => {
            return (
              <div
                className="relative my-1"
                // biome-ignore lint/suspicious/noArrayIndexKey: append-only submission history, never reordered
                key={`index-${index}`}
              >
                <div className="grid grid-cols-5 gap-1">
                  {states.map((s, i) => (
                    <LetterPanel
                      key={`${index.toString()}-${i.toString()}`}
                      index={i}
                      isYellow={s.isYellow}
                      isGreen={s.isGreen}
                      compact
                    >
                      {s.letter}
                    </LetterPanel>
                  ))}
                </div>
                {states.length === 5 && (
                  <DictionaryLink
                    word={states.map((s) => s.letter).join("")}
                    className="absolute -right-9 top-1/2 -translate-y-1/2"
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="relative">
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
          {isInputValid && (
            <DictionaryLink
              word={inputValue}
              className="absolute -right-9 top-1/2 -translate-y-1/2"
            />
          )}
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-400">
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
      <div className="mt-3 grid grid-cols-5 gap-2">
        <button
          type="button"
          aria-label="undo last word"
          disabled={!canUndo}
          onClick={undoLast}
          className="col-start-1 col-span-1 flex cursor-pointer items-center justify-center rounded-lg border border-slate-600 bg-slate-800 text-slate-300 transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
            role="img"
            aria-label="undo"
          >
            <title>undo</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
        </button>
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
