import { NavLink } from "react-router";
import "./index.css";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
const {t} = useTranslation()
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Intolerables. {t("rights_reserved")}</p>
      <div className="footer-links">
            <NavLink to="/">{t("home")}</NavLink>
            <NavLink to="/intolerancias">{t("intolerances")}</NavLink>
            <NavLink to="/about">{t("about")}</NavLink>
            <a href="/pdf/politicadeprivacidadintolerables.pdf" target="_blank" rel="noopener noreferrer">
            {t("privacy_policy_pdf")}
</a>      </div>
    </footer>
  );
};

export default Footer;
