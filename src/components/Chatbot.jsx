const Chatbot = ({ weatherData }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! Ask me anything." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);

    let weatherContext = "";
    if (weatherData && weatherData.temperature && weatherData.weather) {
      weatherContext = `Current weather in ${weatherData.location}: ${weatherData.temperature}°C, ${weatherData.weather}, humidity ${weatherData.humidity}%, wind speed ${weatherData.windSpeed} Km/h.`;
    }

    try {
      const res = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant. " +
                (weatherContext
                  ? `Here is the current weather data: ${weatherContext} Use this to suggest clothing or give weather-related advice if asked.`
                  : "")
            },
            { role: "user", content: input }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );
      const botText = res.data.choices[0].message.content;
      setMessages((msgs) => [...msgs, { from: "bot", text: botText }]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "Sorry, I couldn't answer that." }
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="chatbot-container">
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg ${msg.from}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="chatbot-msg bot">...</div>}
          </div>
          <div className="chatbot-input">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Ask a question..."
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading}>Send</button>
          </div>
        </div>
      )}
      <button className="chatbot-toggle" onClick={() => setOpen(o => !o)}>
        💬
      </button>
    </div>
  );
};

export default Chatbot;