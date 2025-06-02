import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import ModalFavoritos from "./index";

i18next.use(initReactI18next).init({
  lng: "es",
  resources: {
    es: {
      translation: {
        favorites: "Favoritos",
        recipe: "Recetas favoritas",
        restaurant: "Restaurantes favoritos",
        not_favorites: "No tienes recetas favoritas",
        not_restaurant: "No tienes restaurantes favoritos",
        ok: "OK",
      },
    },
  },
});

describe("ModalFavoritos Component", () => {
  const mockOnClose = vi.fn();
  const favoritosRecetas = [{ id: 1, nombreReceta: "Paella" }];
  const favoritosRestaurantes = [{ nombreRestaurante: "Restaurante Ejemplo" }];

  it("no debe renderizar el modal cuando 'open' es false", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ModalFavoritos open={false} onClose={mockOnClose} favoritosRecetas={[]} favoritosRestaurantes={[]} />
      </I18nextProvider>
    );

    expect(screen.queryByText("Favoritos")).not.toBeInTheDocument();
  });

  it("debe renderizar correctamente el modal cuando está abierto y tiene favoritos", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ModalFavoritos open={true} onClose={mockOnClose} favoritosRecetas={favoritosRecetas} favoritosRestaurantes={favoritosRestaurantes} />
      </I18nextProvider>
    );

    expect(screen.getByText("Favoritos")).toBeInTheDocument();
    expect(screen.getByText("Recetas favoritas")).toBeInTheDocument();
    expect(screen.getByText("Restaurantes favoritos")).toBeInTheDocument();
    expect(screen.getByText("Paella")).toBeInTheDocument();
    expect(screen.getByText("Restaurante Ejemplo")).toBeInTheDocument();
    expect(screen.getByText("OK")).toBeInTheDocument();
  });

  it("debe mostrar mensaje cuando no hay favoritos", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ModalFavoritos open={true} onClose={mockOnClose} favoritosRecetas={[]} favoritosRestaurantes={[]} />
      </I18nextProvider>
    );

    expect(screen.getByText("No tienes recetas favoritas")).toBeInTheDocument();
    expect(screen.getByText("No tienes restaurantes favoritos")).toBeInTheDocument();
  });

  it("debe cerrar el modal al hacer clic en el botón 'OK'", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ModalFavoritos open={true} onClose={mockOnClose} favoritosRecetas={favoritosRecetas} favoritosRestaurantes={favoritosRestaurantes} />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByText("OK"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
