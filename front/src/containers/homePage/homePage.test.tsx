import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import HomePage from '.';

describe('HomePage', () => {
  it('renderiza los textos principales', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText(/ENCUENTRA/i)).toBeInTheDocument();
    expect(screen.getByText(/EL RESTAURANT O LA RECETA/i)).toBeInTheDocument();
    expect(screen.getByText(/PARA QUITARTE EL ANTOJO/i)).toBeInTheDocument();
  });

  it('tiene un botón que navega a /intolerancias', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/intolerancias" element={<div>INTOLERANCIAS PAGE</div>} />
        </Routes>
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /empieza ahora/i });
    fireEvent.click(button);
    expect(screen.getByText(/INTOLERANCIAS PAGE/i)).toBeInTheDocument();
  });
});
