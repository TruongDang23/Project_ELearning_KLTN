import { create } from "zustand"

const globalFlag = create((set) => ({
  reloadVoiceflow: false,
  setReloadVoiceflow: () => set((state) => ({ reloadVoiceflow: !state.reloadVoiceflow })),

  openPopupSummary: false,
  setOpenPopupSummary: () => set((state) => ({ openPopupSummary: !state.openPopupSummary })),

  summaryText: "",
  setSummaryText: (text) => set(() => ({ summaryText: text })),

  openInteractiveVideo: false,
  setOpenInteractiveVideo: (value) => set(() => ({ openInteractiveVideo: value })),

  interactQuestions: {},
  setInteractQuestions: (questions) => set(() => ({ interactQuestions: questions }))
}))

export { globalFlag }
