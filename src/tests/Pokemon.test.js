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
  test('Card contém link, com url específica.', () => {
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
