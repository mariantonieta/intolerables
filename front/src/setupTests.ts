import '@testing-library/jest-dom'; // Añade aserciones como toBeInTheDocument
import { vi } from "vitest";

beforeAll(() => {
    class MockIntersectionObserver implements IntersectionObserver {
      root: Element | null = null;
      rootMargin: string = '';
      thresholds: ReadonlyArray<number> = [];
  
      constructor(
        public callback: IntersectionObserverCallback,
        public options?: IntersectionObserverInit
      ) {}
  
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
      takeRecords = vi.fn(() => []);
    }
    global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
});
