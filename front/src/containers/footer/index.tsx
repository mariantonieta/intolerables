import { NavLink } from "react-router";
import "./index.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Intolerables. Todos los derechos reservados.</p>
      <div className="footer-links">
            <NavLink to="/">HOME</NavLink>
            <NavLink to="/intolerancias">INTOLERANCIAS</NavLink>
            <NavLink to="/about">SOBRE MI</NavLink>
            <a href="/pdf/politicadeprivacidadintolerables.pdf" target="_blank" rel="noopener noreferrer">
  Política de Privacidad PDF
</a>      </div>
    </footer>
  );
};

export default Footer;
