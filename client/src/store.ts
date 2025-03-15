import { create } from "zustand";
import { SnackbarConfig } from "./types";

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
  emailListAddedKeys: Set<string>;
  addEmailListAddedKeys: (value: string) => void;
  emptyEmailListAddedKeys: () => void;
  emailListDeletedKeys: Set<string>;
  addEmailListDeletedKeys: (value: string) => void;
  emptyEmailListDeletedKeys: () => void;
  addEmailListDialogOpen: boolean;
  setAddEmailListDialogOpen: (value: boolean) => void;
  deleteTemplateDialogOpen: boolean;
  setDeleteTemplateDialogOpen: (value: boolean) => void;
  deleteEmailListDialogOpen: boolean;
  setDeleteEmailListDialogOpen: (value: boolean) => void;
  snackbarConfig: SnackbarConfig | null;
  setSnackbarConfig: (config: SnackbarConfig | null) => void;
  snackbarOpen: boolean;
  setSnackbarOpen: (value: boolean) => void;
  confirmDiscardTemplateDraftDialogOpen: boolean;
  setConfirmDiscardTemplateDraftDialogOpen: (value: boolean) => void;
  confirmDiscardEmailListDraftDialogOpen: boolean;
  setConfirmDiscardEmailListDraftDialogOpen: (value: boolean) => void;
  sendDialogOpen: boolean;
  setSendDialogOpen: (value: boolean) => void;
  totalDailyMailsSent: number | null;
  setTotalDailyMailsSent: (value: number | null) => void;
  loginDialogOpen: boolean;
  setLoginDialogOpen: (value: boolean) => void;
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
  emailListAddedKeys: new Set(),
  addEmailListAddedKeys: (value: string) =>
    set((state) => {
      const updatedSet = new Set(state.emailListAddedKeys);
      updatedSet.add(value);
      return { emailListAddedKeys: updatedSet };
    }),
  emptyEmailListAddedKeys: () => set({ emailListAddedKeys: new Set() }),
  emailListDeletedKeys: new Set(),
  addEmailListDeletedKeys: (value: string) =>
    set((state) => {
      const updatedSet = new Set(state.emailListDeletedKeys);
      updatedSet.add(value);
      return { emailListDeletedKeys: updatedSet };
    }),
  emptyEmailListDeletedKeys: () => set({ emailListDeletedKeys: new Set() }),
  addEmailListDialogOpen: false,
  setAddEmailListDialogOpen: (value: boolean) =>
    set({ addEmailListDialogOpen: value }),
  deleteTemplateDialogOpen: false,
  setDeleteTemplateDialogOpen: (value: boolean) =>
    set({ deleteTemplateDialogOpen: value }),
  deleteEmailListDialogOpen: false,
  setDeleteEmailListDialogOpen: (value: boolean) =>
    set({ deleteEmailListDialogOpen: value }),
  snackbarConfig: null,
  setSnackbarConfig: (config: SnackbarConfig | null) =>
    set({ snackbarConfig: config }),
  snackbarOpen: false,
  setSnackbarOpen: (value: boolean) => set({ snackbarOpen: value }),
  confirmDiscardTemplateDraftDialogOpen: false,
  setConfirmDiscardTemplateDraftDialogOpen: (value: boolean) =>
    set({ confirmDiscardTemplateDraftDialogOpen: value }),
  confirmDiscardEmailListDraftDialogOpen: false,
  setConfirmDiscardEmailListDraftDialogOpen: (value: boolean) =>
    set({ confirmDiscardEmailListDraftDialogOpen: value }),
  sendDialogOpen: false,
  setSendDialogOpen: (value: boolean) => set({ sendDialogOpen: value }),
  totalDailyMailsSent: null,
  setTotalDailyMailsSent: (value: number | null) =>
    set({ totalDailyMailsSent: value }),
  loginDialogOpen: false,
  setLoginDialogOpen: (value: boolean) => set({ loginDialogOpen: value }),
}));
