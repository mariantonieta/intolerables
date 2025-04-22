import { useEffect } from "react";
import { Naviagation } from "..";
import imagen3d from "../../../public/svg/image3d.svg";
import "./index.css";
export default function HomePage() {
  useEffect(() => {
    // Efecto de aparición gradual
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

      <div className="img-container">
        <img src={imagen3d} width={700} height={700} className="img-flotante" alt="Estomago sano, estomago feliz"></img>
        <button className="btn click">Empieza ahora</button>
      </div>
    </div>
    </div>
  );
}
