import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { useCallback } from "react";
import { RecoilAtomKeys, RecoilSelectorKeys } from "./RecoilKeys";
import { LetterIndex } from "../interfaces";

interface LetterColorState {
  grayLetters: string[];
  yellowLetters: LetterIndex[];
  greenLetters: LetterIndex[];
}

const letterColorState = atom<LetterColorState>({
  key: RecoilAtomKeys.LETTER_COLOR_STATE,
  default: {
    grayLetters: [],
    yellowLetters: [],
    greenLetters: [],
  },
});

// Selecters
type LetterColorSelecters = {
  useLetterColor: () => LetterColorState;
};

const letterColorSelecter = selector<LetterColorState>({
  key: RecoilSelectorKeys.LETTER_COLOR,
  get: ({ get }) => get(letterColorState),
});

export const letterColorSelecters: LetterColorSelecters = {
  useLetterColor: () => useRecoilValue(letterColorSelecter),
};

// actions
type LetterColorActions = {
  useSetLetterColor: () => (letterColorState: LetterColorState) => void;
};

export const letterColorActions: LetterColorActions = {
  useSetLetterColor: () => {
    const setState = useSetRecoilState(letterColorState);

    return useCallback(
      (letterColor: LetterColorState) => setState(() => letterColor),
      []
    );
  },
};
