import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; 

import "./index.css";

export default function HomePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    // Efecto al recargar la página
    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("visible");
      }, 300 * (index + 1));
    });
  }, []);

  return (
    <div className="home-page">
      <div className="container">
        <h1 className="center-text fade-in">{t('find')}</h1> 
        <h2 className="left-text fade-in">{t('restaurant_or_recipe')}</h2> 
        <h2 className="right-text fade-in">{t('satisfy_craving')}</h2> 

        <div className="img-container fade-in">
          <img
            src="/svg/image3d.svg"
            width={700}
            height={700}
            className="img-flotante"
            alt={t('healthy_stomach')}
          ></img>
          <button
            className="btn pulse"
            onClick={() => navigate("/intolerancias")}
          >
            {t('start_now')} 
          </button>
        </div>
      </div>
    </div>
  );
}
