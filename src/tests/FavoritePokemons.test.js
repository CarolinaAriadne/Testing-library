import React from 'react';
import { screen } from '@testing-library/react';
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

// Requisito 3:

//  Teste 1: Renderizamos o componente FavoritePokemons, que está ligado com a página de pokemons favoritados ou sem favoritos. O componente precisa de uma prop para funcionar, que são os pokemons favoritados, neste caso, a verificação é se não tem pokemons favoritos, se a msg aparece, logo, passamos como valor da prop então um valor vazio, nenhum pokemon favoritado. Capturamos o elemento, que é a frase, e verificamos se ela aparece na tela, no caso de não ter pokemon favorito.

// teste 2: Precisamos utilizar o history, para limpar o histórico de navegação, pois é necessário navegar em outras rotas.
// Na pág pricipal, capturamos o link de mais detalhes do pokemon e vemos se está na tela, simulamos o click do usuaŕio, verificamos se estamos no caminho da URL do pokemon específico o qual será mostrado os detalhes, verificamos se existe na tela um input para o usuário checar se quiser favoritar o pokemon, simulamos o click neste input, verificamos se existe na tela o link que vai pra página de pokemons favoritos, simulados o clique nele, mudamos pra rota URL onde estão os pokemons favoritados, e por fim, verificamos se na tela existe o pokemon que havia sido favoritado (pikachu)
