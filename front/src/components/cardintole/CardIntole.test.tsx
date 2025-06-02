import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import IntoleranciaCard from "./IntolerancaCard";

i18next.use(initReactI18next).init({
  lng: "es",
  resources: {
    es: {
      translation: {
        more_info: "Más información",
        iam: "Soy intolerante",
      },
    },
  },
});

describe("IntoleranciaCard Component", () => {
  const mockButtonSaberMas = vi.fn();
  const mockButtonSoy = vi.fn();

  it("debe renderizar correctamente los elementos", async () => {
    render(
      <I18nextProvider i18n={i18next}>
        <IntoleranciaCard
          nombre="Intolerancia al Gluten"
          imagen="/gluten.jpg"
          descripcion="Evita productos con gluten"
          buttonSaberMas={mockButtonSaberMas}
          buttonSoy={mockButtonSoy}
        />
      </I18nextProvider>
    );

    expect(screen.getByRole("heading", { name: /Intolerancia al Gluten/i })).toBeInTheDocument();
    expect(screen.getByText(/Evita productos con gluten/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Intolerancia al Gluten/i)).toBeInTheDocument();
    expect(screen.getByText(i18next.t("more_info"))).toBeInTheDocument();
    expect(screen.getByText(i18next.t("iam"))).toBeInTheDocument();
  });

  it("debe activar las funciones al hacer clic en los botones", async () => {
    render(
      <I18nextProvider i18n={i18next}>
        <IntoleranciaCard
          nombre="Intolerancia al Gluten"
          imagen="/gluten.jpg"
          descripcion="Evita productos con gluten"
          buttonSaberMas={mockButtonSaberMas}
          buttonSoy={mockButtonSoy}
        />
      </I18nextProvider>
    );

   
    fireEvent.click(screen.getByText(i18next.t("more_info")));
    fireEvent.click(screen.getByText(i18next.t("iam")));

  
    expect(mockButtonSaberMas).toHaveBeenCalledTimes(1);
    expect(mockButtonSoy).toHaveBeenCalledTimes(1);
  });
});
