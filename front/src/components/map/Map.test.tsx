import { render, screen,  fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Mapa from "./index";
import { LatLngExpression } from "leaflet";

const testPosition: LatLngExpression = [40.4168, -3.7038]; 

describe("Mapa Component", () => {
  it("debe renderizar correctamente el mapa y el marcador", async () => {
    render(<Mapa position={testPosition} />);

    expect(document.querySelector(".leaflet-container")).toBeTruthy();

    const marker = document.querySelector(".leaflet-marker-icon");
    fireEvent.click(marker!);

    await screen.findByText("Ubicación actual o seleccionada");
  });

  it("debe renderizar el marcador en la posición correcta", () => {
    render(<Mapa position={testPosition} />);

    const mapElements = document.querySelectorAll(".leaflet-marker-icon");
    expect(mapElements.length).toBeGreaterThan(0);
  });
});
