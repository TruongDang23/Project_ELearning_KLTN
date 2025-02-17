/* eslint-disable no-console */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import CryptoJS from "crypto-js";
import { notify } from "api";

const SECRET_KEY = "elspace.hcmute.edu@gmail.com"

// Hàm mã hóa dữ liệu
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Hàm giải mã dữ liệu
const decryptData = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};

const notifyStore = create(
  persist(
    (set) => ({
      listNotifies: [],
      unreadCount: 0,

      markAsRead: async (userID, notifyID) => {
        try {
          const response = await notify.updateUnreadNotify(userID, notifyID);
          console.log("response", response);
          if (response.status === 200) {
            set((state) => ({
              unreadCount: Math.max(0, state.unreadCount - 1),
              listNotifies: state.listNotifies.map((notification) =>
                notification.notifyID === notifyID
                  ? { ...notification, isRead: 1 }
                  : notification
              )
            }));
          } else {
            console.log("Error marking as read");
          }
        } catch (error) {
          console.log("Failed to update unread notify", error);
        }
      },

      fetchNotify: async (userID) => {
        try {
          const response = await notify.getInformation(userID);
          if (response.status === 200) {
            set({
              listNotifies: response.data.listNotifications,
              unreadCount: response.data.unreadCount
            });
          } else {
            console.log("Error fetching notifications");
          }
        } catch (error) {
          console.error("Failed to fetch notifications:", error);
        }
      },

      newNotify: () => {
        set((state) => ({
          unreadCount: state.unreadCount + 1
        }));
      }
    }),
    {
      name: "notify-storage", // Key trong localStorage
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
);

export { notifyStore }
