import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { filterWordList } from "../lib";
import { letterColorAtom, selectedWordAtom } from "../states";
import { AnswerList } from "../util/AnswerList";
import { WordList } from "../util/WordList";

// Words that can actually be the answer, for O(1) highlight lookup.
const answerSet = new Set(AnswerList);

export const WordListArea = () => {
  const letterColorState = useAtomValue(letterColorAtom);
  const setSelectedWord = useSetAtom(selectedWordAtom);
  const [wordList, setwordList] = useState(WordList);

  useEffect(() => {
    const newWordList = filterWordList(
      WordList,
      letterColorState.grayLetters,
      letterColorState.yellowLetters,
      letterColorState.greenLetters,
    );

    console.debug(newWordList.length);
    if (newWordList.length <= 20) {
      console.debug(newWordList);
    }

    setwordList(newWordList);
  }, [letterColorState]);

  return (
    <div
      id="wordListArea"
      className="h-[40vh] overflow-y-auto rounded-md bg-white p-2"
    >
      {wordList.length === 0 ? (
        <p className="py-4 text-center text-gray-500">No candidates</p>
      ) : (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {wordList.map((word) => {
            const isAnswer = answerSet.has(word);
            return (
              <button
                type="button"
                key={word}
                onClick={() => setSelectedWord(word)}
                title={
                  isAnswer ? "Possible answer" : "Valid guess (unlikely answer)"
                }
                className={
                  isAnswer
                    ? "cursor-pointer rounded-md bg-emerald-100 px-2 py-1.5 text-center text-lg font-semibold uppercase tracking-wide text-emerald-900 ring-1 ring-emerald-400 hover:bg-emerald-200 active:bg-emerald-300"
                    : "cursor-pointer rounded-md bg-slate-100 px-2 py-1.5 text-center text-lg font-medium uppercase tracking-wide text-slate-500 hover:bg-slate-200 active:bg-slate-300"
                }
              >
                {word}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
