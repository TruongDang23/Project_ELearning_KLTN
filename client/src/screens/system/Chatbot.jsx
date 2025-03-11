import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReplayIcon from '@mui/icons-material/Replay'

const ChatBotUI = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const initialChat = [
    { sender: "ai", text: "Xin chào! Tôi có thể giúp gì cho bạn?", time: new Date().toLocaleTimeString() }
  ];
  const [chat, setChat] = useState(initialChat);

  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        sender: "user",
        text: message,
        time: new Date().toLocaleTimeString()
      };
      setChat([...chat, newMessage]);
      setMessage("");
    }
  };

  // Hàm reset chat
  const refreshChat = () => {
    setChat(initialChat);
  };

  return (
    <>
      {/* Button mở popup */}
      <button
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "12px 20px 12px 50px",
          borderRadius: "50px",
          cursor: "pointer",
          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontSize: "16px",
          fontWeight: "bold",
          transition: "all 0.3s ease"
        }}
        onClick={() => setShowPopup(!showPopup)}
      >
        <img
          width="60"
          height="60"
          src="https://img.icons8.com/fluency/48/jasper-ai.png"
          alt="AI Assistant"
          style={{
            position: "absolute",
            left: "-20px",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "white",
            borderRadius: "50%",
            padding: "5px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
          }}
        />
        AI Assistant
      </button>

      {/* Popup hội thoại có hiệu ứng */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              position: "fixed",
              bottom: "80px",
              right: "20px",
              width: "400px",
              minHeight: "500px",
              backgroundColor: "#f5f5f5",
              boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
              borderRadius: "10px",
              padding: "15px",
              zIndex: 1000,
              display: "flex",
              flexDirection: "column"
            }}
          >
            {/* Header popup */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                paddingBottom: "10px"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <img
                  width="32"
                  height="32"
                  src="https://img.icons8.com/fluency/48/jasper-ai.png"
                  alt="AI Assistant"
                />
                <h3 style={{ margin: 0, fontSize: "1.6rem", fontWeight: "bold", color: "#333" }}>
                  AI Assistant
                </h3>
              </div>
              <div>
                {/* Nút Refresh */}
                <button
                  onClick={refreshChat}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "23px",
                    color: "#007bff",
                    marginRight: "10px"
                  }}
                >
                  <ReplayIcon/>
                </button>
                {/* Nút Đóng */}
                <button
                  onClick={() => setShowPopup(false)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                    color: "#999"
                  }}
                >
                  ✖
                </button>
              </div>
            </div>

            {/* Nội dung chat */}
            <div
              ref={chatRef}
              style={{
                flex: 1,
                minHeight: "200px",
                maxHeight: "400px",
                padding: "10px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                scrollbarWidth: "thin",
                scrollbarColor: "#ccc #f5f5f5"
              }}
            >
              {chat.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: msg.sender === "user" ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                    backgroundColor: msg.sender === "user" ? "#cce5ff" : "white",
                    padding: "10px",
                    borderRadius: "10px",
                    maxWidth: "75%",
                    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <p style={{ margin: 0, fontSize: "1.6rem", color: "#333" }}>{msg.text}</p>
                  <small style={{ display: "block", textAlign: "right", color: "#888", marginTop: "5px" }}>
                    {msg.time}
                  </small>
                </motion.div>
              ))}
            </div>

            {/* Input chat */}
            <div
              style={{
                display: "flex",
                borderTop: "1px solid #ddd",
                paddingTop: "10px",
                backgroundColor: "#fff",
                padding: "10px",
                borderRadius: "5px"
              }}
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  outline: "none",
                  fontSize: "1.6rem"
                }}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                style={{
                  marginLeft: "8px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "1.6rem"
                }}
                onClick={sendMessage}
              >
                Gửi
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBotUI;
