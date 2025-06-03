import { anonymous } from "api"
import { useEffect, useState } from "react"
import { globalFlag } from "~/context/GlobalFlag"

const DOMAIN = import.meta.env.VITE_DOMAIN
const PROJECTID = import.meta.env.VITE_PRODUCT_ID_VOICEFLOW
const GLOBAL_API = import.meta.env.VITE_GLOBAL_API_URL

const ChatBotUI = () => {
  const [cookie, setCookie] = useState(null);
  const flagReload = globalFlag((state) => state.reloadVoiceflow)
  const getCookie = async () => {
    try {
      const response = await anonymous.getToken()

      if (response.status === 200) {
        setCookie(response.data)
      }
      else
        setCookie('none')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to get token:", error.response?.data || error)
    }
  }
  useEffect(() => {
    const userID = localStorage.getItem("userID") ? localStorage.getItem("userID") : 'guest'
    getCookie()
    if (!cookie) return
    if (!document.getElementById("voiceflow-chat-script")) {
      const script = document.createElement("script")
      script.id = "voiceflow-chat-script"; // Thêm ID để tránh chèn nhiều lần
      script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs"
      script.type = "text/javascript"
      script.async = true

      script.onload = () => {
        if (window.voiceflow && window.voiceflow.chat) {
          window.voiceflow.chat.load({
            verify: { projectID: PROJECTID },
            url: "https://general-runtime.voiceflow.com",
            versionID: "production",
            launch: {
              event: {
                type: "launch",
                payload: {
                  userID: userID,
                  domain: DOMAIN,
                  global_api: GLOBAL_API,
                  cookie: cookie
                }
              }
            },
            voice: {
              url: "https://runtime-api.voiceflow.com"
            }
          })
        }
      }

      document.body.appendChild(script)
    }
  }, [cookie, flagReload])

  return <div id="chatbot-container"></div>
}

export default ChatBotUI

