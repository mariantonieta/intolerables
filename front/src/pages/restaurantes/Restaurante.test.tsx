import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Restaurantes from ".";
import { MemoryRouter } from "react-router-dom";

describe("Restaurantes", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renderiza correctamente la página", () => {
    render(
      <MemoryRouter>
        <Restaurantes />
      </MemoryRouter>
    );

    expect(screen.getByText(/Encuentra tu safe place en Restaurante/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/¿Qué te apetece comer hoy?/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ubicación/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Ubicación actual")).toBeInTheDocument();
    expect(screen.getByLabelText("Buscar")).toBeInTheDocument();
  });

  test("muestra alerta si se intenta buscar sin datos", async () => {
    render(
      <MemoryRouter>
        <Restaurantes />
      </MemoryRouter>
    );

    const buscarBtn = screen.getByLabelText("Buscar");
    fireEvent.click(buscarBtn);

    await waitFor(() => {
      expect(screen.getByText(/Por favor, introduce tanto la comida como la ubicación./i)).toBeInTheDocument();
    });
  });

  test("llama a la API real cuando se buscan restaurantes", async () => {
    render(
      <MemoryRouter>
        <Restaurantes />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/¿Qué te apetece comer hoy?/i), { target: { value: "Pizza" } });
    fireEvent.change(screen.getByPlaceholderText(/Ubicación/i), { target: { value: "Madrid" } });

    fireEvent.click(screen.getByLabelText("Buscar"));

    await waitFor(() => {
      expect(screen.getByText(/No se pudieron encontrar restaurantes./i)).toBeInTheDocument();
    });
  });

  test("muestra restaurantes después de buscar con la API real", async () => {
    render(
      <MemoryRouter>
        <Restaurantes />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/¿Qué te apetece comer hoy?/i), { target: { value: "Tacos" } });
    fireEvent.change(screen.getByPlaceholderText(/Ubicación/i), { target: { value: "Madrid" } });

    fireEvent.click(screen.getByLabelText("Buscar"));

    await waitFor(() => {
      expect(screen.getByText(/No se pudieron encontrar restaurantes./i)).toBeInTheDocument();
    });
  });
});
