import { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ SINGLE CLEAN sendMessage FUNCTION
  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = { role: "user", text: message };
    setChat((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: message
      });

      console.log("BOT:", res.data.reply);

      const botMessage = {
        role: "bot",
        text: res.data.reply || "No response"
      };

      setChat((prev) => [...prev, botMessage]);

    } catch (err) {
      console.log("ERROR:", err);

      setChat((prev) => [
        ...prev,
        { role: "bot", text: "Error: Unable to connect to server" }
      ]);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  // ✅ ENTER KEY SUPPORT
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>🤖 Kisan Market Chatbot</div>

      {/* Chat area */}
      <div style={styles.chatBox}>
        {chat.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf:
                msg.role === "user" ? "flex-end" : "flex-start",
              backgroundColor:
                msg.role === "user" ? "#DCF8C6" : "#F1F0F0"
            }}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div style={styles.typing}>Bot is typing...</div>
        )}
      </div>

      {/* Input box */}
      <div style={styles.inputBox}>
        <input
          style={styles.input}
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button style={styles.button} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;

/* ---------- Styles ---------- */
const styles = {
  container: {
    width: "100%",
    maxWidth: "600px",
    height: "80vh",
    margin: "20px auto",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    fontFamily: "Arial"
  },

  header: {
    padding: "15px",
    backgroundColor: "#111",
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  },

  chatBox: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    backgroundColor: "#fafafa"
  },

  message: {
    padding: "10px 15px",
    borderRadius: "20px",
    maxWidth: "70%",
    fontSize: "14px"
  },

  inputBox: {
    display: "flex",
    borderTop: "1px solid #ddd"
  },

  input: {
    flex: 1,
    padding: "12px",
    border: "none",
    outline: "none"
  },

  button: {
    padding: "12px 20px",
    border: "none",
    backgroundColor: "#111",
    color: "#fff",
    cursor: "pointer"
  },

  typing: {
    fontSize: "12px",
    color: "gray",
    fontStyle: "italic"
  }
};