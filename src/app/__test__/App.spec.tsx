import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import { Provider } from 'react-redux';
import App from '../App';
import { store } from '../../stores';
import { Currencies, NoOfCoinsPerMasterNode } from '../../constants';

const mockMasterNodesResponse = [{"id":"1","coin":"DeFi","status":"ACTIVE"},{"id":"2","coin":"DeFi","status":"ACTIVE"},{"id":"3","coin":"Dash","address":"8Kh3jSQe2c659oBGghF6kkweGxvixXQswh","status":"ACTIVE"},{"id":"4","coin":"DeFi","status":"AWAITING_FIRST_REWARD"},{"id":"5","coin":"Dash","status":"ACTIVE"},{"id":"6","coin":"Dash","status":"ACTIVE"},{"id":"7","coin":"DeFi","status":"ACTIVE"},{"id":"8","coin":"DeFi","status":"ACTIVE"}];
const mockPricesResponse = {"dash":{"usd":141.71,"eur":124.8,"sgd":191.36,"btc":0.00299377,"eth":0.03706167},"defichain":{"usd":3.39,"eur":2.99,"sgd":4.58,"btc":7.163e-05,"eth":0.00088674}};

// Enable API mocking before tests.
jest.mock('axios');

// Create an object of type of mocked Axios.
const mockAxios = axios as jest.Mocked<typeof axios>;

const mockApiFunction = () => {
  // Make the mock return the custom axios response
  mockAxios.get.mockImplementation((request) => {
    return new Promise((resolve) => {
      if(request === `https://api.cakedefi.com/nodes`) {
        resolve({ data: mockMasterNodesResponse });
      }
      if(request === `https://api.coingecko.com/api/v3/simple/price`) {
        resolve({ data: mockPricesResponse });
      }
    });
  });
}

describe(`App - Integration Testing`, () => {
  
  beforeAll(() => {
    jest.resetModules() // clears the cache
    process.env.REACT_APP_CAKE_BE_DOMAIN=`https://api.cakedefi.com/`;
    process.env.REACT_APP_COIN_EXCHANGE_DOMAIN=`https://api.coingecko.com/`;
  });

  it('App renders and state update works as expected', async () => {
    // Invoke mock api func
    mockApiFunction();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    store.subscribe(async () => {
      const state = await store.getState();
      expect(state.masternodes.masternodes.length).toEqual(mockMasterNodesResponse.length); // result contains all masternodes received from api
      expect(state.masternodes.masterNodesOfDash.length).toEqual(3); // result contains only active dash conins
      expect(state.masternodes.masterNodesOfDeFi.length).toEqual(4); // result contains only active defi nodes
      expect(state.masternodes.noOfDashCoins).toEqual(3 * NoOfCoinsPerMasterNode.Dash );
      expect(state.masternodes.noOfDeFiChainCoins).toEqual(4 * NoOfCoinsPerMasterNode.DeFiChain );
    });
    
  });

  it(`currency selection change is updated in state`, async () => {
    mockApiFunction();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    // Test changing currency
    const selectElement = screen.getByTestId(`testid--currency-list`);
    // Looping all currencies to simulate the currency change event
    Currencies.forEach((currency) => {
      fireEvent.change(
        selectElement,
        { target: { value: currency.value }}
      );
      let state = store.getState();
      expect(state.currencies.selectedCurrency).toBe(currency.value);
    });
  })
});
