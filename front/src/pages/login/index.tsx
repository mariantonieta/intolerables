import  React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import "./index.css"
interface LoginRequest{
    nombre: string;
    contrasena: string 
}

const LoginForm: React.FC = () => {
    const [nombre, setNombre] = useState<string>('');
    const [contrasena, setContrasena] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData : LoginRequest = { nombre, contrasena };

    try {
      const response = await axios.post('http://localhost:9000/usuario/login-api', loginData, {
        withCredentials:true});

      // Si la respuesta es exitosa, mostramos un mensaje de éxito
      setSuccessMessage(response.data.mensaje);
      setError(''); // Limpiamos cualquier error anterior
navigate('/')
      // Aquí podrías redirigir a una página protegida o guardar el estado de autenticación
      // Ejemplo: Redirigir a la página de inicio:
      // window.location.href = "/home";
    } catch (error) {
      // En caso de error (como credenciales incorrectas), mostramos el mensaje de error
      if (axios.isAxiosError(error) && error.response?.data) {
        setError(error.response.data.error);
      } else {
        setError('Error al conectar con el servidor');
      }
      setSuccessMessage(''); // Limpiamos cualquier mensaje de éxito
    }
  };

  return (
    <div className='login-container'> 
      <div className="login-card">
      <h2>Hola</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            placeholder='Nombre'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            placeholder='Password'
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>

      {/* Mostrar mensaje de éxito o error */}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div className="bottom-links">
          <a href="#">Forgot password?</a>
          <span> | </span>
          <a href="/register">Sign up</a>
        </div>
        </div>
    </div>
  );
};

export default LoginForm;
