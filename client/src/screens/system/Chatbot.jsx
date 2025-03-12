import { useEffect } from "react";

const ChatBotUI = () => {
  useEffect(() => {
    if (!document.getElementById("voiceflow-chat-script")) {
      const script = document.createElement("script");
      script.id = "voiceflow-chat-script"; // Thêm ID để tránh chèn nhiều lần
      script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
      script.type = "text/javascript";
      script.async = true;

      script.onload = () => {
        if (window.voiceflow && window.voiceflow.chat) {
          window.voiceflow.chat.load({
            verify: { projectID: "67ccfa5571a708d6b598fd23" },
            url: "https://general-runtime.voiceflow.com",
            versionID: "production",
            voice: {
              url: "https://runtime-api.voiceflow.com"
            },
          });
        }
      };

      document.body.appendChild(script);
    }
  }, []);

  return <div id="chatbot-container"></div>;
};

export default ChatBotUI;