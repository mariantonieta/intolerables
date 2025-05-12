import { useState, ChangeEvent, FormEvent } from "react";
import "../login/index.css";
import { useNavigate } from "react-router";
import api from "../../services/axiosConfig";
import { useTranslation } from "react-i18next";

// Tipado en TS para enviar los datos al backend
interface UsuarioForm {
  nombre: string;
  contrasena: string;
  contrasenaConfirm: string;
  paisUsuario: string;
  ciudad: string;
}

// Tipado para campo por campo
type ErrorKeys = keyof UsuarioForm;

export default function Registro() {
  const [form, setForm] = useState<UsuarioForm>({
    nombre: "",
    contrasena: "",
    contrasenaConfirm: "",
    paisUsuario: "",
    ciudad: "",
  });
  const navigate = useNavigate();

  const [mensaje, setMensaje] = useState<string>("");
  const [errors, setErrors] = useState<Record<ErrorKeys, string>>({
    nombre: "",
    contrasena: "",
    contrasenaConfirm: "",
    paisUsuario: "",
    ciudad: "",
  });

  // Actualiza el valor del campo en el form
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Manejo del formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Record<ErrorKeys, string> = {
      nombre: "",
      contrasena: "",
      contrasenaConfirm: "",
      paisUsuario: "",
      ciudad: "",
    };

    if (form.nombre.trim().length <= 2) {
      newErrors.nombre = t("errorName")
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-.]).*$/;
    if (!passwordRegex.test(form.contrasena)) {
      newErrors.contrasena = t("errorPassword")
    
    }

    if (form.contrasena !== form.contrasenaConfirm) {
      newErrors.contrasenaConfirm = t("errorPasswordConfirm")
    }

    if (form.paisUsuario.trim().length <= 2) {
      newErrors.paisUsuario = t("errorCountry")
    }

    if (form.ciudad.trim().length <= 2) {
      newErrors.ciudad = t("errorCity")
    }

    // Si hay errores, se muestran
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) {
      setErrors(newErrors);
      setMensaje(t("errorMessages"));
      return;
    }

    // Se hace el registro al backend
    try {
      await api.post("/api/auth/register-api", form);
      setMensaje("¡Usuario registrado con éxito!");
      navigate("/login");
      setErrors({
        nombre: "",
        contrasena: "",
        contrasenaConfirm: "",
        paisUsuario: "",
        ciudad: "",
      });
    } catch (err) {
      console.error("Error al registrar:", err);
      setMensaje(t("errorRegister"));
    }
  };

  // Mostrar error por cada campo
  const renderError = (campo: ErrorKeys) =>
    errors[campo] ? <div className="error">{errors[campo]}</div> : null;
const {t} = useTranslation()
  return (
    <>
      <div className="page">
        <div className="container">
          <div className="container-login">
            <div className="login-card">
              <h2>{t("registerTitle")}</h2>
              <form onSubmit={handleSubmit}>
                <label>{t("nameLabel")}</label>
                <input
                  type="text"
                  name="nombre"
                  placeholder={t("namePlaceholder")}
                  value={form.nombre}
                  onChange={handleChange}
                  className={errors.nombre ? "input-error" : ""}
                />
                {renderError("nombre")}

                <label>{t("passwordLabel")}</label>
                <input
                  type="password"
                  name="contrasena"
                  placeholder={t("passwordPlaceholder")}
                  value={form.contrasena}
                  onChange={handleChange}
                  className={errors.contrasena ? "input-error" : ""}
                />
                {renderError("contrasena")}

                <label>{t("passwordConfirm")}</label>
                <input
                  type="password"
                  name="contrasenaConfirm"
                  placeholder={t("passwordConfirm")}
                  value={form.contrasenaConfirm}
                  onChange={handleChange}
                  className={errors.contrasenaConfirm ? "input-error" : ""}
                />
                {renderError("contrasenaConfirm")}

                <label>{t("countryLabel")}</label>
                <input
                  type="text"
                  name="paisUsuario"
                  placeholder={t("countryPlaceholder")}
                  value={form.paisUsuario}
                  onChange={handleChange}
                  className={errors.paisUsuario ? "input-error" : ""}
                />
                {renderError("paisUsuario")}

                <label>{t("cityLabel")}</label>
                <input
                  type="text"
                  name="ciudad"
                  placeholder={t("cityPlaceholder")}
                  value={form.ciudad}
                  onChange={handleChange}
                  className={errors.ciudad ? "input-error" : ""}
                />
                {renderError("ciudad")}

                <button type="submit">{t("register")}</button>
              </form>

              {mensaje && (
                <div
                  className={mensaje.includes("éxito") ? "success" : "error"}
                >
                  {mensaje}
                </div>
              )}

              <div className="bottom-links">
                <span>{t("anyAccount")}</span>
                <a href="/login">{t("login")}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
