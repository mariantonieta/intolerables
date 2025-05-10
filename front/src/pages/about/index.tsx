import { useEffect } from "react";
import "./index.css";
import CardInfo from "../../components/card-info";

const cards = [
  {
    title: "HOLA",
    content:
      "¡¡¡¡¡¡¡Holaaaaa, INTOLERABLE!!!!!!!!:) oy Mariantonieta, y quiero darte la bienvenida a mi mundo.",
  },
  {
    title: "MI HISTORIA",
    content:
      "Este proyecto nació de una vivencia muy personal: Ser celíaca y enfrentarme a diario a las limitaciones en la cocina...",
  },
  {
    title: "PROPÓSITO",
    content:
      "Aquí te ofrezco un espacio donde podrás encotrar restaurantes o recetas pensadas para diversas necesidades dietéticas...",
  },
  {
    title: "MOTIVACIÓN",
    content:
      "Quiero recordarte que aunque sea algo frustrante tenner una INTOLERANCIA ALIMENTARIA, eso te hace únic@.",
  },
  {
    title: "¿PARA QUE SIRVE ESTA PÁGINA?",
    content:
      "Aquí podrás encontrar tanto la receta o el restaurante que buscas, la busqueda es diferente porque te asegura que al llegar al sitio es un lugar alto para tu intolerancia.",
  },
];

export default function About() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div>
        <div className="page">
          <div className="container">
            <h1 className="fade-in">Sobre Mí</h1>
            <div className="card-grid">
              {cards.map((card, index) => (
                <CardInfo
                  key={index}
                  title={card.title}
                  content={card.content}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
