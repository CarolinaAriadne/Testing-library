import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';
import { Pokemon } from '../components';

const CAMINHOPIKACHU = '/pokemons/25';

describe('Teste o componente <Pokemon.js />', () => {
  test('O nome correto do Pokemon deve estar na tela', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
  test('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);

    const type = screen.getByText(/electric/i);
    expect(type).toBeInTheDocument();
  });
  test('O peso do pokemon deve estar na tela.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);

    const textPesoPokemon = screen.getByText(/Average weight: 6.0 kg/i);
    expect(textPesoPokemon).toBeInTheDocument();
  });
  test('Imagem na tela com src e alt.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img).toHaveAttribute('alt', 'Pikachu sprite');
  });
  test('Card contém link, com url específica.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);

    const link = screen.getByRole('link', { name: /more details/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', CAMINHOPIKACHU);
  });
  test('Card contém link, com url específica, se vai pra URL pik com clique', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);

    const link = screen.getByRole('link', { name: /more details/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', CAMINHOPIKACHU);

    userEvent.click(link);

    const { pathname } = history.location;
    expect(pathname).toBe(CAMINHOPIKACHU);
  });
  test('ícone deve ser estrela com src específico', () => {
    const { history } = renderWithRouter(<App />);

    const buttonMoreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(buttonMoreDetails);

    const { location: { pathname } } = history;
    expect(pathname).toBe(CAMINHOPIKACHU);

    const inputPokemonFavorite = screen.getByLabelText(/Pokémon favoritado/i);
    expect(inputPokemonFavorite).toBeInTheDocument();

    userEvent.click(inputPokemonFavorite);

    const imgStar = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(imgStar).toBeInTheDocument();
    expect(imgStar).toHaveAttribute('src', '/star-icon.svg');
    expect(imgStar).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});

// Requisito 6:

// Teste 1: Componente POkemon que recebe como prop array pokemons, passo a posição zero pois quero trabalhar com o exemplo do pikachu. Captura do pikachu, espero que esteja na tela.

// teste 2: Tendo pikachu como exemplo, capturo o tipo pelo texto, espero que este tipo é que esteja na tela.

// teste 3: Capturo o texto do peso do pikachu e verifico se está na tela.

// teste 4: Capturo a img do pikachu, espero que ela tenha um src e alt específico.

// teste 5: Capturo o link more detais, espero que esteja na tela e que tenha um href (url) específico.

// teste 6:  Capturo o link more detais, espero que esteja na tela e que tenha um href (url) específico. Se este link é clicado pelo usuário, espero que a URL na barra do navegador seja a específica do pikachu. Utilizo histori, para limpar a navegação para poder simular estar indo para a URL do pikachu após clique.

// teste 7: A partir do App pág principal. Capturo button mais detalhes, simulo clique do usuário, vamos para a URL do pikachu, espero que nesta pág tenha um input pra favoritar o pokemon se o usuário quiser, simulo o clique no input que favorita o pokemon, capturo a imagem da estrela, vejo se ela está na tela e se possui src, alt especificado, se está na tela, é que o pokemon foi de fato favoritado.
