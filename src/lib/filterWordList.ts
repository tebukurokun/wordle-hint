import { LetterIndex } from "../interfaces";

export const filterWordList = (
  wordList: string[],
  grayLetters: string[],
  yellowLetters: LetterIndex[],
  greenLetters: LetterIndex[]
): string[] => {
  return wordList
    .filter((word) =>
      grayLetters
        .filter(
          (s) =>
            !yellowLetters.map((y) => y.letter).includes(s) &&
            !greenLetters.map((g) => g.letter).includes(s)
        )
        .every((s) => !word.includes(s.toLowerCase()))
    )
    .filter((word) =>
      yellowLetters.every((s) => word.includes(s.letter.toLowerCase()))
    )
    .filter((word) =>
      greenLetters.every((s) => word[s.index] == s.letter.toLowerCase())
    )
    .filter((word) =>
      yellowLetters.every((s) => word[s.index] != s.letter.toLowerCase())
    );
};
