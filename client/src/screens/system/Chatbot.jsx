import { anonymous } from "api"
import { useEffect, useState } from "react"

const DOMAIN = import.meta.env.VITE_DOMAIN
const PROJECTID = import.meta.env.VITE_PRODUCT_ID_VOICEFLOW
const userID = localStorage.getItem("userID") ? localStorage.getItem("userID") : 'guest'

const ChatBotUI = () => {
  const [cookie, setCookie] = useState(null);

  const getCookie = async () => {
    try {
      const response = await anonymous.getToken()

      if (response.status === 200) {
        setCookie(response.data.token)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to get token:", error.response?.data || error)
    }
  }

  useEffect(() => {
    getCookie()
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div id="chatbot-container"></div>
}

export default ChatBotUI