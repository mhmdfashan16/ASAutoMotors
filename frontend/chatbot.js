const qaPairs = {
  "what are your working hours": "We are open Monday to Saturday from 9 AM to 6 PM.",
  "where are you located": "We are located at 123 Main Road, Colombo, Sri Lanka.",
  "do you offer financing": "Yes, we offer financing options on selected bikes. Please contact us for details.",
  "what brands do you sell": "We sell Yamaha, Harley-Davidson, KTM, and many more top brands.",
  "how can i contact you": "You can reach us at +94 77 123 4567 or email info@asautomotors.com.",
  "do you provide warranty": "Yes, all our bikes come with a manufacturer warranty.",
  "can i book a test ride": "Absolutely! You can book a test ride by contacting us or visiting our store.",
  "what is the return policy": "We accept returns within 7 days in case of manufacturing defects.",
  "do you provide custom services": "Yes, we offer custom modifications and service packages tailored to your needs."
};

function findAnswer(question) {
  const q = question.toLowerCase().trim();

  // Special greetings
  if (q === "hi" || q === "hello" || q === "hey") {
    return "Hello! How can I assist you today?";
  }

  // Search in FAQ
  for (const key in qaPairs) {
    if (q.includes(key)) {
      return qaPairs[key];
    }
  }

  return "Sorry, I don't have the answer to that yet.";
}

function toggleChatbot() {
  const chatbot = document.getElementById('chatbot');
  if (!chatbot) return;

  if (chatbot.style.display === 'block') {
    chatbot.style.display = 'none';
  } else {
    chatbot.style.display = 'block';
    const input = document.getElementById('chatbotInput');
    if (input) input.focus();
  }
}

function handleKey(event) {
  if (event.key === 'Enter') {
    const input = event.target;
    const message = input.value.trim();
    if (message) {
      addChatbotMessage("You: " + message);
      input.value = '';

      setTimeout(() => {
        const answer = findAnswer(message);
        addChatbotMessage("AS Auto Motors: " + answer);
      }, 800);
    }
  }
}

function addChatbotMessage(text) {
  const container = document.getElementById('chatbotMessages');
  if (!container) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = 'chatbot-message';
  msgDiv.textContent = text;

  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}
