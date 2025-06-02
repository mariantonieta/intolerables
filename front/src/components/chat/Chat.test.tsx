import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import ChatQA from "./index";
import api from "../../services/axiosConfig";

i18next.use(initReactI18next).init({
  lng: "es",
  resources: {
    es: {
      translation: {
        chat_title: "Chat con IA",
        placeholder: "Escribe aquí...",
        send: "Enviar",
        no_answer: "No se pudo obtener respuesta.",
      },
    },
  },
});

describe("ChatQA Component", () => {
  it("debe renderizar la imagen de apertura y no mostrar el chat al inicio", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ChatQA />
      </I18nextProvider>
    );

    expect(screen.getByAltText("Abrir chat")).toBeInTheDocument();
    expect(screen.queryByText("Chat con IA")).not.toBeInTheDocument();
  });

  it("debe abrir el chat al hacer clic en la imagen", () => {
    render(
      <I18nextProvider i18n={i18next}>
        <ChatQA />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByAltText("Abrir chat"));
expect(screen.getByText((content) => content.includes("Chat con IA"))).toBeInTheDocument();

  });

  it("debe permitir enviar un mensaje y simular respuesta de API", async () => {

    const apiPostMock = vi.spyOn(api, "post").mockResolvedValueOnce({
      data: { response: "Hola, soy un chatbot!" },
    });

    render(
      <I18nextProvider i18n={i18next}>
        <ChatQA />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByAltText("Abrir chat"));

    fireEvent.change(screen.getByPlaceholderText("Escribe aquí..."), { target: { value: "Hola" } });
    fireEvent.click(screen.getByText("Enviar"));

    await waitFor(() => {
      expect(screen.getByText("🧑‍💬: Hola")).toBeInTheDocument();
      expect(screen.getByText("🤖: Hola, soy un chatbot!")).toBeInTheDocument();
    });

    expect(apiPostMock).toHaveBeenCalledWith("/api/chat", { message: "Hola" });
  });
});
