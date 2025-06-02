import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import ModalElegirRoR from "./index";

// 🔧 Simular i18next para pruebas
i18next.use(initReactI18next).init({
  lng: "es",
  resources: {
    es: {
      translation: {
        what_would_see: "¿Qué te gustaría ver?",
        seeRecipes: "Ver recetas",
        seeRestaurants: "Ver restaurantes",
        close: "Cerrar",
      },
    },
  },
});

describe("ModalElegirRoR Component", () => {
  const mockOnClose = vi.fn();
  const mockOnRecetasClick = vi.fn();
  const mockOnRestaurantesClick = vi.fn();

  const props = {
    open: true,
    onClose: mockOnClose,
    onRecetasClick: mockOnRecetasClick,
    onRestaurantesClick: mockOnRestaurantesClick,
  };

  it("no debe renderizar el modal cuando 'open' es false", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ModalElegirRoR {...props} open={false} />
      </I18nextProvider>
    );

    expect(screen.queryByText("¿Qué te gustaría ver?")).not.toBeInTheDocument();
  });

  it("debe renderizar correctamente el modal cuando está abierto", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ModalElegirRoR {...props} />
      </I18nextProvider>
    );

    expect(screen.getByText("¿Qué te gustaría ver?")).toBeInTheDocument();
    expect(screen.getByText("Ver recetas")).toBeInTheDocument();
    expect(screen.getByText("Ver restaurantes")).toBeInTheDocument();
    expect(screen.getByText("Cerrar")).toBeInTheDocument();
  });

  it("debe ejecutar 'onRecetasClick' al hacer clic en el botón 'Ver recetas'", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ModalElegirRoR {...props} />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByText("Ver recetas"));
    expect(mockOnRecetasClick).toHaveBeenCalledTimes(1);
  });

  it("debe ejecutar 'onRestaurantesClick' al hacer clic en el botón 'Ver restaurantes'", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ModalElegirRoR {...props} />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByText("Ver restaurantes"));
    expect(mockOnRestaurantesClick).toHaveBeenCalledTimes(1);
  });

  it("debe ejecutar 'onClose' al hacer clic en el botón 'Cerrar'", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ModalElegirRoR {...props} />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByText("Cerrar"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
