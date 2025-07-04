import React, { useState } from "react";
import axios from "axios";
import assets from "../assets/assets";
import { useGlobalContext } from "../context/GlobalProvider";

const ChatbotPage = () => {

  const{chatState, setChatState} = useGlobalContext();

  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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

      // Replace "Thinking..." with real response
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
        updated[updated.length - 1] = { sender: "bot", text: `⚠️ ${errorMessage}` };
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
    <div className="absolute w-full h-full z-10 py-10 bg-black/80">
  
    <div className="max-w-2xl bg-gray-600 mx-auto  rounded-2xl">
      <div className="flex px-5 py-4 items-center  gap-100 cursor-pointer">
      <div className="flex">
         <img src={assets.chatbot} alt="" className="w-10 "/>
      <h2 className="text-3xl font-bold  text-gray-300 ">
        AsAutoBot
      </h2>
      </div>
     
      <img src={assets.close} alt="" className="w-10 items-end"
      onClick={()=>setChatState(false)}
      />
      </div>
   

      <div className="bg-gray-900 shadow-md px-4 pt-2 h-[500px] flex flex-col">
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
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
        </div>

      
      </div>

        {/* Input box */}
        <div className="flex bg-gray-600  px-4 py-3 rounded-3xl">
          <div className="flex w-full bg-gray-900 p-2 rounded-3xl">
             <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 text-gray-200 rounded-l-md focus:outline-none"
          />
          {/* <button
            onClick={handleSend}
            disabled={loading}
            className="
            text-white px-4 py-2 rounded-r-md"
          >
           
          </button> */}
           <img src={assets.send_icon} alt="" 
            onClick={handleSend}
            disabled={loading}
           className="w-10 text-white cursor-pointer p-1 mr-3"/>
          </div>
         
        </div>
    </div>
    </div>
  );
};

export default ChatbotPage;
