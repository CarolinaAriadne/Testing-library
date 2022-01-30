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

// Requisito 7:

// beforeEach(() => {
//     renderWithRouter(<App />); >> antes de cada teste, renderiza App, testes a partir do App.

// teste 1: Capturo link more detais, simula clique do usuário, espero que apareça na tela o nome do pokemon + details.

// teste 2: Capturo link details, simula clique, espero que este link não esteja mais na tela.

// teste 3:  capturo link details, simula clique do usuário, espero que após isso haja na tela um texto sumary - h2

// teste 4:  capturo link details, simula clique do usuário, espero que esteja na tela o resumo do pokemon - p

// teste 5:  capturo link details, simula clique do usuário, espero que esteja na tela texto com localização do pokemon - h2

// teste 6: capturo link details, simula clique do usuário, são duas localizações do pikachu, capturo pelo texto, espero que ambas estejam na tela

// teste 7: capturo link details, simula clique do usuário, capturo as imagens dos mapas do pikachu, como são duas, espero que o tamanho do array retornado seja 2. Espero que imagem nas posições 0 e 1 (já que são dois mapas do pikachu), tenha o alt e src especificados.

// teste 8: capturo link details, simula clique do usuário, capturo o elemento que favorita pokemon, espero que esteja na tela, simulo evento de clique do usuário no checkbox que favorita, pra ver se favoritou, capturo a estrelinha e vejo se está no do documento, novamente clico do usuário no checkbox, verifico se a estrela não está mais na tela. Assim os cliques seguidos, favoritam e desfavoritam o pokemon.
