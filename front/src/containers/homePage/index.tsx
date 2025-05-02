import { useEffect } from "react";
import { Naviagation } from "..";
import { useNavigate } from "react-router-dom";

import "./index.css";
export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Efecto al recargar la pag
    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("visible");
      }, 300 * (index + 1));
    });
  }, []);
  return (
    <div className="home-page" >
    <Naviagation />
<div className="container">
    
      <h1 className="center-text fade-in">ENCUENTRA</h1>
      <h2 className="left-text fade-in">EL RESTAURANT O LA RECETA</h2>
      <h2 className="right-text fade-in">PARA QUITARTE EL ANTOJO</h2>

      <div className="img-container fade-in">
        <img src="/svg/image3d.svg" width={700} height={700} className="img-flotante" alt="Estomago sano, estomago feliz"></img>
        <button className="btn pulse" onClick={() => navigate("/intolerancias")}  >Empieza ahora</button>
      </div>
    </div>
    </div>
  );
}
