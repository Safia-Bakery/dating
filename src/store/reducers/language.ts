import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootConfig";
import { Language } from "@/utils/types";

interface State {
  lang: Language;
}

const initialState: State = {
  lang: Language.ru,
};

export const languageReducer = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLanguage: (state, { payload }: PayloadAction<Language>) => {
      state.lang = payload;
    },
  },
});

export const langSelector = (state: RootState) => state.language.lang;

export const { changeLanguage } = languageReducer.actions;
export default languageReducer.reducer;
