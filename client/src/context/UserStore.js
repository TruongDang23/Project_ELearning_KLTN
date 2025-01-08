import { create } from "zustand"

const userStore = create((set) => ({
  //MySQL
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
  //MongoDB
  social_networks: [],
  expertise: [],
  self_introduce: "",
  degrees: [],
  working_history: [],
  projects: [],
  course_enrolled: [],
  course_published: [],
  activity_status: '',

  updateInfor: (newInfor) => set((state) => ({
    ...state,
    ...newInfor
  }))
}))

export { userStore }