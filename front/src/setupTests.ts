import '@testing-library/jest-dom'; // Añade aserciones como toBeInTheDocument

beforeAll(() => {
    class MockIntersectionObserver implements IntersectionObserver {
      root: Element | null = null;
      rootMargin: string = '';
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
    global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

  });
  