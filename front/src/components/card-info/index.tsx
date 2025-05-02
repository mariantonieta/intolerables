import { useState } from "react";
import "./index.css";

interface CardInfoProps {
  title: string;
  content: string;
}

const CardInfo: React.FC<CardInfoProps> = ({ title, content }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className={`card ${showInfo ? "open" : ""}`} onClick={() => setShowInfo(!showInfo)}>
      <div className="card-content">
        <h3>{title}</h3>
        {showInfo && <p>{content}</p>}
      </div>
    </div>
  );
};

export default CardInfo;
