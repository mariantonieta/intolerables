import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CardInfo from "./index";
//card info about me 
describe("CardInfo Component", () => {
  it("debe renderizar el título correctamente", () => {
    render(<CardInfo title="Test Title" content="Test Content" />);
    
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument(); 
  });

  it("debe mostrar el contenido al hacer click", () => {
    render(<CardInfo title="Test Title" content="Test Content" />);
    
    const card = screen.getByText("Test Title").closest(".card");
    fireEvent.click(card!);
    
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("debe ocultar el contenido al hacer click nuevamente", () => {
    render(<CardInfo title="Test Title" content="Test Content" />);
    
    const card = screen.getByText("Test Title").closest(".card");
    fireEvent.click(card!);
    fireEvent.click(card!); 
    
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
  });
});
