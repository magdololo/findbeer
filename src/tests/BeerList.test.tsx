import React, { PropsWithChildren } from 'react';
import { render, RenderOptions, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PreloadedState } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { beerApiResponse } from '../testingData';
import BeerList from '../components/BeerList';
import { AppStore, RootState, setupStore } from '../app/store';


interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<Partial<RootState>>
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    )
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export const handlers = [
  rest.get('https://api.punkapi.com/v2/beers', (req, res, ctx) => {
    return res(ctx.json(beerApiResponse))
  })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

test('renders title', () => {
  renderWithProviders(<BeerList />);
  const titleElement = screen.getByText(/beers/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders first page of beer list with 12 beers', async () => {
  renderWithProviders(<BeerList />);
  const beerCards = await screen.findAllByRole(/beerCard/i);
  expect(beerCards.length).toBe(12)
});
