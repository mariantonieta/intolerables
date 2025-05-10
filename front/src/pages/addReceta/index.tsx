import { useState } from "react";
import axios from "axios";
import "./index.css";
import api from "../../services/axiosConfig";
import { useNavigate } from "react-router";
import ModalAlerta from "../../components/modal-alerta";
interface IngredienteForm {
  nombre: string;
  cantidad: string;
}

export default function CrearReceta() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [readyInMinutes, setReadyInMinutes] = useState<number>(0);
  const [ingredients, setIngredients] = useState<IngredienteForm[]>([
    { nombre: "", cantidad: "" },
  ]);
  const [pasos, setPasos] = useState<string[]>([""]);
  const [calorias, setCalorias] = useState<number>(0);
  const [tipoReceta, setTipoReceta] = useState("");
  const [modalError, setModalError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const navigate = useNavigate();

  const handleImageUpload = async () => {
    if (!imageFile) return;
    const formData = new FormData();
    formData.append("image", imageFile);
    const response = await axios.post(
      "https://api.imgbb.com/1/upload?key=8e4557ecb19620ef5d4de4f4f54120ee",
      formData
    );
    return response.data.data.url;
  };

  const addReceta = async () => {
    let imageUrl = image;
    if (imageFile) {
      try {
        imageUrl = await handleImageUpload();
      } catch (err) {
        setMensajeError(`Error al subir la imagen: ${err}`);
        setModalError(true);
        return;
      }
    }

    const nuevaReceta = {
      title,
      image: imageUrl,
      readyInMinutes,
      calories: calorias,
      summary: tipoReceta,
      recetaIngredientes: ingredients.map((ing, index) => ({
        id: index + 1,
        nombre: ing.nombre,
        cantidad: ing.cantidad,
      })),
      pasosPreparacion: pasos.map((descripcion) => ({
        descripcion,
      })),
    };

    try {
      const token = localStorage.getItem("jwtToken");
      const response = await api.post("/api/recetas", nuevaReceta, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);

      setTitle("");
      setImage("");
      setImageFile(null);
      setReadyInMinutes(0);
      setIngredients([{ nombre: "", cantidad: "" }]);
      setPasos([""]);
      setCalorias(0);
      setTipoReceta("");

      navigate("/recetasVip");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error de Axios:", error.response?.data || error.message);
      } else {
        console.error("Error desconocido:", error);
      }
      setMensajeError(`Error al crear la receta: ${error}`);
      setModalError(true);
    }
  };

  return (
    <div className="page">
    
      <div className="container">
        <div className="formulario-receta">
          <div className="card-receta">
            <h2>Crear nueva receta 🍽️</h2>

            <div className="form-group">
              <label htmlFor="titulo">Título de la receta</label>
              <input
                type="text"
                id="titulo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="imagen">URL de la imagen (opcional)</label>
              <input
                type="text"
                id="imagen"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="imageFile">Subir una imagen</label>
              <input
                type="file"
                id="imageFile"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
            </div>

            <div className="form-group">
              <label>Tiempo de preparación (min)</label>
              <input
                type="number"
                value={readyInMinutes}
                onChange={(e) => setReadyInMinutes(parseInt(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label>Calorías</label>
              <input
                type="number"
                value={calorias}
                onChange={(e) => setCalorias(parseInt(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label>Tipo de receta</label>
              <input
                type="text"
                value={tipoReceta}
                onChange={(e) => setTipoReceta(e.target.value)}
              />
            </div>

            <h4>Ingredientes</h4>
            {ingredients.map((ing, idx) => (
              <div key={idx} className="form-group">
                <input
                  type="text"
                  placeholder="Nombre del ingrediente"
                  value={ing.nombre}
                  onChange={(e) => {
                    const copia = [...ingredients];
                    copia[idx].nombre = e.target.value;
                    setIngredients(copia);
                  }}
                />
                <input
                  type="text"
                  placeholder="Cantidad (ej. 200g, 2 tazas)"
                  value={ing.cantidad}
                  onChange={(e) => {
                    const copia = [...ingredients];
                    copia[idx].cantidad = e.target.value;
                    setIngredients(copia);
                  }}
                />
              </div>
            ))}

            <button
              className="add-btn"
              onClick={() =>
                setIngredients([...ingredients, { nombre: "", cantidad: "" }])
              }
            >
              ➕ Agregar ingrediente
            </button>

            <h4>Pasos</h4>
            {pasos.map((paso, index) => (
              <input
                key={index}
                value={paso}
                placeholder={`Paso ${index + 1}`}
                onChange={(e) => {
                  const copia = [...pasos];
                  copia[index] = e.target.value;
                  setPasos(copia);
                }}
              />
            ))}

            <button
              className="add-btn"
              onClick={() => setPasos([...pasos, ""])}
            >
              ➕ Agregar paso
            </button>

            <button className="crear-btn" onClick={addReceta}>
              Crear receta
            </button>
          </div>
        </div>
      </div>
      <ModalAlerta
        open={modalError}
        onClose={() => setModalError(false)}
        mensaje={mensajeError}
      />
    </div>
  );
}
