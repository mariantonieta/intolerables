import { useState, ChangeEvent, FormEvent } from "react";
import "../login/index.css";
import Navigation from "../../containers/navigation";
import { useNavigate } from "react-router";
import api from "../../services/axiosConfig";

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
      newErrors.nombre = "El nombre debe tener más de dos caracteres.";
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-.]).*$/;
    if (!passwordRegex.test(form.contrasena)) {
      newErrors.contrasena =
        "Debe tener una mayúscula, dos números y un carácter especial.";
    }

    if (form.contrasena !== form.contrasenaConfirm) {
      newErrors.contrasenaConfirm = "Las contraseñas no coinciden.";
    }

    if (form.paisUsuario.trim().length <= 2) {
      newErrors.paisUsuario = "El país debe tener más de dos caracteres.";
    }

    if (form.ciudad.trim().length <= 2) {
      newErrors.ciudad = "La ciudad debe tener más de dos caracteres.";
    }

    // Si hay errores, se muestran
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) {
      setErrors(newErrors);
      setMensaje("Por favor, corrige los errores antes de enviar.");
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
      setMensaje("Hubo un error al registrar el usuario.");
    }
  };

  // Mostrar error por cada campo
  const renderError = (campo: ErrorKeys) =>
    errors[campo] ? <div className="error">{errors[campo]}</div> : null;

  return (
    <>
      <Navigation />
      <div className="container">
        <div className="container-login">
          <div className="login-card">
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSubmit}>
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                placeholder="Introduce tu nombre"
                value={form.nombre}
                onChange={handleChange}
                className={errors.nombre ? "input-error" : ""}
              />
              {renderError("nombre")}

              <label>Contraseña:</label>
              <input
                type="password"
                name="contrasena"
                placeholder="Introduce una contraseña"
                value={form.contrasena}
                onChange={handleChange}
                className={errors.contrasena ? "input-error" : ""}
              />
              {renderError("contrasena")}

              <label>Confirmar Contraseña:</label>
              <input
                type="password"
                name="contrasenaConfirm"
                placeholder="Confirma tu contraseña"
                value={form.contrasenaConfirm}
                onChange={handleChange}
                className={errors.contrasenaConfirm ? "input-error" : ""}
              />
              {renderError("contrasenaConfirm")}

              <label>País:</label>
              <input
                type="text"
                name="paisUsuario"
                placeholder="¿De qué país eres?"
                value={form.paisUsuario}
                onChange={handleChange}
                className={errors.paisUsuario ? "input-error" : ""}
              />
              {renderError("paisUsuario")}

              <label>Ciudad:</label>
              <input
                type="text"
                name="ciudad"
                placeholder="¿Cuál es tu ciudad?"
                value={form.ciudad}
                onChange={handleChange}
                className={errors.ciudad ? "input-error" : ""}
              />
              {renderError("ciudad")}

              <button type="submit">Registrarse</button>
            </form>

            {mensaje && (
              <div className={mensaje.includes("éxito") ? "success" : "error"}>
                {mensaje}
              </div>
            )}

            <div className="bottom-links">
              <span>¿Ya tienes una cuenta? </span>
              <a href="/login">Log in</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
