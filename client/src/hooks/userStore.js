import { create } from 'zustand'
import { student } from '../../api'

const UserStore = create((set) => ({
  user: {
    id: null,
    name: "",
    email: "",
    avatar: ""
  },

  updateUserField: (field, value) =>
    set((state) => ({
      user: {
        ...state.user,
        [field]: value // Cập nhật một trường cụ thể trong user
      }
    })),

  loadUserById: async (userId) => {
    try {
      const data = student.getInformation(userId)
      set({ user: data });
    } catch (error) {
      console.error("Error loading user:", error);
    }
  }
}));

export default UserStore;