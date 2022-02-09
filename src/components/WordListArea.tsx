import { TextArea } from "@blueprintjs/core";
import { letterColorSelecters } from "../states";
import { WordList } from "../util/WordList";

export const WordListArea = () => {
  const letterColorState = letterColorSelecters.useLetterColor();

  const newWordList = WordList.filter((word) => {
    return (
      letterColorState.grayLetters.every(
        (s) =>
          !letterColorState.yellowLetters.map((y) => y.letter).includes(s) &&
          !word.includes(s.toLowerCase())
      ) &&
      letterColorState.yellowLetters.every(
        (s) =>
          !letterColorState.greenLetters
            .map((g) => g.letter)
            .includes(s.letter) && word.includes(s.letter.toLowerCase())
      ) &&
      letterColorState.yellowLetters.every(
        (s) => word[s.index] != s.letter.toLowerCase()
      ) &&
      letterColorState.greenLetters.every(
        (s) => word[s.index] == s.letter.toLowerCase()
      )
    );
  });

  console.debug(newWordList.length);
  return (
    <div id="wordListArea" className="">
      <TextArea
        value={newWordList.join("\n")}
        readOnly
        rows={15}
        fill={true}
      ></TextArea>
    </div>
  );
};
