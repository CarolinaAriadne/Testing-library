import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  test('Testa se o topo da aplicação possui um conjunto fixo de links de naveg', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    const linkAbout = screen.getByRole('link', { name: 'About' });
    const linkFavoritePokémons = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokémons).toBeInTheDocument();
  });
  test('Se aplic vai p pág inicial na URL / ao clic no link Home  barra de naveg', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /Home/i });
    expect(linkHome).toBeInTheDocument();

    userEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('Se a aplic vai p/ a pág de About, na URL /about, no link barra de naveg', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /About/i });
    expect(linkAbout).toBeInTheDocument();

    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('Clicar no link fav pokemons faz aplicação ir p/ pág  Pok Favorit', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavoritePokémons = screen.getByRole('link', { name: /Favorite Pokémons/i });

    userEvent.click(linkFavoritePokémons);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  test('Se aplic vai p/ pág Not Found ao entrar URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pagina/nao-encontrada/');

    const h2 = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });

    expect(h2).toBeInTheDocument();
  });
});

// Requisito 1 -
// teste 1:  A partir do App (página principal) - captura dos elementos, verificação após se existem no documento.

// teste 2: Utilizamos o history, para termos um histórico de navegação limpo para a simulação. Capturamos o link home, verificamos se está na tela, simulados o click do usuário e após, utilizamos as props do Router, espero que após o clique, a URL tenha a rota '/' que se refere a página inicial.

// teste 3 e 4, mesma ideia do 2

// teste 5: Utilizamos o history.push, para mandar para  history uma URL inexistente, para testarmos se ocorrendo isso, vamos para uma tela onde terá um h2 com a frase indicada (/Page requested not found).
