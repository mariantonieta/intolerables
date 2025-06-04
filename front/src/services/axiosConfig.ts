import axios from "axios";
//Utilizo axios para las peticiones al backend
//la instancia api para llamarla desde mis componentes
const isLocalhost = window.location.hostname === "localhost";
const api = axios.create({
  baseURL: isLocalhost
    ? "http://localhost:9000/"
    : "https://intolerables-backend-production.up.railway.app",
});

//añade el token a cada peticion y lee el token del almacenamiento local
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
