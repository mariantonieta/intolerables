import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./index.css";
import CardInfo from "../../components/card-info";

export default function About() {
  // Llamamos a useTranslation dentro del componente
  const { t } = useTranslation();

  const cards = [
    {
      title: t("about_section.cards.hola.title"),
      content: t("about_section.cards.hola.content"),
    },
    {
      title: t("about_section.cards.historia.title"),
      content: t("about_section.cards.historia.content"),
    },
    {
      title: t("about_section.cards.proposito.title"),
      content: t("about_section.cards.proposito.content"),
    },
    {
      title: t("about_section.cards.motivacion.title"),
      content: t("about_section.cards.motivacion.content"),
    },
    {
      title: t("about_section.cards.utilidad.title"),
      content: t("about_section.cards.utilidad.content"),
    },
  ];

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
            <h1 className="fade-in">{t("about_section.heading")}</h1>
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
