import { useEffect } from "react";
import "./index.css";
import { Naviagation } from "../../containers";

export default function About() {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("visible");
      }, 300 * (index + 1));
    });
  }, []);

  return (
    <div className="about-page">
      <Naviagation />
      <div className="container">
        <h1 className="center-text fade-in">Sobre Mí</h1>

        <div className="about-content fade-in">
          <div className="about-text">
          <p>¡Hola! Soy Mariantonieta, y quiero darte la bienvenida a mi espacio.</p>
<p>Este proyecto nació de una vivencia muy personal: ser celíaca y enfrentarme a diario a las limitaciones en la cocina. Esta realidad me impulsó a crear un lugar donde las intolerancias alimentarias no sean un obstáculo para disfrutar de una buena comida.</p>
<p>Aquí te ofrezco recetas pensadas para diversas necesidades dietéticas, con la celiaquía como punto de partida. Mi ilusión es que encuentres inspiración, explores nuevos sabores y compruebes que cocinar sin gluten (y otras restricciones) puede ser fácil y gratificante.</p>
<p>Mi mayor deseo es que este sea tu rincón seguro para comer rico y disfrutar sin preocupaciones. ¡Bienvenido/a!</p>
                    </div>

          <div className="about-image">
          </div>
        </div>

        <div className="btn-container fade-in">
          <button className="btn pulse">Descubre recetas</button>
        </div>
      </div>
    </div>
  );
}
