import { useState } from "react";
import axios from "axios";
import "./index.css";
import api from "../../services/axiosConfig";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

interface IngredienteForm {
  nombre: string;
  cantidad: string;
}

export default function CrearReceta() {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [readyInMinutes, setReadyInMinutes] = useState<number>(0);
  const [ingredients, setIngredients] = useState<IngredienteForm[]>([
    { nombre: "", cantidad: "" },
  ]);
  const [pasos, setPasos] = useState<string[]>([""]);
  const [calorias, setCalorias] = useState<number>(0);
  const [tipoReceta, setTipoReceta] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();
  const { t } = useTranslation();

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
    const newErrors: { [key: string]: string } = {};

    if (!title.trim())
      newErrors.title = t("titleRequired") || "El título es obligatorio.";

    if (!imageFile)
      newErrors.imageFile = t("imageRequired") || "La imagen es obligatoria.";

    if (readyInMinutes <= 0)
      newErrors.readyInMinutes =
        t("prepTimeRequired") || "El tiempo de preparación debe ser mayor que 0.";

    if (calorias <= 0)
      newErrors.calorias =
        t("caloriesRequired") || "Las calorías deben ser mayor que 0.";

    if (!tipoReceta.trim())
      newErrors.tipoReceta =
        t("recipeTypeRequired") || "El tipo de receta es obligatorio.";

    if (
      ingredients.length === 0 ||
      ingredients.some((ing) => !ing.nombre.trim() || !ing.cantidad.trim())
    )
      newErrors.ingredients =
        t("ingredientsRequired") ||
        "Debe ingresar al menos un ingrediente con nombre y cantidad.";

    if (pasos.length === 0 || pasos.some((paso) => !paso.trim()))
      newErrors.pasos =
        t("stepsRequired") || "Debe ingresar al menos un paso de preparación.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); 


    let imageUrl = "";
    try {
      imageUrl = await handleImageUpload();
    } catch (err) {
      setErrors({ imageFile: `Error al subir la imagen: ${err}` });
      return;
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
      await api.post("/api/recetas", nuevaReceta, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      setTitle("");
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
      setErrors({ submit: `Error al crear la receta: ${error}` });
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="formulario-receta">
          <div className="card-receta">
            <h2>{t("createRecipe")}</h2>

            <div className="form-group">
              <label htmlFor="titulo">{t("titleRecipe")}</label>
              <input
                type="text"
                id="titulo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && <small className="error-text">{errors.title}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="imageFile">{t("uploadImage")}</label>
              <input
                type="file"
                id="imageFile"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
              {errors.imageFile && (
                <small className="error-text">{errors.imageFile}</small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="prepTime">{t("prepTime")}</label>
              <input
                type="number"
                id="prepTime"
                value={readyInMinutes}
                onChange={(e) => setReadyInMinutes(parseInt(e.target.value))}
              />
              {errors.readyInMinutes && (
                <small className="error-text">{errors.readyInMinutes}</small>
              )}
            </div>

            <div className="form-group">
              <label>{t("calories_recipe")}</label>
              <input
                type="number"
                value={calorias}
                onChange={(e) => setCalorias(parseInt(e.target.value))}
              />
              {errors.calorias && (
                <small className="error-text">{errors.calorias}</small>
              )}
            </div>

            <div className="form-group">
              <label>{t("recipeType")}</label>
              <input
                type="text"
                value={tipoReceta}
                onChange={(e) => setTipoReceta(e.target.value)}
              />
              {errors.tipoReceta && (
                <small className="error-text">{errors.tipoReceta}</small>
              )}
            </div>

            <h4>{t("ingredients")}</h4>
            {ingredients.map((ing, idx) => (
              <div key={idx} className="form-group">
                <input
                  type="text"
                  placeholder={t("ingredientName")}
                  value={ing.nombre}
                  onChange={(e) => {
                    const copia = [...ingredients];
                    copia[idx].nombre = e.target.value;
                    setIngredients(copia);
                  }}
                />
                <input
                  type="text"
                  placeholder={t("ingredientAmount")}
                  value={ing.cantidad}
                  onChange={(e) => {
                    const copia = [...ingredients];
                    copia[idx].cantidad = e.target.value;
                    setIngredients(copia);
                  }}
                />
              </div>
            ))}
            {errors.ingredients && (
              <small className="error-text">{errors.ingredients}</small>
            )}

            <button
              className="add-btn"
              onClick={() =>
                setIngredients([...ingredients, { nombre: "", cantidad: "" }])
              }
            >
              {t("addIngredient")}
            </button>

            <h4>{t("steps")}</h4>
            {pasos.map((paso, index) => (
              <input
                key={index}
                value={paso}
                placeholder={`${t("stepPlaceholder")} ${index + 1}`}
                onChange={(e) => {
                  const copia = [...pasos];
                  copia[index] = e.target.value;
                  setPasos(copia);
                }}
              />
            ))}
            {errors.pasos && <small className="error-text">{errors.pasos}</small>}

            <button className="add-btn" onClick={() => setPasos([...pasos, ""])}>
              {t("addStep")}
            </button>

            {errors.submit && <small className="error-text">{errors.submit}</small>}

            <button className="crear-btn" onClick={addReceta}>
              {t("submitRecipe")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
