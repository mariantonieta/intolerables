import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Home } from './pages';  

test('renderizo la pagina home', async () => {
  render(
    <BrowserRouter>
      <Home />  
    </BrowserRouter>
  );

  expect(screen.getByText(/encuentra/i)).toBeInTheDocument(); 
  
  const aboutLink = screen.getByText(/sobre mi/i); 
  fireEvent.click(aboutLink);
  const intolerancias = screen.getByText(/intolerancias/i); 
  fireEvent.click(intolerancias);
  await waitFor(() => {
    expect(screen.getByText(/sobre mi/i)).toBeInTheDocument();  
    expect(screen.getByText(/intolerancias/i)).toBeInTheDocument();  
    
    
  });
});
