import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import Modal from "./index";

i18next.use(initReactI18next).init({
  lng: "es",
  resources: {
    es: {
      translation: {
        not_alone: "No estás solo/a",
        close: "Cerrar",
      },
    },
  },
});

describe("Modal Component", () => {
  const mockOnClose = vi.fn();
  const mockOnSoyClick = vi.fn();

  it("debe renderizar correctamente el modal cuando está abierto", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <Modal
          open={true}
          onClose={mockOnClose}
          title="Intolerancia al Gluten"
          content="Información sobre la intolerancia al gluten."
          imagen="/gluten.jpg"
          motivacion="Muchas personas viven con esta condición."
          onSoyClick={mockOnSoyClick}
        />
      </I18nextProvider>
    );

    expect(screen.getByText("Intolerancia al Gluten")).toBeInTheDocument();
    expect(screen.getByText("Información sobre la intolerancia al gluten.")).toBeInTheDocument();
    expect(screen.getByText("No estás solo/a")).toBeInTheDocument();
    expect(screen.getByAltText("Intolerancia al Gluten")).toBeInTheDocument();
    expect(screen.getByText("Cerrar")).toBeInTheDocument();
    expect(screen.getByText("Soy")).toBeInTheDocument();
  });

  it("debe cerrar el modal al hacer clic en el botón 'Cerrar'", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <Modal
          open={true}
          onClose={mockOnClose}
          title="Intolerancia al Gluten"
          content="Información sobre la intolerancia al gluten."
          imagen="/gluten.jpg"
          motivacion="Muchas personas viven con esta condición."
          onSoyClick={mockOnSoyClick}
        />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByText("Cerrar"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("debe ejecutar 'onSoyClick' al hacer clic en el botón 'Soy'", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <Modal
          open={true}
          onClose={mockOnClose}
          title="Intolerancia al Gluten"
          content="Información sobre la intolerancia al gluten."
          imagen="/gluten.jpg"
          motivacion="Muchas personas viven con esta condición."
          onSoyClick={mockOnSoyClick}
        />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByText("Soy"));
    expect(mockOnSoyClick).toHaveBeenCalledTimes(1);
  });

  it("no debe renderizar el modal cuando 'open' es false", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <Modal
          open={false}
          onClose={mockOnClose}
          title="Intolerancia al Gluten"
          content="Información sobre la intolerancia al gluten."
          imagen="/gluten.jpg"
          motivacion="Muchas personas viven con esta condición."
          onSoyClick={mockOnSoyClick}
        />
      </I18nextProvider>
    );

    expect(screen.queryByText("Intolerancia al Gluten")).not.toBeInTheDocument();
  });
});
