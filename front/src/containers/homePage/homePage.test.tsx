import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import HomePage from './index';

describe('HomePage', () => {
  test('renderizar la pagina de inicio y probar q el boton funcione correcramente', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/intolerancias" element={<div>Intolerancia</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/encuentra/i)).toBeInTheDocument();
    expect(screen.getByText(/el restaurant o la receta/i)).toBeInTheDocument();
    expect(screen.getByText(/para quitarte el antojo/i)).toBeInTheDocument();
    
    const button = screen.getByRole('button', { name: /empieza ahora/i });
    expect(button).toBeInTheDocument();

    const elements = document.querySelectorAll('.fade-in');
    expect(elements.length).toBeGreaterThan(0);

    await waitFor(() => {
      elements.forEach((el) => {
        const element = el as HTMLElement;
        expect(element).toHaveClass('visible');
      });
    }, { timeout: 2000 }); 

    fireEvent.click(button);
    
    expect(screen.getByText(/intolerancia/i)).toBeInTheDocument();
  });
});
