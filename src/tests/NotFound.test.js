import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
// import NotFound from '../components/NotFound';
import App from '../App';

describe('Teste o componente <Not Found />', () => {
  test('Testa se a página contém um h2 com texto específico', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/qualquer coisa');

    const h2 = screen.getByRole('heading', { level: 2, name: /page/i });
    expect(h2).toBeInTheDocument();
    expect(h2).toHaveTextContent('Page requested not found');
  });
  test('Testa se a página possui uma imagem', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/qualquer coisa');

    const img = screen.getByAltText(/pikachu/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
