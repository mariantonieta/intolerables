import { useState } from "react";
import "./index.css";
import { useTranslation } from "react-i18next";
import api from "../../services/axiosConfig";

export function ChatQA() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<string[]>([]);
  const [visible, setVisible] = useState(true); 
const [loading, setLoading] = useState(false);
        
  const {t} = useTranslation();
 const handleSend = async () => {
        if (!input.trim()) return;

        setChat(prev => [...prev, `🧑‍💬: ${input}`]);
        setLoading(true);

        try {
          const response = await api.post("/api/chat", { message: input });
          console.log("🛠️ Respuesta backend:", response.data); 
          const respuesta = response.data.response;

          // Detectar si el modelo está cargando para mostrar mensaje especial
          if (respuesta.includes("modelo sigue cargando")) {
            setChat(prev => [...prev, `🤖: ⚠️ El modelo está cargando, intenta de nuevo en unos segundos...`]);
          } else {
            setChat(prev => [...prev, `🤖: ${respuesta}`]);
          }

        } catch (error) {
          console.error("Error llamando a la API:", error);
          setChat(prev => [...prev, `🤖: ${t("no_answer")}`]);
        } finally {
          setInput("");
          setLoading(false);
        }
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
            <button onClick={handleSend} disabled={loading}>
                   {t("send")}</button>
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
