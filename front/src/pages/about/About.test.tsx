import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import About from "./index";
import { MemoryRouter } from "react-router-dom";

i18next.use(initReactI18next).init({
  lng: "es",
  resources: {
    es: {
      translation: {
        "about_section.heading": "Sobre Mí",
        "about_section.cards.hola.title": "HOLA",
        "about_section.cards.historia.title": "MI HISTORIA",
        "about_section.cards.proposito.title": "PROPÓSITO",
        "about_section.cards.motivacion.title": "MOTIVACIÓN",
        "about_section.cards.utilidad.title": "¿PARA QUÉ SIRVE ESTA PÁGINA?",
      },
    },
  },
});

describe("About Component", () => {
  it("debe mostrar el título principal correctamente", () => {
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18next}>
          <About />
        </I18nextProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("Sobre Mí")).toBeInTheDocument();
  });

  it("debe renderizar correctamente los títulos de las tarjetas", () => {
    const titles = [
      "HOLA",
      "MI HISTORIA",
      "PROPÓSITO",
      "MOTIVACIÓN",
      "¿PARA QUÉ SIRVE ESTA PÁGINA?",
    ];

    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18next}>
          <About />
        </I18nextProvider>
      </MemoryRouter>
    );

    titles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });
});
