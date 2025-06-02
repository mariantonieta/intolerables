import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HomePage from "./index";
import { MemoryRouter  } from "react-router-dom";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

i18next.use(initReactI18next).init({
  lng: "es",
  resources: {
    es: {
      translation: {
        find: "Encuentra lo que necesitas",
        restaurant_or_recipe: "¿Restaurante o receta?",
        satisfy_craving: "Satisface tu antojo",
        healthy_stomach: "Estómago saludable",
        start_now: "Comienza ahora",
      },
    },
  },
});

describe("HomePage Component", () => {
  it("debe renderizar correctamente los textos traducidos", () => {
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18next}>
          <HomePage />
        </I18nextProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("Encuentra lo que necesitas")).toBeInTheDocument();
    expect(screen.getByText("¿Restaurante o receta?")).toBeInTheDocument();
    expect(screen.getByText("Satisface tu antojo")).toBeInTheDocument();
  });

  it("debe renderizar correctamente la imagen", () => {
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18next}>
          <HomePage />
        </I18nextProvider>
      </MemoryRouter>
    );

    expect(screen.getByAltText("Estómago saludable")).toBeInTheDocument();
  });

  it("debe redirigir a '/intolerancias' al hacer clic en 'Comienza ahora'", () => {
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18next}>
          <HomePage />
        </I18nextProvider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Comienza ahora"));
    expect(mockNavigate).toHaveBeenCalledWith("/intolerancias");
  });
});
