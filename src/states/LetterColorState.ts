import { atom } from "jotai";
import type { LetterIndex } from "../interfaces";

export interface LetterColorState {
  grayLetters: string[];
  yellowLetters: LetterIndex[];
  greenLetters: LetterIndex[];
}

export const letterColorAtom = atom<LetterColorState>({
  grayLetters: [],
  yellowLetters: [],
  greenLetters: [],
});
