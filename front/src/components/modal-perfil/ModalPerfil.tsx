import React, { useEffect, useState } from "react";
import api from "../../services/axiosConfig";
import "./index.css";
import { useTranslation } from "react-i18next";

interface ModalPerfilProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const ModalPerfil: React.FC<ModalPerfilProps> = ({ open, onClose, onLogout }) => {
  const [pais, setPais] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [intoleranciasDisponibles, setIntoleranciasDisponibles] = useState<{ id: number; nombre: string }[]>([]);
  const [intoleranciaSeleccionada, setIntoleranciaSeleccionada] = useState<number | "">("");
const {t} = useTranslation()
  // Cargar intolerancias disponibles
  const fetchIntolerancias = async () => {
    try {
      const response = await api.get("/api/intolerancias");
      setIntoleranciasDisponibles(response.data); 
    } catch (error) {
      console.error("Error al obtener intolerancias", error);
    }
  };

  
  const fetchPerfilUsuario = async () => {
    const token = localStorage.getItem("jwtToken");
    const usuarioId = localStorage.getItem("usuarioId");
    if (!token || !usuarioId) return;

    try {
      const response = await api.get(`/api/auth/usuario/${usuarioId}/perfil`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const perfil = response.data;
      setPais(perfil.paisUsuario || "");
      setCiudad(perfil.ciudadUsuario || "");
      if (perfil.intolerancias?.length > 0) {
        setIntoleranciaSeleccionada(perfil.intolerancias[0].id); 
      }
    } catch (error) {
      console.error("Error al obtener perfil del usuario", error);
    }
  };


  const handleGuardar = async () => {
    const token = localStorage.getItem("jwtToken");
    const usuarioId = localStorage.getItem("usuarioId");
    if (!token || !usuarioId) return;

    const intoleranciasIdsPayload =
      intoleranciaSeleccionada !== "" ? [intoleranciaSeleccionada] : [];

    try {
      await api.put(
        `/api/auth/usuario/${usuarioId}/perfil`,
        {
          paisUsuario: pais,
          ciudadUsuario: ciudad,
          intoleranciasIds: intoleranciasIdsPayload,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      onClose();
    } catch (error) {
      console.error("Error al guardar perfil", error);
    }
  };

 
  useEffect(() => {
    if (open) {
      fetchIntolerancias();
      fetchPerfilUsuario();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-perfil">
<h2>{t("profile_title")}</h2>


        <label>
          {t("country")}
          <input value={pais} onChange={(e) => setPais(e.target.value)} />
        </label>

        <label>
          {t("city")}
          <input value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
        </label>

        <div>
          <strong>{t("selected_intolerance")}</strong>
          <select
            value={intoleranciaSeleccionada}
            onChange={(e) => setIntoleranciaSeleccionada(Number(e.target.value))}
          >
            <option value="">{t("select_intolerance")}</option>
            {intoleranciasDisponibles.map((i) => (
              <option key={i.id} value={i.id}>
                {i.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-buttons">
          <button onClick={handleGuardar}>{t("save")}</button>
          <button onClick={onLogout}>{t("logout")}</button>
          <button onClick={onClose}>{t("close")}</button>
        </div>
      </div>
    </div>
  );
};

export default ModalPerfil;
