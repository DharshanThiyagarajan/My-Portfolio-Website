import React, { useState, useRef, useEffect } from 'react';
import './chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi! I'm your AI assistant. How can I help you today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Simple AI responses - you can replace this with actual AI API
    const getAIResponse = async (userMessage) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const responses = {
            greeting: ["Hello! 👋", "Hi there!", "Hey! How can I help?"],
            portfolio: [
                "I can tell you about the projects and skills in this portfolio!",
                "This portfolio showcases full-stack development projects using modern technologies.",
                "The portfolio includes responsive web applications and interactive features."
            ],
            skills: [
                "Skills include: React, Node.js, JavaScript, HTML, CSS, MongoDB, Express.js",
                "Technical stack: MERN (MongoDB, Express, React, Node.js), Python, Git",
                "Proficient in frontend and backend development with modern frameworks"
            ],
            projects: [
                "Projects include: E-commerce platforms, Task management apps, Portfolio websites",
                "Check out the projects section for detailed information about each project!",
                "The projects demonstrate full-stack development capabilities with responsive design."
            ],
            contact: [
                "You can reach out via the contact form or social media links in the portfolio!",
                "Feel free to connect on LinkedIn or send an email for collaborations.",
                "Check the contact section for all the ways to get in touch."
            ],
            default: [
                "I'm here to help you learn more about this portfolio!",
                "That's interesting! Can you tell me more?",
                "I specialize in answering questions about this portfolio and its projects.",
                "Feel free to ask about skills, projects, or how to get in touch!",
                "I can help you navigate through the portfolio content."
            ]
        };

        const message = userMessage.toLowerCase();

        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
        } else if (message.includes('portfolio') || message.includes('about')) {
            return responses.portfolio[Math.floor(Math.random() * responses.portfolio.length)];
        } else if (message.includes('skill') || message.includes('tech') || message.includes('stack')) {
            return responses.skills[Math.floor(Math.random() * responses.skills.length)];
        } else if (message.includes('project') || message.includes('work')) {
            return responses.projects[Math.floor(Math.random() * responses.projects.length)];
        } else if (message.includes('contact') || message.includes('email') || message.includes('connect')) {
            return responses.contact[Math.floor(Math.random() * responses.contact.length)];
        } else {
            return responses.default[Math.floor(Math.random() * responses.default.length)];
        }
    };

    // const getAIResponse = async (userMessage) => {
    //     setIsLoading(true);

    //     try {
    //         // Example with OpenAI API
    //         const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer YOUR_OPENAI_API_KEY`
    //             },
    //             body: JSON.stringify({
    //                 model: "gpt-3.5-turbo",
    //                 messages: [
    //                     {
    //                         role: "system",
    //                         content: "You are a helpful portfolio assistant. Keep responses brief and relevant to the portfolio content."
    //                     },
    //                     {
    //                         role: "user",
    //                         content: userMessage
    //                     }
    //                 ],
    //                 max_tokens: 150
    //             })
    //         });

    //         const data = await response.json();
    //         return data.choices[0].message.content;
    //     } catch (error) {
    //         console.error('AI API Error:', error);
    //         return "I'm having trouble responding right now. Please try again later.";
    //     }
    // };

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        // Add user message
        const userMessage = {
            id: messages.length + 1,
            text: inputMessage,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        // Get AI response
        const aiResponse = await getAIResponse(inputMessage);

        const botMessage = {
            id: messages.length + 2,
            text: aiResponse,
            sender: 'bot',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const suggestedQuestions = [
        "Tell me about the portfolio",
        "What skills are showcased?",
        "Show me the projects",
        "How to contact?"
    ];

    return (
        <>
            {/* Chatbot Toggle Button */}
            <button
                className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="chatbot-icon">🤖</span>
                <span className="chatbot-pulse"></span>
            </button>

            {/* Chatbot Window */}
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div className="chatbot-title">
                            <span className="bot-avatar">🤖</span>
                            <div>
                                <h3>Portfolio Assistant</h3>
                                <span className="status">Online</span>
                            </div>
                        </div>
                        <button
                            className="close-btn"
                            onClick={() => setIsOpen(false)}
                        >
                            ×
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`message ${message.sender}`}
                            >
                                <div className="message-content">
                                    {message.text}
                                </div>
                                <span className="message-time">
                                    {message.timestamp.toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="message bot">
                                <div className="message-content typing">
                                    <span className="typing-dot"></span>
                                    <span className="typing-dot"></span>
                                    <span className="typing-dot"></span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggested Questions */}
                    {messages.length <= 2 && (
                        <div className="suggested-questions">
                            <p>Quick questions:</p>
                            <div className="suggestions">
                                {suggestedQuestions.map((question, index) => (
                                    <button
                                        key={index}
                                        className="suggestion-btn"
                                        onClick={() => {
                                            setInputMessage(question);
                                            setTimeout(() => handleSendMessage(), 100);
                                        }}
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask me about the portfolio..."
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={isLoading || !inputMessage.trim()}
                            className="send-btn"
                        >
                            {isLoading ? '⏳' : '➤'}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;