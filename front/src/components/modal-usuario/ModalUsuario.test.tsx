import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { ModalEleccionIntolerancia } from "./index"

i18next.use(initReactI18next).init({
  lng: "es",
  resources: {
    es: {
      translation: {
        greeting: "Hola, {{nombreUsuario}} 👋",
        question: "¿Quieres seguir buscando con tu intolerancia \"{{intolerancia}}\"?",
        continue: "Sí, seguir",
        change: "Cambiar intolerancia",
        cancel: "Cancelar",
      },
    },
  },
});

describe("ModalEleccionIntolerancia Component", () => {
  const mockOnClose = vi.fn();
  const mockOnCambiar = vi.fn();
  const mockOnSeguir = vi.fn();

  const props = {
    open: true,
    nombreUsuario: "Antonio",
    intolerancia: "Gluten",
    onClose: mockOnClose,
    onCambiar: mockOnCambiar,
    onSeguir: mockOnSeguir,
  };

  it("no debe renderizar el modal cuando 'open' es false", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ModalEleccionIntolerancia {...props} open={false} />
      </I18nextProvider>
    );

    expect(screen.queryByText("Hola, Antonio 👋")).not.toBeInTheDocument();
  });

  it("debe renderizar correctamente el modal cuando está abierto", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ModalEleccionIntolerancia {...props} />
      </I18nextProvider>
    );

    expect(screen.getByText("Hola, Antonio 👋")).toBeInTheDocument();
    expect(screen.getByText('¿Quieres seguir buscando con tu intolerancia "Gluten"?')).toBeInTheDocument();
    expect(screen.getByText("Sí, seguir")).toBeInTheDocument();
    expect(screen.getByText("Cambiar intolerancia")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });

  it("debe ejecutar 'onSeguir' al hacer clic en el botón 'Sí, seguir'", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ModalEleccionIntolerancia {...props} />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByText("Sí, seguir"));
    expect(mockOnSeguir).toHaveBeenCalledTimes(1);
  });

  it("debe ejecutar 'onCambiar' al hacer clic en el botón 'Cambiar intolerancia'", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ModalEleccionIntolerancia {...props} />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByText("Cambiar intolerancia"));
    expect(mockOnCambiar).toHaveBeenCalledTimes(1);
  });

  it("debe ejecutar 'onClose' al hacer clic en el botón 'Cancelar'", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ModalEleccionIntolerancia {...props} />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByText("Cancelar"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
