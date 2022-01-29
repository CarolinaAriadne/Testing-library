import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('Conter texto  com nome do pokemon mais a palavra details', () => {
    const buttonMoreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(buttonMoreDetails);

    const h2 = screen.getByRole('heading', { name: /pikachu details/i });
    expect(h2).toBeInTheDocument();
  });
  test('Não deve existir o link de nav para os detalhes do Pokémon selecionado', () => {
    const buttonMoreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(buttonMoreDetails);

    expect(buttonMoreDetails).not.toBeInTheDocument();
  });
  test('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const buttonMoreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(buttonMoreDetails);

    const h2Sumary = screen.getByRole('heading', { name: /summary/i });
    expect(h2Sumary).toBeInTheDocument();
  });
  test('A seção detalhes deve conter um p com resumo do Pokem que está na tela ', () => {
    const buttonMoreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(buttonMoreDetails);

    const paragrafo = screen.getByText(/intelligent/i);
    expect(paragrafo).toBeInTheDocument();
  });
  test('A seção detalhes deve conter um h2 com Game Locations of <name> ', () => {
    const buttonMoreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(buttonMoreDetails);

    const h2Local = screen.getByRole('heading', { name: /game locations of pikachu/i });
    expect(h2Local).toBeInTheDocument();
  });
  test('Todas as localizações do Pokemon devem estar na seção de detalhes ', () => {
    const buttonMoreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(buttonMoreDetails);

    const location1 = screen.getByText(/kanto viridian forest/i);
    expect(location1).toBeInTheDocument();

    const location2 = screen.getByText(/kanto power plant/i);
    expect(location2).toBeInTheDocument();
  });
  test('Exibir img do mapa, img deve ter atributo src e atributo alt ', () => {
    const buttonMoreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(buttonMoreDetails);

    const imagens = screen.getAllByAltText(/Pikachu location/i);
    expect(imagens).toHaveLength(2);
    expect(imagens[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imagens[0]).toHaveAttribute('alt', 'Pikachu location');
    expect(imagens[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(imagens[1]).toHaveAttribute('alt', 'Pikachu location');
  });
  test('A página deve exibir um checkbox para favoritar Pokémon', () => {
    const buttonMoreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(buttonMoreDetails);

    const checkboxFavorite = screen.getByLabelText(/pokémon favoritado/i);
    expect(checkboxFavorite).toBeInTheDocument();

    userEvent.click(checkboxFavorite);

    const imgStar = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(imgStar).toBeInTheDocument();

    userEvent.click(checkboxFavorite);
    expect(imgStar).not.toBeInTheDocument();
  });
});
