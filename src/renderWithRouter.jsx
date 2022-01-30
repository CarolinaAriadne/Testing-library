import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

export default renderWithRouter;

// função tirada do course - utilizada para criar um history de navegação simulado no Router, assim, a cada teste, temos um ambiente de navegação limpo e não com a rota anterior, o que atrapalharia os testes seguintes
