import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";

//import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Restaurantes, Recetas} from './pages'
//Rutas 


createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurantes" element={<Restaurantes />} />
        <Route path="/recetas" element={<Recetas />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
