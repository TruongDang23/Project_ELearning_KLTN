import { create } from "zustand"

const globalFlag = create((set) => ({
  reloadVoiceflow: false,
  setReloadVoiceflow: () => set((state) => ({ reloadVoiceflow: !state.reloadVoiceflow }))

  // anotherFLag: data,
  // another setFlag: function
}))

export { globalFlag }
