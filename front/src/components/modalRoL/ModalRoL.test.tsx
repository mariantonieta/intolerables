import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import ModalRoL from "./index";

i18next.use(initReactI18next).init({
  lng: "es",
  resources: {
    es: {
      translation: {
        loginOrRegister: "¿Quieres registrarte o iniciar sesión?",
        login: "Iniciar sesión",
        register: "Registrarse",
        close: "Cerrar",
      },
    },
  },
});

describe("ModalRoL Component", () => {
  const mockOnClose = vi.fn();
  const mockOnLoginClick = vi.fn();
  const mockOnRegisterClick = vi.fn();

  const props = {
    open: true,
    onClose: mockOnClose,
    onLoginClick: mockOnLoginClick,
    onRegisterClick: mockOnRegisterClick,
  };

  it("no debe renderizar el modal cuando 'open' es false", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ModalRoL {...props} open={false} />
      </I18nextProvider>
    );

    expect(screen.queryByText("¿Quieres registrarte o iniciar sesión?")).not.toBeInTheDocument();
  });

  it("debe renderizar correctamente el modal cuando está abierto", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ModalRoL {...props} />
      </I18nextProvider>
    );

    expect(screen.getByText("¿Quieres registrarte o iniciar sesión?")).toBeInTheDocument();
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
    expect(screen.getByText("Registrarse")).toBeInTheDocument();
    expect(screen.getByText("Cerrar")).toBeInTheDocument();
  });

  it("debe ejecutar 'onLoginClick' al hacer clic en el botón 'Iniciar sesión'", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ModalRoL {...props} />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByText("Iniciar sesión"));
    expect(mockOnLoginClick).toHaveBeenCalledTimes(1);
  });

  it("debe ejecutar 'onRegisterClick' al hacer clic en el botón 'Registrarse'", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ModalRoL {...props} />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByText("Registrarse"));
    expect(mockOnRegisterClick).toHaveBeenCalledTimes(1);
  });

  it("debe ejecutar 'onClose' al hacer clic en el botón 'Cerrar'", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ModalRoL {...props} />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByText("Cerrar"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
