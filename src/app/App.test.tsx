import { act, fireEvent, screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../store';
import searchService from '../services/searchService';

import App from './App';

describe('<App />', () => {
  describe('when search an artist', () => {
    test('should render search result expected', async () => {
      const spyItemsListService = jest
        .spyOn(searchService, 'getItems')
        .mockImplementationOnce(() =>
          Promise.resolve([
            {
              trackImageUrl: 'url',
              artistName: '2 Cellos',
              trackId: '675849',
              trackName: 'Despacito',
              trackPrice: 3.49,
              currency: 'USD',
            },
          ])
        );
      const { getByText } = render(
        <Provider store={store}>
          <App />
        </Provider>
      );

      const input = screen.getByTestId('search-input');
      const inputValue = 'Cellos';

      fireEvent.change(input, { target: { value: inputValue } });

      const searchButton = screen.getByRole('button', { name: 'Search' });
      // eslint-disable-next-line testing-library/no-unnecessary-act
      act(() => {
        fireEvent.click(searchButton);
      });
      await screen.findByText('Despacito');
      screen.getByText('3.49 USD');
      // there is an item number '1)' before artist name
      screen.getByText('1) 2 Cellos');

      expect(spyItemsListService).toHaveBeenCalledWith('Cellos', 0, 10);
      spyItemsListService.mockClear();
    });
  });
});
