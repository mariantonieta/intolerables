import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import ModalReceta from "./index";

i18next.use(initReactI18next).init({
  lng: "es",
  resources: {
    es: {
      translation: {
        ingredients: "Ingredientes",
        preparation: "Preparación",
        ok: "OK",
      },
    },
  },
});

describe("ModalReceta Component", () => {
  const mockOnClose = vi.fn();
  const receta = {
    title: "Tarta de Manzana",
    image: "/tarta.jpg",
    tiempo: 45,
    calorias: 350,
    ingredientes: ["Manzana", "Harina", "Azúcar"],
    preparacion: ["Mezclar los ingredientes", "Hornear por 45 min"],
  };

  it("no debe renderizar el modal cuando 'open' es false", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ModalReceta open={false} onClose={mockOnClose} {...receta} />
      </I18nextProvider>
    );

    expect(screen.queryByText("Tarta de Manzana")).not.toBeInTheDocument();
  });

  it("debe renderizar correctamente el modal cuando está abierto", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ModalReceta open={true} onClose={mockOnClose} {...receta} />
      </I18nextProvider>
    );

    expect(screen.getByText("Tarta de Manzana")).toBeInTheDocument();
    expect(screen.getByAltText("Tarta de Manzana")).toBeInTheDocument();
    expect(screen.getByText("45 Min")).toBeInTheDocument();
    expect(screen.getByText("350 Kcal")).toBeInTheDocument();
    expect(screen.getByText("Ingredientes")).toBeInTheDocument();
    expect(screen.getByText("Preparación")).toBeInTheDocument();
    expect(screen.getByText("Manzana")).toBeInTheDocument();
    expect(screen.getByText("Hornear por 45 min")).toBeInTheDocument();
    expect(screen.getByText("OK")).toBeInTheDocument();
  });

  it("debe cerrar el modal al hacer clic en el botón 'OK'", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ModalReceta open={true} onClose={mockOnClose} {...receta} />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByText("OK"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
