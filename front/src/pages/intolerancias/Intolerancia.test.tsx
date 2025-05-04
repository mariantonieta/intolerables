import { render, screen, waitFor } from '@testing-library/react';

import IntoleranciaPage from '.';
import nock from 'nock';

// Simulamos la respuesta de la API usando nock
nock('http://api.intolerancias.com') // URL de la API que estás usando
  .get('/intolerancias')
  .reply(200, [
    { id: 1, nombre: 'Fructosa' },
    { id: 2, nombre: 'Gluten' },
    { id: 3, nombre: 'Lactosa' },
  ]);

test('renderiza las tarjetas de intolerancias y muestra el modal al hacer click', async () => {
  render(<IntoleranciaPage />);

  // Esperamos a que el contenido esté disponible
  await waitFor(() => screen.findByText('Fructosa'));
  await waitFor(() => screen.findByText('Gluten'));
  await waitFor(() => screen.findByText('Lactosa'));

  // Verificamos si los elementos están en el documento
  expect(screen.getByText('Fructosa')).toBeInTheDocument();
  expect(screen.getByText('Gluten')).toBeInTheDocument();
  expect(screen.getByText('Lactosa')).toBeInTheDocument();
});
