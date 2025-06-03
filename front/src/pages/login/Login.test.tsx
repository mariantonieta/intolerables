import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LoginForm from "./index";

import { MemoryRouter } from "react-router-dom";

vi.mock("../../services/axiosConfig", () => ({
  post: vi.fn().mockResolvedValue({
    data: {
      token: "fakeToken123",
      usuario: { id: 1 },
      mensaje: "Login exitoso",
    },
  }),
}));


vi.mock("react-router", () => ({
  useNavigate: () => vi.fn(),
}));
i18next.use(initReactI18next).init({
  lng: "es",
  resources: {
    es: {
      translation: {
        welcome: "Bienvenido",
        nameLabel: "Nombre",
        namePlaceholder: "Introduce tu nombre",
        passwordLabel: "Contraseña",
        passwordPlaceholder: "Introduce tu contraseña",
        submit: "Iniciar sesión",
        forgotPassword: "¿Olvidaste tu contraseña?",
        signUp: "Registrarse",
        errorConnection: "Error de conexión",
      },
    },
  },
});

describe("LoginForm Component", () => {
  it("debe mostrar los elementos principales correctamente", () => {
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18next}>
          <LoginForm />
        </I18nextProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Bienvenido");
    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Iniciar sesión" })).toBeInTheDocument();
  });

  it("debe permitir escribir en los inputs", () => {
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18next}>
          <LoginForm />
        </I18nextProvider>
      </MemoryRouter>
    );

    const nameInput = screen.getByLabelText("Nombre");
    fireEvent.change(nameInput, { target: { value: "usuarioTest" } });
    expect(nameInput).toHaveValue("usuarioTest");

    const passwordInput = screen.getByLabelText("Contraseña");
    fireEvent.change(passwordInput, { target: { value: "passwordTest" } });
    expect(passwordInput).toHaveValue("passwordTest");
  });
});
