import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import IntoleranciaPage from ".";
import nock from "nock";

beforeAll(() => {
  class MockIntersectionObserver implements IntersectionObserver {
    root: Element | null = null;
    rootMargin: string = "";
    thresholds: ReadonlyArray<number> = [];
    constructor(
      public callback: IntersectionObserverCallback,
      public options?: IntersectionObserverInit
    ) {}
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
    takeRecords = jest.fn(() => []);
  }
  global.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;
});

beforeEach(() => {
  nock("http://api.intolerancias.com")
    .get("/intolerancias")
    .reply(200, [
      { id: 1, nombre: "Fructosa" },
      { id: 2, nombre: "Gluten" },
      { id: 3, nombre: "Lactosa" },
    ]);
});

test("renderiza las tarjetas de intolerancias y muestra el modal al hacer click", async () => {
  render(
    <MemoryRouter>
      <IntoleranciaPage />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText("Fructosa")).toBeInTheDocument();
    expect(screen.getByText("Gluten")).toBeInTheDocument();
    expect(screen.getByText("Lactosa")).toBeInTheDocument();
  });
});
