import { useState } from "react";
import axios from "axios";
import "./index.css";
import api from "../../services/axiosConfig";
import Navigation from "../../containers/navigation";
import { useNavigate } from "react-router";
import ModalAlerta from "../../components/modal-alerta";
interface IngredienteForm {
  id: number | null;
  nombre: string;
  cantidad: number;
  unidad: string;
}

interface NuevaReceta {
  titulo: string;
  imagen: string;
  duracionReceta: number;
  calorias: number;
  tipoReceta: string;
  ingredientes: {
    cantidad: number;
    unidad: string;
    ingrediente: {
      id: number | null;
      nombre: string;
    };
  }[];
  analyzedInstructions: {
    numeroPaso: number;
    descripcion: string;
  }[];
  intolerancias: string[];
  publica?: boolean; 
}

export default function CrearReceta() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [readyInMinutes, setReadyInMinutes] = useState<number>(0);
  const [ingredients, setIngredients] = useState<IngredienteForm[]>([
    { id: null, nombre: "", cantidad: 0, unidad: "" },
  ]);
  const [pasos, setPasos] = useState<string[]>([""]);
  const [calorias, setCalorias] = useState<number>(0);
  const [tipoReceta, setTipoReceta] = useState("");
  const [modalError, setModalError] = useState(false);
  const [mensajeError,setMensajeError] = useState("")

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
        setMensajeError(`Error al cargar subir la imagen ${err}`);
        setModalError(true)
      
        return;
      }
    }

    const nuevaReceta: NuevaReceta = {
      titulo: title,
      imagen: imageUrl,
      duracionReceta: readyInMinutes,
      calorias: calorias,
      tipoReceta: tipoReceta,
      ingredientes: ingredients.map((ing) => ({
        cantidad: ing.cantidad,
        unidad: ing.unidad,
        ingrediente: {
          id: ing.id,
          nombre: ing.nombre,
        },
      })),
      analyzedInstructions: pasos.map((paso, index) => ({
        numeroPaso: index + 1,
        descripcion: paso,
      })),
      intolerancias: [],
      publica: true, 
    };

    try {
      const token = localStorage.getItem("jwtToken");
      console.log("Token almacenado:", token);
      console.log("Receta que se va a crear:", nuevaReceta);

      const response = await api.post("/api/recetas/crear", nuevaReceta, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Respuesta del backend:", response.data);

     
      // Limpiar los campos
      setTitle("");
      setImage("");
      setImageFile(null);
      setReadyInMinutes(0);
      setIngredients([{ id: null, nombre: "", cantidad: 0, unidad: "" }]);
      setPasos([""]);
      setCalorias(0);
      setTipoReceta("");

      navigate("/recetasVip"); // Redirigir
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error de Axios:", error.response?.data || error.message);
      } else {
        console.error("Error desconocido:", error);
      }
      setMensajeError(`Error al crear la receta${error}`);
      setModalError(true)
    
    }
  };

  return (
    <div className="page">
      <Navigation />
      <div className="container">
        <div className="formulario-receta">
          <div className="card-receta">
            <h2>Crear nueva receta 🍽️</h2>

            <div className="form-group">
              <label htmlFor="titulo">Título de la receta</label>
              <input
                type="text"
                id="titulo"
                placeholder="Título de la receta"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="imagen">URL de la imagen (opcional)</label>
              <input
                type="text"
                id="imagen"
                placeholder="URL de la imagen (opcional)"
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
              <label htmlFor="readyInMinutes">Tiempo de preparación (min)</label>
              <input
                type="number"
                id="readyInMinutes"
                placeholder="Tiempo de preparación (min)"
                value={readyInMinutes}
                onChange={(e) =>
                  setReadyInMinutes(
                    e.target.value === "" ? 0 : parseInt(e.target.value)
                  )
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="calorias">Calorías</label>
              <input
                type="number"
                id="calorias"
                placeholder="Calorías"
                value={calorias}
                onChange={(e) =>
                  setCalorias(
                    e.target.value === "" ? 0 : parseInt(e.target.value)
                  )
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="tipoReceta">Tipo de receta</label>
              <input
                type="text"
                id="tipoReceta"
                placeholder="Tipo de receta"
                value={tipoReceta}
                onChange={(e) => setTipoReceta(e.target.value)}
              />
            </div>

            <h4>Ingredientes</h4>
            {ingredients.map((ing, idx) => (
              <div key={idx} className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={ing.nombre}
                  onChange={(e) => {
                    const copia = [...ingredients];
                    copia[idx].nombre = e.target.value;
                    setIngredients(copia);
                  }}
                />

                <label>Cantidad</label>
                <input
                  type="number"
                  placeholder="Cantidad"
                  value={ing.cantidad}
                  onChange={(e) => {
                    const copia = [...ingredients];
                    copia[idx].cantidad = parseFloat(e.target.value);
                    setIngredients(copia);
                  }}
                />

                <label>Unidad</label>
                <input
                  type="text"
                  placeholder="Unidad"
                  value={ing.unidad}
                  onChange={(e) => {
                    const copia = [...ingredients];
                    copia[idx].unidad = e.target.value;
                    setIngredients(copia);
                  }}
                />
              </div>
            ))}

            <button className="add-btn" onClick={() =>
              setIngredients([
                ...ingredients,
                { id: null, nombre: "", cantidad: 0, unidad: "" },
              ])
            }>
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

            <button className="add-btn" onClick={() => setPasos([...pasos, ""])}>➕ Agregar paso</button>

            <button className="crear-btn" onClick={addReceta}>Crear receta</button>
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
