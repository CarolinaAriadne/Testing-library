import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
// import Pokedex from '../components/Pokedex';
import App from '../App';
import pokemons from '../data';

const TAMANHOBUTTONS = 7;

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
  test('Se é mostrado apenas um pokemon por vez', () => {
    renderWithRouter(<App />);
    const img = screen.getAllByRole('img');
    expect(img).toHaveLength(1);
  });
  test('Ter um botão de filtragem p/ cada tipo de Pokémon, sem repetição', () => {
    renderWithRouter(<App />);

    const buttonsFiltro = screen.getAllByTestId(/pokemon-type-button/i);
    expect(buttonsFiltro).toHaveLength(TAMANHOBUTTONS);

    const buttonEletrics = screen.getAllByRole('button', { name: 'Electric' });
    expect(buttonEletrics).toHaveLength(1);
    expect(buttonEletrics[0]).toBeInTheDocument();

    const buttonFires = screen.getAllByRole('button', { name: 'Fire' });
    expect(buttonFires).toHaveLength(1);
    expect(buttonFires[0]).toBeInTheDocument();

    const buttonBugs = screen.getAllByRole('button', { name: 'Bug' });
    expect(buttonBugs).toHaveLength(1);
    expect(buttonBugs[0]).toBeInTheDocument();

    const buttonPoisons = screen.getAllByRole('button', { name: 'Poison' });
    expect(buttonPoisons).toHaveLength(1);
    expect(buttonPoisons[0]).toBeInTheDocument();

    const buttonPsychics = screen.getAllByRole('button', { name: 'Psychic' });
    expect(buttonPsychics).toHaveLength(1);
    expect(buttonPsychics[0]).toBeInTheDocument();

    const buttonNormals = screen.getAllByRole('button', { name: 'Normal' });
    expect(buttonNormals).toHaveLength(1);
    expect(buttonNormals[0]).toBeInTheDocument();

    const buttonDragons = screen.getAllByRole('button', { name: 'Dragon' });
    expect(buttonDragons).toHaveLength(1);
    expect(buttonDragons[0]).toBeInTheDocument();
  });

  test('Ao selecionar button, circular só pelos pokemons do tipo especificado', () => {
    renderWithRouter(<App />);

    const buttonFire = screen.getByRole('button', { name: 'Fire' });
    expect(buttonFire).toBeInTheDocument();

    userEvent.click(buttonFire);

    const imgCharmander = screen.getByText(/charmander/i);
    expect(imgCharmander).toBeInTheDocument();

    const buttonProxPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(buttonProxPokemon).toBeInTheDocument();

    userEvent.click(buttonProxPokemon);

    const imgRapidash = screen.getByText(/rapidash/i);
    expect(imgRapidash).toBeInTheDocument();
  });
  test('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
    renderWithRouter(<App />);

    const buttonEletrics = screen.getByRole('button', { name: 'Electric' });
    expect(buttonEletrics).toBeInTheDocument();

    const buttonFires = screen.getByRole('button', { name: 'Fire' });
    expect(buttonFires).toBeInTheDocument();

    const buttonBugs = screen.getByRole('button', { name: 'Bug' });
    expect(buttonBugs).toBeInTheDocument();

    const buttonPoisons = screen.getByRole('button', { name: 'Poison' });
    expect(buttonPoisons).toBeInTheDocument();

    const buttonPsychics = screen.getByRole('button', { name: 'Psychic' });
    expect(buttonPsychics).toBeInTheDocument();

    const buttonNormals = screen.getByRole('button', { name: 'Normal' });
    expect(buttonNormals).toBeInTheDocument();

    const buttonDragons = screen.getByRole('button', { name: 'Dragon' });
    expect(buttonDragons).toBeInTheDocument();
  });
  test('O botão All precisa estar sempre visível', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeVisible();
  });
  test('O texto deve ser All, com clik não tem filtro, carreg pág filtro all', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByText(/All/i);
    expect(buttonAll).toHaveTextContent('All');

    userEvent.click(buttonAll);

    const imgPikachu = screen.getByText(/pikachu/i);
    expect(imgPikachu).toBeInTheDocument();
  });
});

// Requisito 5:

// teste 1: capturamos o h2, vemos se está na tela e se tem o texto esperado

// teste 2: Capturamos o button, verificamos se está na tela e se tem o texto esperado. Importado o arquivo data, onde contém o array de pokemons.
// Passamos um forEach neste array, sendo que a cada iteração (em cada pokemon do array), capturamos o pokemon específico pelo nome e esperamos que ele esteja na tela, com o clique, simulamos o click do usuário no button próximo pokemon, e a cada iteração, o próximo pokemon após o clique, irá aparecer na tela.

// teste 3: Capturamos o pokemon pela img do mesmo, passamos um All pra retornar um array, e verificamos se o tamanho do array é 1, que significa que um pokemon apenas está na tela.

// teste 4: Captura de todos os botões e verificação se o array tem tamanho 7 (7 buttons). Após captura de cada button específico,
// para ver se só tem um de cada (sem repetição), espero que o tamanho do array seja 1 e que na tela apareça na tela somente o botão daquele tipo , na posição zero, sempre, já que temos só um botão de cada.

// teste 5: captura do button do tipo fire, espero que esteja no documento, simula o clique do usuário neste button, espero que o pokemon charmander esteja na tela, capturo o button de próximo pokemon  e vejo se está na tela, simulo o clico do usuário neste button próximo e verifico se aparece na tela o pokemon fire seguinte (rapidash)

// teste 6: Captura de cada button pelo name específico, espero que cada esteja na tela com o name indicado.

// teste 7: Captura do button, espero que esteja visível na tela.

// teste 8: Capturo button All e espero que ele tenha o texto indicado, simulo clico do usuário, verifico que com o clique não existe filtro, pois é o pikachu quem aparece como padrão, logo, verifico se ele está na tela, o que quer dizer que nenhum filtro está selecionado.
