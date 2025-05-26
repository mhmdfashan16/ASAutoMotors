
// controllers/chatbotController.js
import OpenAI from 'openai';
import jwt from 'jsonwebtoken'
import Chat from '../models/Chat.js';
import dotenv from 'dotenv';
import axios from 'axios';
import User from '../models/User.js';
dotenv.config();

//Chat with deepInfra

export const chatWithDeepInfra = async (req, res) => {
  const { message } = req.body;

  // Static or dynamic personal data (can come from DB or token)
    const userContext = {
      name: "A.S Auto Motors Customer",
      company: "A.S Auto Motors",
      location: "Sri Lanka",
      interest: "second-hand bikes, promotions, and customer support"
    };

    const fullPrompt = `
    You are an AI assistant for A.S Auto Motors, a second-hand bike sales company aiming to enhance its digital presence through a new online platform.

    Company Context:
    - A.S Auto Motors specializes in second-hand bike sales.
    - The company is building a website to display available bikes with images, specs, and pricing.
    - Customers can search, filter, and inquire about bikes through the website.
    - A promotional discount of LKR 10,000 is available to customers who browse online and purchase in-store.
    - The assistant should improve customer interaction and guide them through product information and services.

    User Info:
    - Role: Website visitor or potential buyer
    - Location: Likely in Sri Lanka
    - Interests: Viewing bike models, asking about availability, pricing, promotions, or how to claim the discount

    User asked: ${message}

    Respond as a helpful assistant. Be friendly, informative, and provide clear, concise answers based on the business context.
    `;


  try {
    const response = await axios.post(
      'https://api.deepinfra.com/v1/openai/chat/completions',
      {
        model: 'meta-llama/Meta-Llama-3-8B-Instruct',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: fullPrompt }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DEEPINFRA_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.choices[0]?.message?.content || "No response.";
    //Update user chat history
    const token = req.cookies.userToken;
        if (!token) return res.status(401).json({ success: false, message: 'No token provided' });
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const userId = decoded.id;

    await User.findByIdAndUpdate(userId, {
      $push:{
        chatHistory:[
          {
            message:message,
            sender:'user',
            timestamp:new Date()
          },
          {
            message: reply,
            sender:'bot',
            timestamp: new Date()
          }
        ]
      }
    })
    res.status(200).json({ success: true, reply });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

