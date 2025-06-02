import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import RestauranteCard from "./index";


i18next.use(initReactI18next).init({
  lng: "es",
  resources: {
    es: {
      translation: {
        address_restaurant: "Dirección",
        food_type: "Tipo de comida",
        see_more: "Ver Más",
      },
    },
  },
});

describe("RestauranteCard Component", () => {
  const mockOnToggleFavorito = vi.fn();
  const mockWindowOpen = vi.fn();

  beforeAll(() => {
    global.window.open = mockWindowOpen;
  });

  it("debe renderizar correctamente los elementos", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <RestauranteCard
          id={1}
          nombre="Restaurante Tagliatela"
          direccion="Calle Madrid 23"
          tipo_comida="Italiana"
          url="https://ejemplo.com"
          isFavorito={false}
          onToggleFavorito={mockOnToggleFavorito}
        />
      </I18nextProvider>
    );

    expect(screen.getByText("Restaurante Tagliatela")).toBeInTheDocument();
    expect(
  screen.getByText((content) => content.includes("Calle Madrid 23"))
).toBeInTheDocument();
expect(
  screen.getByText((content) => content.includes("Italiana"))
).toBeInTheDocument();

expect(screen.getByText(i18next.t("see_more"))).toBeInTheDocument();
  });

  it("debe activar la función de favorito al hacer clic", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <RestauranteCard
          id={1}
          nombre="Restaurante Ejemplo"
          direccion="Calle Falsa 123"
          tipo_comida="Italiana"
          url="https://ejemplo.com"
          isFavorito={false}
          onToggleFavorito={mockOnToggleFavorito}
        />
      </I18nextProvider>
    );
fireEvent.click(screen.getByTestId("favorito-btn"));


    expect(mockOnToggleFavorito).toHaveBeenCalledTimes(1);
  });

  it("debe abrir la URL al hacer clic en 'Ver Más'", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <RestauranteCard
          id={1}
          nombre="Restaurante Ejemplo"
          direccion="Calle Falsa 123"
          tipo_comida="Italiana"
          url="https://ejemplo.com"
          isFavorito={false}
          onToggleFavorito={mockOnToggleFavorito}
        />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByText(i18next.t("see_more")));

    expect(mockWindowOpen).toHaveBeenCalledWith("https://ejemplo.com", "_blank");
  });
});
