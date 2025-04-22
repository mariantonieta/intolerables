import "./index.css";
interface IntoleranciaCardProps {
  nombre: string;
  imagen: string;
  descripcion: string;
  buttonSaberMas: () => void;
  buttonSoy: () => void;
}

export default function IntoleranciaCard({
  nombre,
  imagen,
  descripcion,
  buttonSaberMas,
  buttonSoy,
}: IntoleranciaCardProps) {
  return (
    <div className="card-intole">
      <div className="card-container">
        <div className="card-texto">
          <h2 className="card-titulo">{nombre}</h2>
          <p className="card-descripcion">{descripcion}</p>
        </div>
        <img className="card-img" src={imagen} alt={nombre} />
      </div>
      <div className="btns">
        <button className="btn-soy" onClick={buttonSaberMas}>
          SABER MÁS
        </button>
        <button className="btn-mas" onClick={buttonSoy}>
          SOY
        </button>
      </div>
    </div>
  );
}
