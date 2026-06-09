import { useCallback } from "react";
import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { RecoilAtomKeys, RecoilSelectorKeys } from "./RecoilKeys";

const selectedWordState = atom<string>({
  key: RecoilAtomKeys.SELECTED_WORD_STATE,
  default: "",
});

// Selecters
type SelectedWordSelecters = {
  useSelectedWord: () => string;
};

const selectedWordSelecter = selector<string>({
  key: RecoilSelectorKeys.SELECTED_WORD,
  get: ({ get }) => get(selectedWordState),
});

export const selectedWordSelecters: SelectedWordSelecters = {
  useSelectedWord: () => useRecoilValue(selectedWordSelecter),
};

// actions
type SelectedWordActions = {
  useSetSelectedWord: () => (word: string) => void;
};

export const selectedWordActions: SelectedWordActions = {
  useSetSelectedWord: () => {
    const setState = useSetRecoilState(selectedWordState);

    return useCallback((word: string) => setState(() => word), [setState]);
  },
};
