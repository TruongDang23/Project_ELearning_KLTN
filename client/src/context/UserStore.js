import { create } from "zustand";
import { persist } from "zustand/middleware";
import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_ENCRYPT_DATA

// Hàm mã hóa
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString()
};

// Hàm giải mã
const decryptData = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY)
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  } catch (error) {
    console.error("Decryption error:", error)
    return null;
  }
};

const defaultState = {
  userID: "",
  avatar: "",
  fullname: "",
  date_of_birth: "",
  mail: "",
  street: "",
  province: "",
  country: "",
  language: "",
  role: "",
  social_networks: [],
  expertise: [],
  self_introduce: "",
  degrees: [],
  working_history: [],
  projects: [],
  course_enrolled: [],
  course_published: [],
  activity_status: "",
  mylearning: []
}

const userStore = create(
  persist(
    (set) => ({
      ...defaultState,

      updateInfor: (newInfor) =>
        set((state) => ({
          ...state,
          ...newInfor
        })),

      resetInfor: () =>
        set(() => ({
          ...defaultState
        }))
    }),
    {
      name: "user-storage", // Key lưu trong localStorage
      storage: {
        getItem: (key) => {
          const encryptedData = localStorage.getItem(key);
          return encryptedData ? decryptData(encryptedData) : null;
        },
        setItem: (key, value) => {
          localStorage.setItem(key, encryptData(value));
        },
        removeItem: (key) => {
          localStorage.removeItem(key);
        }
      }
    }
  )
)

export { userStore }
