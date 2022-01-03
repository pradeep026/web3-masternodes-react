import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PriceRatesOfDashAndDefichain } from './types';
import { fetchExchangeRateBySelectedCurrency } from '../../api';
import { Currencies } from '../../constants';

const [ initalSelectedCurrency ] = Currencies

const initialState = {
    currenciesList: Currencies,
    selectedCurrency: initalSelectedCurrency.value as string,
    priceRates: null as (null | PriceRatesOfDashAndDefichain)
};

export const fetchExchangeRate = createAsyncThunk<PriceRatesOfDashAndDefichain>('prices/selectedCurrency', async () => {
    const response = await fetchExchangeRateBySelectedCurrency(`usd`);
    return response;
});

const currenciesSlice = createSlice({
    name: `currencies`,
    initialState,
    reducers: {
        selectCurrency(state, action: PayloadAction<string>) {
            state.selectedCurrency = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchExchangeRate.fulfilled, (state, { payload }) => {
            state.priceRates = payload;
        });
    },
});

export const { selectCurrency } = currenciesSlice.actions;

export default currenciesSlice.reducer;