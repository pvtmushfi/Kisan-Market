import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);

  // 🌐 detect language
  const detectLang = (text) =>
    /[\u0900-\u097F]/.test(text) ? "hi" : "en";

  // 🔊 FIXED SPEECH (HINDI + ENGLISH)
 const speak = (text, lang) => {
  const speech = new SpeechSynthesisUtterance(text);

  const loadVoicesAndSpeak = () => {
    const voices = window.speechSynthesis.getVoices();

    let selectedVoice = null;

    if (lang === "hi") {
      speech.lang = "hi-IN";

      // BEST Hindi voice selection
      selectedVoice =
        voices.find((v) => v.lang === "hi-IN") ||
        voices.find((v) => v.lang.startsWith("hi")) ||
        voices.find((v) => v.name.toLowerCase().includes("hindi"));
    } else {
      speech.lang = "en-US";

      selectedVoice =
        voices.find((v) => v.lang === "en-US") ||
        voices[0];
    }

    if (selectedVoice) {
      speech.voice = selectedVoice;
    }

    speech.rate = 0.95;
    speech.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  // IMPORTANT FIX: wait for voices
  const voices = window.speechSynthesis.getVoices();

  if (voices.length === 0) {
    window.speechSynthesis.onvoiceschanged = loadVoicesAndSpeak;
  } else {
    loadVoicesAndSpeak();
  }
};

  // 🎤 VOICE INPUT
  const toggleVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setMessage(text);
      sendMessage(text);
    };

    recognition.start();
  };

  // 🎥 YouTube FIX (WORKING LINK)
  const extractVideo = (text) => {
    const match = text.match(/VIDEO:\s*(.*)/i);
    if (!match) return null;

    const query = encodeURIComponent(
      match[1] + " farming india tutorial"
    );

    return `https://www.youtube.com/results?search_query=${query}`;
  };

  // 🚀 SEND MESSAGE
  const sendMessage = async (input) => {
    const msg = input || message;
    if (!msg.trim()) return;

    const lang = detectLang(msg);

    setChat((prev) => [
      ...prev,
      { role: "user", text: msg },
    ]);

    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/chat",
        { message: msg, lang }
      );

      const reply = res.data.reply;

      const clean = reply.split("VIDEO:")[0];

      setChat((prev) => [
        ...prev,
        { role: "bot", text: clean },
      ]);

      speak(clean, lang === "hi" ? "hi" : "en");

      const videoUrl = extractVideo(reply);

      if (videoUrl) {
        setChat((prev) => [
          ...prev,
          { role: "video", text: videoUrl },
        ]);
      }
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { role: "bot", text: "Server error" },
      ]);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        🌾 Kisan AI Voice Assistant
      </div>

      {/* CHAT BOX */}
      <div style={styles.chatBox}>
        {chat.map((c, i) =>
          c.role === "video" ? (
            <a
              key={i}
              href={c.text}
              target="_blank"
              rel="noreferrer"
              style={styles.video}
            >
              🎥 Watch Related Farming Video
            </a>
          ) : (
            <div
              key={i}
              style={{
                ...styles.msg,
                alignSelf:
                  c.role === "user"
                    ? "flex-end"
                    : "flex-start",
                background:
                  c.role === "user" ? "#d1f7c4" : "#eee",
              }}
            >
              {c.text}
            </div>
          )
        )}
      </div>

      {/* INPUT */}
      <div style={styles.inputBox}>
        <button onClick={toggleVoice} style={styles.voice}>
          🎤 Speak
        </button>

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask farming question..."
          onKeyDown={(e) =>
            e.key === "Enter" && sendMessage()
          }
          style={styles.input}
        />

        <button onClick={() => sendMessage()} style={styles.btn}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;

/* STYLES */
const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    border: "1px solid #ccc",
    borderRadius: "10px",
    fontFamily: "Arial",
  },
  header: {
    background: "#2e7d32",
    color: "white",
    padding: "10px",
    textAlign: "center",
  },
  chatBox: {
    height: "400px",
    overflowY: "auto",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  msg: {
    padding: "10px",
    borderRadius: "10px",
    maxWidth: "75%",
  },
  inputBox: {
    display: "flex",
    borderTop: "1px solid #ddd",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "none",
    outline: "none",
  },
  btn: {
    background: "#2e7d32",
    color: "white",
    border: "none",
    padding: "10px",
  },
  voice: {
    background: "#ff9800",
    border: "none",
    padding: "10px",
  },
  video: {
    padding: "10px",
    background: "#2196f3",
    color: "white",
    borderRadius: "8px",
    textDecoration: "none",
  },
};