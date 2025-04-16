import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "../login/index.css"

interface UsuarioForm {
  nombre: string;
  contrasena: string;
    contrasenaConfirm: string;
  paisUsuario: string;
  ciudad: string;
}

export default function Registro() {
  const [form, setForm] = useState<UsuarioForm>({
    nombre: "",
    contrasena: "",
    contrasenaConfirm: "",
    paisUsuario: "",
    ciudad: "",
  });

  const [mensaje, setMensaje] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:9000/usuario/register-api", form);
      setMensaje("¡Usuario registrado con éxito!");
      console.log(res.data);
    } catch (err) {
      console.error("Error al registrar:", err);
      setMensaje("Hubo un error al registrar el usuario.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre de usuario"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          value={form.contrasena}
          onChange={handleChange}
          required
        />
        <input
  type="password"
  name="contrasenaConfirm"
  placeholder="Confirmar contraseña"
  value={form.contrasenaConfirm}
  onChange={handleChange}
  required
/>
        <input
          type="text"
          name="paisUsuario"
          placeholder="País"
          value={form.paisUsuario}
          onChange={handleChange}
        />
        <input
          type="text"
          name="ciudad"
          placeholder="Ciudad"
          value={form.ciudad}
          onChange={handleChange}
        />
        <button type="submit">Registrarse</button>
      </form>
      {mensaje && (
      <div className={mensaje.includes("éxito") ? "success" : "error"}>
            {mensaje}
          </div>
        )}
  
    <div className="bottom-links">
          <span>Already have an account? </span>
          <a href="/login">Log in</a>
        </div>
        </div>  </div>

  );
}
