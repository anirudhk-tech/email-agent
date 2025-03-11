import { create } from "zustand";

interface StoreState {
  emailWidgetSearchValue: string;
  setEmailWidgetSearchValue: (value: string) => void;
  templateWidgetSearchValue: string;
  setTemplateWidgetSearchValue: (value: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  emailWidgetSearchValue: "",
  setEmailWidgetSearchValue: (value: string) =>
    set({ emailWidgetSearchValue: value }),
  templateWidgetSearchValue: "",
  setTemplateWidgetSearchValue: (value: string) =>
    set({ templateWidgetSearchValue: value }),
}));
