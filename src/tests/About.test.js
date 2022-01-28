import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  test('Testa se a paǵina contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(title).toBeInTheDocument();
  });
  test('Testa se a paǵina contém  dois parágrafos', () => {
    renderWithRouter(<About />);
    const textPokemon = screen.getAllByText(/Pokémons/i);
    expect(textPokemon).toHaveLength(2);
  });
  test('Testa se a paǵina contém a imagem  da URL tal de uma Pokedéx', () => {
    renderWithRouter(<About />);
    const img = screen.getByAltText('Pokédex');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(img).toHaveAttribute('alt', 'Pokédex');
  });
});
