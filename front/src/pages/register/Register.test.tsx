
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Registro from ".";
import { MemoryRouter } from "react-router-dom";
import api from "../../services/axiosConfig";
import { vi} from "vitest";



vi.mock("../../services/axiosConfig", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("Registro", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );
  };

  test("renderiza correctamente el formulario", () => {
    renderComponent();

    expect(screen.getByText(/Registro de Usuario/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Introduce tu nombre/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Introduce una contraseña/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Confirma tu contraseña/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/¿De qué país eres\?/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/¿Cuál es tu ciudad\?/i)).toBeInTheDocument();
  });

  test("muestra errores si los campos están vacíos o son inválidos", async () => {
    renderComponent();

    fireEvent.click(screen.getByText("Registrarse"));

    await waitFor(() => {
      expect(screen.getByText(/corrige los errores/i)).toBeInTheDocument();
    });
  });

  test("envía correctamente si los datos son válidos", async () => {
    const mockPost = api.post as unknown as ReturnType<typeof vi.fn>;
    mockPost.mockResolvedValueOnce({ status: 200 });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/Introduce tu nombre/i), {
      target: { name: "nombre", value: "Juan" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Introduce una contraseña/i), {
      target: { name: "contrasena", value: "Ab12$$" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Confirma tu contraseña/i), {
      target: { name: "contrasenaConfirm", value: "Ab12$$" },
    });
    fireEvent.change(screen.getByPlaceholderText(/¿De qué país eres\?/i), {
      target: { name: "paisUsuario", value: "España" },
    });
    fireEvent.change(screen.getByPlaceholderText(/¿Cuál es tu ciudad\?/i), {
      target: { name: "ciudad", value: "Madrid" },
    });

    fireEvent.click(screen.getByText("Registrarse"));

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith("/api/auth/register-api", {
        nombre: "Juan",
        contrasena: "Ab12$$",
        contrasenaConfirm: "Ab12$$",
        paisUsuario: "España",
        ciudad: "Madrid",
      });
    });
  });
});
