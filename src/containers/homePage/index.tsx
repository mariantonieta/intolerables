import { Naviagation } from "..";
import imagen3d from "../../../public/svg/image3d.svg";
import "./index.css";
export default function HomePage() {
  return (
    <>
    <Naviagation />
<div className="home-content">
    
      <h1 className="center-text">ENCUENTRA</h1>
      <h2 className="left-text">EL RESTAURANT O LA RECETA</h2>
      <h2 className="right-text">PARA QUITARTE EL ANTOJO</h2>

      <div className="img-container">
        <img src={imagen3d} width={700} height={700}></img>
        <button className="btn">Empieza ahora</button>
      </div>
    </div>
    </>
  );
}
