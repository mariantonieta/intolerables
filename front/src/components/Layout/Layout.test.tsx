import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Layout from "./index";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";


i18next.use(initReactI18next).init({
  lng: "es",
  resources: {
    es: {
      translation: {
        chat_title: "Chat con IA",
      },
    },
  },
});

describe("Layout Component", () => {
  it("debe renderizar correctamente Navigation, Footer y ChatQA", () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18next}>
          <Layout />
        </I18nextProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument(); 
    expect(screen.getByAltText("Abrir chat")).toBeInTheDocument(); 
  });

  it("debe abrir el chat al hacer clic en la imagen", () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18next}>
          <Layout />
        </I18nextProvider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByAltText("Abrir chat"));

    expect(screen.getByText((content) => content.includes("Chat con IA"))).toBeInTheDocument();
  });
});
