import { render, screen, waitFor } from "@testing-library/react";
import Navigation from ".";
import { MemoryRouter } from "react-router-dom";

describe("Navigation", () => {
  beforeEach(() => {
    localStorage.clear(); 
  });

  test("renderiza enlaces públicos correctamente", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /intolerancias/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /sobre mi/i })).toBeInTheDocument();
    expect(document.querySelector('button[aria-label="Abrir login"]')).toBeTruthy();

  });

  test("muestra botones adicionales cuando el usuario está logueado", async () => {
    localStorage.setItem("jwtToken", "mock-token");

    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole("link", { name: /añadir receta/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /recetas vip/i })).toBeInTheDocument();
      expect(document.querySelector('button[aria-label="Cerrar sesión"]')).toBeTruthy();
      expect(document.querySelector('button[aria-label="Favoritos"]')).toBeTruthy();

    });
  });
});
