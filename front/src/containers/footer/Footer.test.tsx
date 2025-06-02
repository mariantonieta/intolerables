import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import Footer from "./index";
import { MemoryRouter } from "react-router-dom";

i18next.use(initReactI18next).init({
  lng: "es",
  resources: {
    es: {
      translation: {
        rights_reserved: "Todos los derechos reservados.",
        home: "Inicio",
        intolerances: "Intolerancias",
        about: "Sobre nosotros",
        privacy_policy_pdf: "Política de privacidad (PDF)",
      },
    },
  },
});

describe("Footer Component", () => {
  it("debe mostrar el año actual y los derechos reservados", () => {
    const currentYear = new Date().getFullYear();
    
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18next}>
          <Footer />
        </I18nextProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(`© ${currentYear} Intolerables. Todos los derechos reservados.`)).toBeInTheDocument();
  });

  it("debe mostrar correctamente los enlaces", () => {
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18next}>
          <Footer />
        </I18nextProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("Inicio")).toHaveAttribute("href", "/");
    expect(screen.getByText("Intolerancias")).toHaveAttribute("href", "/intolerancias");
    expect(screen.getByText("Sobre nosotros")).toHaveAttribute("href", "/about");
    expect(screen.getByText("Política de privacidad (PDF)")).toHaveAttribute("href", "/pdf/politicadeprivacidadintolerables.pdf");
  });
});
