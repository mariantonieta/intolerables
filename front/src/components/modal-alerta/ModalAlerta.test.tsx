import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ModalAlerta from "./index";

describe("ModalAlerta Component", () => {
  const mockOnClose = vi.fn();

  it("no debe renderizar el modal cuando 'open' es false", () => {
    render(<ModalAlerta open={false} onClose={mockOnClose} mensaje="Hubo un error" />);

    expect(screen.queryByText("¡Error!")).not.toBeInTheDocument();
    expect(screen.queryByText("Hubo un error")).not.toBeInTheDocument();
    expect(screen.queryByText("OK")).not.toBeInTheDocument();
  });

  it("debe renderizar correctamente el modal cuando está abierto", () => {
    render(<ModalAlerta open={true} onClose={mockOnClose} mensaje="Hubo un error" />);

    expect(screen.getByText("¡Error!")).toBeInTheDocument();
    expect(screen.getByText("Hubo un error")).toBeInTheDocument();
    expect(screen.getByText("OK")).toBeInTheDocument();
  });

  it("debe cerrar el modal al hacer clic en el botón 'OK'", () => {
    render(<ModalAlerta open={true} onClose={mockOnClose} mensaje="Hubo un error" />);

    fireEvent.click(screen.getByText("OK"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
