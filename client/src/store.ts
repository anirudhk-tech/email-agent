import { create } from "zustand";

interface StoreState {
  templateDialogOpen: boolean;
  setTemplateDialogOpen: (value: boolean) => void;
  templateAddedFlag: boolean;
  toggleTemplateChangeFlag: () => void;
  templateEditing: string | null;
  setTemplateEditing: (value: string | null) => void;
  emailListAddedFlag: boolean;
  toggleEmailListAddedFlag: () => void;
  editEmailDialogOpen: boolean;
  setEditEmailDialogOpen: (value: boolean) => void;
  emailListEditing: string | null;
  setEmailListEditing: (value: string | null) => void;
  emailListEmailsEdittedFlag: boolean;
  toggleEmailListEmailsEdittedFlag: () => void;
  addEmailDialogOpen: boolean;
  setAddEmailDialogOpen: (value: boolean) => void;
  emailListAddedKeys: string[];
  addEmailListAddedKeys: (value: string) => void;
  emptyEmailListAddedKeys: () => void;
}

export const useStore = create<StoreState>((set) => ({
  templateDialogOpen: false,
  setTemplateDialogOpen: (value: boolean) => set({ templateDialogOpen: value }),
  templateAddedFlag: false,
  toggleTemplateChangeFlag: () =>
    set((state) => ({ templateAddedFlag: !state.templateAddedFlag })),
  templateEditing: null,
  setTemplateEditing: (value: string | null) => set({ templateEditing: value }),
  emailListAddedFlag: false,
  toggleEmailListAddedFlag: () =>
    set((state) => ({ emailListAddedFlag: !state.emailListAddedFlag })),
  editEmailDialogOpen: false,
  setEditEmailDialogOpen: (value: boolean) =>
    set({ editEmailDialogOpen: value }),
  emailListEditing: null,
  setEmailListEditing: (value: string | null) =>
    set({ emailListEditing: value }),
  emailListEmailsEdittedFlag: false,
  toggleEmailListEmailsEdittedFlag: () =>
    set((state) => ({
      emailListEmailsEdittedFlag: !state.emailListEmailsEdittedFlag,
    })),
  addEmailDialogOpen: false,
  setAddEmailDialogOpen: (value: boolean) => set({ addEmailDialogOpen: value }),
  emailListAddedKeys: [],
  addEmailListAddedKeys: (value: string) =>
    set((state) => ({
      emailListAddedKeys: [...state.emailListAddedKeys, value],
    })),
  emptyEmailListAddedKeys: () => set({ emailListAddedKeys: [] }),
}));
