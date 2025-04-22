import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Home,
  Restaurantes,
  Recetas,
  Intolerancias,
  CrearReceta,
  RecetasComunidad,
  LoginForm,
  Registro,
} from "./pages";

//Rutas
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/intolerancias" element={<Intolerancias />} />
        <Route path="/restaurantes" element={<Restaurantes />} />
        <Route path="/recetas" element={<Recetas />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/addReceta" element={<CrearReceta />} />
        <Route path="/recetasVip" element={<RecetasComunidad />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
