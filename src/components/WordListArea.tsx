import { useEffect, useState } from "react";
import { filterWordList } from "../lib";
import { letterColorSelecters } from "../states";
import { WordList } from "../util/WordList";

export const WordListArea = () => {
  const letterColorState = letterColorSelecters.useLetterColor();
  const [wordList, setwordList] = useState(WordList);

  useEffect(() => {
    const newWordList = filterWordList(
      WordList,
      letterColorState.grayLetters,
      letterColorState.yellowLetters,
      letterColorState.greenLetters
    );

    console.debug(newWordList.length);
    if (newWordList.length <= 20) {
      console.debug(newWordList);
    }

    setwordList(newWordList);
  }, [letterColorState]);

  return (
    <div id="wordListArea" className="h-[40vh]">
      <textarea
        className={"h-full w-full px-2 rounded-md text-black"}
        value={wordList.join("\n")}
        readOnly
      ></textarea>
    </div>
  );
};
