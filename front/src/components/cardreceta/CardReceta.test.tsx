import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import RecetaCard from "./index";

i18next.use(initReactI18next).init({
  lng: "es",
  resources: {
    es: {
      translation: {
        time_recipe: "Tiempo",
        calories_recipe: "Calorías",
        see_recipe: "Ver Receta",
      },
    },
  },
});

describe("RecetaCard Component", () => {
  const mockOnToggleFavorito = vi.fn();

  it("debe renderizar correctamente los elementos", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <RecetaCard
          id={1}
          nombre="Paella Valenciana"
          imagen="/paella.jpg"
          tiempo={45}
          calorias={500}
          rating={4.5}
          ingredientes={[{ cantidad: "200g", nombre: "Arroz" }]}
          preparacion={[{ numeroPaso: 1, descripcion: "Calentar el agua" }]}
          isFavorito={false}
          onToggleFavorito={mockOnToggleFavorito}
        />
      </I18nextProvider>
    );

    expect(screen.getByRole("heading", { name: /Paella Valenciana/i })).toBeInTheDocument();
    expect(screen.getByAltText(/Foto de Paella Valenciana/i)).toBeInTheDocument();
    expect(screen.getByText(/Tiempo/i)).toBeInTheDocument();
    expect(screen.getByText(/45min/i)).toBeInTheDocument();
    expect(screen.getByText(/Calorías/i)).toBeInTheDocument();
    expect(screen.getByText(/500 kcal/i)).toBeInTheDocument();
    expect(screen.getByText(i18next.t("see_recipe"))).toBeInTheDocument();
  });

  it("debe abrir el modal al hacer clic en 'Ver Receta'", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <RecetaCard
          id={1}
          nombre="Paella Valenciana"
          imagen="/paella.jpg"
          tiempo={45}
          calorias={500}
          rating={4.5}
          ingredientes={[{ cantidad: "200g", nombre: "Arroz" }]}
          preparacion={[{ numeroPaso: 1, descripcion: "Calentar el agua" }]}
          isFavorito={false}
          onToggleFavorito={mockOnToggleFavorito}
        />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByText(i18next.t("see_recipe")));

   
    expect(screen.getAllByText(/Paella Valenciana/i)).toHaveLength(2); 
  });

  it("debe activar la función de favorito al hacer clic", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <RecetaCard
          id={1}
          nombre="Paella Valenciana"
          imagen="/paella.jpg"
          tiempo={45}
          calorias={500}
          rating={4.5}
          ingredientes={[{ cantidad: "200g", nombre: "Arroz" }]}
          preparacion={[{ numeroPaso: 1, descripcion: "Calentar el agua" }]}
          isFavorito={false}
          onToggleFavorito={mockOnToggleFavorito}
        />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByTestId("favorito-btn"));

    expect(mockOnToggleFavorito).toHaveBeenCalledTimes(1);
  });
});
