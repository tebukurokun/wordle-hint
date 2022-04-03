import { useEffect, useState } from "react";
import { letterColorSelecters } from "../states";
import { WordList } from "../util/WordList";

export const WordListArea = () => {
  const letterColorState = letterColorSelecters.useLetterColor();
  const [wordList, setwordList] = useState(WordList);

  useEffect(() => {
    const newWordList = WordList.filter((word) =>
      letterColorState.grayLetters
        .filter(
          (s) =>
            !letterColorState.yellowLetters.map((y) => y.letter).includes(s) &&
            !letterColorState.greenLetters.map((g) => g.letter).includes(s)
        )
        .every((s) => !word.includes(s.toLowerCase()))
    )
      .filter((word) =>
        letterColorState.yellowLetters.every((s) =>
          word.includes(s.letter.toLowerCase())
        )
      )
      .filter((word) =>
        letterColorState.greenLetters.every(
          (s) => word[s.index] == s.letter.toLowerCase()
        )
      )
      .filter((word) =>
        letterColorState.yellowLetters.every(
          (s) => word[s.index] != s.letter.toLowerCase()
        )
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
