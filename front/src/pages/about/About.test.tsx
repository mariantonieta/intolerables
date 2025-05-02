import { render, screen } from "@testing-library/react";
import About from "./index"
import {  it, expect } from "vitest";
import { vi } from "vitest";
beforeAll(() => {
    class MockIntersectionObserver implements IntersectionObserver {
      root: Element | null = null;
      rootMargin: string = '';
      thresholds: ReadonlyArray<number> = [];
  
      constructor(
             ) {}
  
      observe(): void {}
      unobserve(): void {}
      disconnect(): void {}
      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }
    }
  
    global.IntersectionObserver = MockIntersectionObserver;
  });
  
  
vi.mock("../../containers", () => ({
  Naviagation: () => <div>Mock Naviagation</div>,
}));
vi.mock("../../components/card-info", () => ({
  default: ({ title, content }: { title: string; content: string }) => (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  ),
}));
it("renders all the cards", () => {
    render(<About />);
    
    expect(screen.getAllByText(/HOLA/i)).toHaveLength(2); // Asegurarte de que haya solo uno
    expect(screen.getByText(/MI HISTORIA/i)).toBeInTheDocument();
    expect(screen.getByText(/PROPÓSITO/i)).toBeInTheDocument();
    expect(screen.getByText(/MOTIVACIÓN/i)).toBeInTheDocument();
    expect(screen.getByText(/¿PARA QUE SIRVE ESTA PÁGINA?/i)).toBeInTheDocument();

});
