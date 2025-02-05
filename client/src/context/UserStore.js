import { create } from "zustand"

const defaultState = {
  // MySQL
  userID: '',
  avatar: '',
  fullname: '',
  date_of_birth: '',
  mail: '',
  street: '',
  province: '',
  country: '',
  language: '',
  role: '',

  // MongoDB
  social_networks: [],
  expertise: [],
  self_introduce: "",
  degrees: [],
  working_history: [],
  projects: [],
  course_enrolled: [],
  course_published: [],
  activity_status: '',

  // My Learning (Student)
  mylearning: []
}

const userStore = create((set) => ({
  ...defaultState,

  updateInfor: (newInfor) => set((state) => ({
    ...state,
    ...newInfor
  })),

  resetInfor: () => set(() => ({
    ...defaultState // Reset to initial state
  }))
}))

export { userStore }