import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RecetasComunidad from ".";
import { MemoryRouter } from "react-router-dom";
import { vi, describe, it, beforeEach, expect } from "vitest";
import api from "../../services/axiosConfig";


vi.mock("../../services/axiosConfig", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn()
  }
}));

describe("RecetasComunidad", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renderiza correctamente el título y campo de búsqueda", () => {
    render(
      <MemoryRouter>
        <RecetasComunidad />
      </MemoryRouter>
    );

    expect(screen.getByText(/Recetas de la Comunidad/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Buscar receta/i)).toBeInTheDocument();
  });

  it("muestra 'Cargando recetas...' y luego 'No se encontraron recetas.' si la API devuelve vacío", async () => {
    const mockGet = api.get as ReturnType<typeof vi.fn>;
    mockGet.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter>
        <RecetasComunidad />
      </MemoryRouter>
    );

    expect(screen.getByText(/Cargando recetas/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/No se encontraron recetas/i)).toBeInTheDocument();
    });
  });

  it("muestra recetas correctamente cuando la API devuelve resultados", async () => {
    const mockGet = api.get as ReturnType<typeof vi.fn>;
    mockGet.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          title: "Tarta de manzana",
          image: "imagen.jpg",
          readyInMiuntes: 45,
          summary: "Una deliciosa tarta",
          recetaIngredientes: [{ cantidad: 1, nombre: "Manzana" }],
          pasosPreparacion: [{ descripcion: "Pelar la manzana" }]
        }
      ]
    });

    render(
      <MemoryRouter>
        <RecetasComunidad />
      </MemoryRouter>
    );

    await waitFor(() => {
        expect(screen.getByText(/Tarta de manzana/i)).toBeInTheDocument();
        expect(screen.getByAltText(/foto de tarta de manzana/i)).toBeInTheDocument();
        
    });
  });

  it("filtra recetas correctamente según la búsqueda", async () => {
    const mockGet = api.get as ReturnType<typeof vi.fn>;
    mockGet.mockResolvedValueOnce({
      data: [
        { id: 1, title: "Pizza Vegana", image: "", readyInMiuntes: 20, summary: "", recetaIngredientes: [], pasosPreparacion: [] },
        { id: 2, title: "Ensalada", image: "", readyInMiuntes: 10, summary: "", recetaIngredientes: [], pasosPreparacion: [] }
      ]
    });

    render(
      <MemoryRouter>
        <RecetasComunidad />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Pizza Vegana")).toBeInTheDocument();
      expect(screen.getByText("Ensalada")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/Buscar receta/i), {
      target: { value: "pizza" },
    });

    await waitFor(() => {
      expect(screen.queryByText("Ensalada")).not.toBeInTheDocument();
      expect(screen.getByText("Pizza Vegana")).toBeInTheDocument();
    });
  });
});
