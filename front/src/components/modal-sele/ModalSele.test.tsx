import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import ModalBase from "./index";
import { ModalAction } from "./index";

i18next.use(initReactI18next).init({
  lng: "es",
  resources: {
    es: {
      translation: {
        close: "Cerrar",
      },
    },
  },
});

describe("ModalBase Component", () => {
  const mockOnClose = vi.fn();
  const mockAction1 = vi.fn();
  const mockAction2 = vi.fn();

const actions: ModalAction[] = [
  { label: "Acción 1", onClick: mockAction1, variant: "contained" },
  { label: "Acción 2", onClick: mockAction2, variant: "outlined" },
];

  it("no debe renderizar el modal cuando 'open' es false", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ModalBase open={false} onClose={mockOnClose} title="Título de Prueba" actions={actions}>
          <p>Contenido del modal</p>
        </ModalBase>
      </I18nextProvider>
    );

    expect(screen.queryByText("Título de Prueba")).not.toBeInTheDocument();
    expect(screen.queryByText("Cerrar")).not.toBeInTheDocument();
  });

  it("debe renderizar correctamente el modal cuando está abierto", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ModalBase open={true} onClose={mockOnClose} title="Título de Prueba" actions={actions}>
          <p>Contenido del modal</p>
        </ModalBase>
      </I18nextProvider>
    );

    expect(screen.getByText("Título de Prueba")).toBeInTheDocument();
    expect(screen.getByText("Contenido del modal")).toBeInTheDocument();
    expect(screen.getByText("Acción 1")).toBeInTheDocument();
    expect(screen.getByText("Acción 2")).toBeInTheDocument();
    expect(screen.getByText("Cerrar")).toBeInTheDocument();
  });

  it("debe ejecutar 'onClose' al hacer clic en el botón 'Cerrar'", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ModalBase open={true} onClose={mockOnClose} title="Título de Prueba" actions={actions}>
          <p>Contenido del modal</p>
        </ModalBase>
      </I18nextProvider>
    );

    fireEvent.click(screen.getByText("Cerrar"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("debe ejecutar correctamente las acciones al hacer clic en sus botones", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ModalBase open={true} onClose={mockOnClose} title="Título de Prueba" actions={actions}>
          <p>Contenido del modal</p>
        </ModalBase>
      </I18nextProvider>
    );

    fireEvent.click(screen.getByText("Acción 1"));
    expect(mockAction1).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText("Acción 2"));
    expect(mockAction2).toHaveBeenCalledTimes(1);
  });
});
