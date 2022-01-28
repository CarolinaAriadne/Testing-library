import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste o componente <Favorite.js.js />', () => {
  test('Testa se msg é exibida na tela se a pessoa não tem pokemons favoritos', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    const NoFavoritePokemonFound = screen.getByText(/No favorite pokemon found/i);
    expect(NoFavoritePokemonFound).toBeInTheDocument();
  });
  test('Testa  se é exibido todos os cards de pokemons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkMoreDetails).toBeInTheDocument();

    userEvent.click(linkMoreDetails);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');

    const inputPokemonFavorite = screen.getByRole('checkbox');
    expect(inputPokemonFavorite).toBeInTheDocument();

    userEvent.click(inputPokemonFavorite);

    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkFavorite).toBeInTheDocument();

    userEvent.click(linkFavorite);

    const { location: { pathname: pathname2 } } = history;
    expect(pathname2).toBe('/favorites');

    const mostraPokemonFavoritado = screen.getByText(/pikachu/i);
    expect(mostraPokemonFavoritado).toBeInTheDocument();
  });
});
