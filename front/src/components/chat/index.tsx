import { useState } from "react";
import { qaData } from "../../datos/qaDataChat";
import "./index.css";
export function ChatQA() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<string[]>([]);
  const [visible, setVisible] = useState(true); // Por defecto, el chat está visible

  const handleSend = () => {
    if (!input.trim()) return;

    const matched = qaData.find(item =>
      input.toLowerCase().includes(item.question.toLowerCase().slice(0, 10))
    );

    const respuesta = matched
      ? matched.answer
      : "Lo siento, no tengo una respuesta precisa para eso aún 😢";

    setChat(prev => [...prev, `🧑‍💬: ${input}`, `🤖: ${respuesta}`]);
    setInput("");
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {visible && (
        <div className="chat-box large">
          <div className="chat-header">
            <h2>🤖 Chat de Intolerancias</h2>
            <button onClick={() => setVisible(false)}>✖️</button>
          </div>
          <div className="chat-content">
            {chat.map((linea, idx) => (
              <p key={idx}>{linea}</p>
            ))}
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Haz tu pregunta..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSend}>Enviar</button>
          </div>
        </div>
      )}

      {!visible && (
        <img
          src="/icons/chatbot.jpeg" // Sustituye por la ruta real
          alt="Abrir chat"
          className="chatbot-image"
          onClick={() => setVisible(true)}
        />
      )}
    </div>
  );
}
