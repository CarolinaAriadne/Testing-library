import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
// import Pokedex from '../components/Pokedex';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const h2 = screen.getByRole('heading', { level: 2, name: /Encountered pokémons/i });
    expect(h2).toBeInTheDocument();
    expect(h2).toHaveTextContent('Encountered pokémons');
  });
  test('Se é exibido o próximo pokemon da lista com o click', () => {
    renderWithRouter(<App />);
    const buttonProxPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(buttonProxPokemon).toBeInTheDocument();
    expect(buttonProxPokemon).toHaveTextContent('Próximo pokémon');

    pokemons.forEach((pokemon) => {
      const pokemonElement = screen.getByAltText(`${pokemon.name} sprite`);
      expect(pokemonElement).toBeInTheDocument();
      userEvent.click(buttonProxPokemon);
    });
  });
});
