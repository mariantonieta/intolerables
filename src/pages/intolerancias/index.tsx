import IntoleranciaCard from "../../components/IntolerancaCard";
import Navigation from "../../containers/navigation";
import gluten from "../../../public/icons/gluten.svg";
import "./index.css";
export default function Intolerancias() {
  const handleSaberMas = () => {
    alert("Más información sobre esta intolerancia.");
  };

  const handleSoy = () => {
    alert("Eres intolerante a esta sustancia.");
  };

  return (
    <>
      <Navigation />

      <div className="container">
        <h1>Intolerancias</h1>
        <div className="card-container">
          <IntoleranciaCard
            nombre="Gluten"
            descripcion="No puedes consumir alimentos con gluten."
            imagen={gluten}
            buttonSaberMas={handleSaberMas}
            buttonSoy={handleSoy}
          />
          <IntoleranciaCard
            nombre="Gluten"
            descripcion="No puedes consumir alimentos con gluten."
            imagen={gluten}
            buttonSaberMas={handleSaberMas}
            buttonSoy={handleSoy}
          />
          <IntoleranciaCard
            nombre="Gluten"
            descripcion="No puedes consumir alimentos con gluten."
            imagen={gluten}
            buttonSaberMas={handleSaberMas}
            buttonSoy={handleSoy}
          />
          <IntoleranciaCard
            nombre="Gluten"
            descripcion="No puedes consumir alimentos con gluten."
            imagen={gluten}
            buttonSaberMas={handleSaberMas}
            buttonSoy={handleSoy}
          />
          <IntoleranciaCard
            nombre="Gluten"
            descripcion="No puedes consumir alimentos con gluten."
            imagen={gluten}
            buttonSaberMas={handleSaberMas}
            buttonSoy={handleSoy}
          />
          <IntoleranciaCard
            nombre="Gluten"
            descripcion="No puedes consumir alimentos con gluten."
            imagen={gluten}
            buttonSaberMas={handleSaberMas}
            buttonSoy={handleSoy}
          />{" "}
          <IntoleranciaCard
            nombre="Gluten"
            descripcion="No puedes consumir alimentos con gluten."
            imagen={gluten}
            buttonSaberMas={handleSaberMas}
            buttonSoy={handleSoy}
          />
          <IntoleranciaCard
            nombre="Gluten"
            descripcion="No puedes consumir alimentos con gluten."
            imagen={gluten}
            buttonSaberMas={handleSaberMas}
            buttonSoy={handleSoy}
          />
        </div>
      </div>
    </>
  );
}
