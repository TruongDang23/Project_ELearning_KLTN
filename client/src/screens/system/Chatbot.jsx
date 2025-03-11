import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

const VF_API_KEY = "VF.DM.67679c3311a754f767bec5c3.e6mcy3aMZeakREfo"; // Thay thế bằng API Key thực tế
const USER_ID = "I000"; // Thay thế bằng user ID hợp lệ

export default function ChatbotUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    startChat();
  }, []);

  const startChat = async () => {
    setLoading(true);
    setTyping(true);
    try {
      const response = await fetch(`https://general-runtime.voiceflow.com/state/user/${USER_ID}/interact?logs=off`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": VF_API_KEY
        },
        body: JSON.stringify({ action: { type: "launch" }, config: { tts: false } })
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();

      setTyping(false);
      setLoading(false);

      data?.forEach((msg, index) => {
        if (msg?.payload?.message) {
          setTimeout(() => {
            setMessages((prev) => [...prev, { text: msg.payload.message, sender: "bot", time: new Date() }]);
          }, msg.payload.delay || 500 * index);
        }
      });
    } catch (error) {
      console.error("Lỗi khi gọi API Voiceflow:", error);
      setTyping(false);
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user", time: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setTyping(true);

    try {
      const response = await fetch("/api/voiceflow/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": VF_API_KEY
        },
        body: JSON.stringify({ message: input })
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();

      setTimeout(() => {
        setMessages((prev) => [...prev, { text: data[0]?.payload?.message || "Không có phản hồi", sender: "bot", time: new Date() }]);
        setTyping(false);
        setLoading(false);
      }, data[0]?.payload?.delay || 1000);
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn:", error);
      setMessages((prev) => [...prev, { text: "Lỗi khi gửi tin nhắn", sender: "bot", time: new Date() }]);
      setTyping(false);
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto p-4 shadow-lg rounded-2xl bg-gray-100">
      <CardContent className="h-96 overflow-y-auto space-y-4 p-4 flex flex-col">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-xl max-w-[80%] ${msg.sender === "bot" ? "bg-white text-black self-start" : "bg-blue-100 text-black self-end"}`}
          >
            <p className="text-sm">{msg.text}</p>
            <span className="block text-xs text-gray-500 mt-1">{format(msg.time, "HH:mm:ss")}</span>
          </motion.div>
        ))}
        {typing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.6 }}
            className="p-3 rounded-xl max-w-[80%] bg-white text-black self-start flex items-center"
          >
            <span className="text-sm">Đang nhập</span>
            <motion.span className="ml-1 w-2 h-2 bg-black rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6 }}></motion.span>
            <motion.span className="ml-1 w-2 h-2 bg-black rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}></motion.span>
            <motion.span className="ml-1 w-2 h-2 bg-black rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}></motion.span>
          </motion.div>
        )}
      </CardContent>
      <div className="flex gap-2 p-2 border-t">
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Nhập tin nhắn..." className="flex-1" />
        <Button onClick={sendMessage} disabled={loading}>Gửi</Button>
      </div>
    </Card>
  );
}