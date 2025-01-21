/* eslint-disable no-console */
import { create } from "zustand"
import { notify } from "api"

const notifyStore = create((set) => ({
  listNotifies: [],
  unreadCount: 0,

  markAsRead: async (userID, notifyID) => {
    try {
      const response = await notify.updateUnreadNotify(userID, notifyID)
      console.log('response', response)
      if (response.status == 200) {
        set((state) => ({
          unreadCount: state.unreadCount - 1,
          listNotifies: state.listNotifies.map((notification) =>
            notification.notifyID == notifyID
              ? { ...notification, isRead: 1 }
              : notification
          )
        }))
      }
      else
        console.log('error mark as read')
    }
    catch (error) {
      console.log('Failed to update unread notify', error)
    }
  },

  fetchNotify: async (userID) => {
    try {
      const response = await notify.getInformation(userID)
      if (response.status == 200) {
        set({ listNotifies: response.data.listNotifications })
        set({ unreadCount: response.data.unreadCount })
      }
      else
        console.log('error fetch')
    } catch (error) {
      console.error('Failed to fetch items:', error)
    }
  }
}))

export { notifyStore }