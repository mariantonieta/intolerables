import { useState } from "react";
import { qaData } from "../../datos/qaDataChat";
import "./index.css";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

export function ChatQA() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<string[]>([]);
  const [visible, setVisible] = useState(true); 
const {t} = useTranslation();
  const handleSend = () => {
    if (!input.trim()) return;

   const lang = i18n.language as "es" | "en" | "it"; // Detecta el idioma actual

const matched = qaData.find(item =>
  input.toLowerCase().includes(item.question[lang].toLowerCase().slice(0, 10))
);

const respuesta = matched
  ? matched.answer[lang]
  : t("no_answer");

    setChat(prev => [...prev, `🧑‍💬: ${input}`, `🤖: ${respuesta}`]);
    setInput("");
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {visible && (
        <div className="chat-box large">
          <div className="chat-header">
            <h2>🤖 {t("chat_title")}</h2>
            <button onClick={() => setVisible(false)} className="btn-close">✖️</button>
          </div>
          <div className="chat-content">
            {chat.map((linea, idx) => (
              <p key={idx}>{linea}</p>
            ))}
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder={t("placeholder")}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSend}>{t("send")}</button>
          </div>
        </div>
      )}

      {!visible && (
        <img
          src="/icons/chatbot.jpeg" 
          alt="Abrir chat"
          className="chatbot-image"
          onClick={() => setVisible(true)}
        />
      )}
    </div>
  );
}
