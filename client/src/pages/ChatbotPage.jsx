import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import assets from "../assets/assets";
import { useGlobalContext } from "../context/GlobalProvider";

const ChatbotPage = () => {
  const { setChatState } = useGlobalContext();

  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    const thinkingMessage = { sender: "bot", text: "🤔 Thinking..." };

    setMessages((prev) => [...prev, userMessage, thinkingMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/chat/deep",
        { message: input },
        { withCredentials: true }
      );

      const botReply = res.data.reply || "No response from bot.";

      // Replace the "Thinking..." message with actual response
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { sender: "bot", text: botReply };
        return updated;
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error contacting chatbot.";
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          sender: "bot",
          text: `⚠️ ${errorMessage}`,
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[1000] bg-black/80 pt-10">
      <div className="max-w-2xl bg-gray-600 mx-auto rounded-2xl overflow-hidden ">
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 bg-gray-800">
          <div className="flex items-center gap-3">
            <img src={assets.chatbot} alt="chatbot" className="w-10" 
           
            />
            <h2 className="text-3xl font-bold text-gray-200">AsAutoBot</h2>
          </div>
          <img
            src={assets.removex}
            alt="close"
            className="w-5 cursor-pointer"
             onClick={()=>setChatState(false)}
          />
        </div>

        {/* Chat Messages */}
        <div className="bg-gray-900 px-4 pt-2 h-[500px] flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2 scrollbar-hide">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs text-sm ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="flex bg-gray-600 px-4 py-3 rounded-b-2xl">
          <div className="flex w-full bg-gray-900 p-2 rounded-3xl items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 text-gray-200 bg-transparent focus:outline-none"
            />
            <img
              src={assets.sendIcon}
              alt="send"
              onClick={handleSend}
              disabled={loading}
              className="w-8 ml-2 cursor-pointer mr-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
