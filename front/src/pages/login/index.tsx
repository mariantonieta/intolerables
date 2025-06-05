import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./index.css";
import api from "../../services/axiosConfig";
import { useTranslation } from "react-i18next";
//datos tipados con TS que se enviara al backend
interface LoginRequest {
  nombre: string;
  contrasena: string;
}

const LoginForm: React.FC = () => {
  //uso el hook useState para el estado del formulario
  const [nombre, setNombre] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate();
  const {t} = useTranslation()
  //manejo del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData: LoginRequest = { nombre, contrasena };

    try {
      const response = await api.post(
        "/api/auth/login",

        loginData
      );

      const token = response.data.token;
      const usuarioId = response.data.usuario.id;
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("usuarioId", usuarioId.toString());
      //  console.log(token)
      //si el login es exitoso, se muestra el mensaje y se redirije
      setSuccessMessage(response.data.mensaje);
      setError("");
      navigate("/");
    } catch (error) {
      //manejo de error si falla el login con la API
      if (axios.isAxiosError(error) && error.response?.data) {
        setError(error.response.data.error);
      } else {
        setError(t("errorConnection"));
      }
      setSuccessMessage("");
    }
  };
  //limpia el mensaje para no tener que recargar de nuevo la pagina
  //y limpia los errores
  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        setError("");
        setSuccessMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, successMessage]);

  return (
    <>
      <div className="page">
        <div className="container">
          <div className="container-login">
            <div className="login-card">
              <h2>{t("welcome")}</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="nombre">{t("nameLabel")}</label>
                  <input
                    type="text"
                    placeholder= {t("namePlaceholder")}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    id="nombre"
                  />
                </div>
                <div>
                  <label htmlFor="contrasena">{t("passwordLabel")}</label>
                  <input
                    type="password"
                    placeholder={t("passwordPlaceholder")}
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                    id="contrasena"
                  />
                </div>
                <button type="submit">{t("submit")}</button>
              </form>

              {successMessage && (
                <div className="success">{successMessage}</div>
              )}
              {error && <div className="error">{error}</div>}
              <div className="bottom-links">
             
                <a href="/register">{t("signUp")}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
