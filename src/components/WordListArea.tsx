import { useEffect, useState } from "react";
import { filterWordList } from "../lib";
import { letterColorSelecters, selectedWordActions } from "../states";
import { WordList } from "../util/WordList";

export const WordListArea = () => {
  const letterColorState = letterColorSelecters.useLetterColor();
  const setSelectedWord = selectedWordActions.useSetSelectedWord();
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
          {wordList.map((word) => (
            <button
              type="button"
              key={word}
              onClick={() => setSelectedWord(word)}
              className="cursor-pointer rounded-md bg-slate-100 px-2 py-1.5 text-center text-lg font-medium uppercase tracking-wide text-slate-900 hover:bg-slate-200 active:bg-slate-300"
            >
              {word}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
