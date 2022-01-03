import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllMasterNodes } from '../../api';
import { NoOfCoinsPerMasterNode } from '../../constants';
import type { CalculateActionPayloadType, MasterNode, MasterNodesState } from './types';

const initialState: MasterNodesState = {
    masternodes: [],
    masterNodesOfDash: [],
    masterNodesOfDeFi: [],
    noOfDashCoins: 0,
    noOfDeFiChainCoins: 0,
    totalValueOfDashCoins: 0,
    totalValueOfDefiChainCoins: 0,
    sumOfTotalAssetsValue: 0,
};

export const fetchMasterNodes = createAsyncThunk<Array<MasterNode>>('masternodes/fetchAll', async () => {
    const response = await fetchAllMasterNodes();
    return response;
});

const masternodesSlice = createSlice({
    name: 'masternodes',
    initialState,
    reducers: {
        calculateAUMOfMasterNodes(state, action: PayloadAction<CalculateActionPayloadType>) {
            const { currencyValue, prices } = action.payload;
            const priceOfDashPerCoin = prices.dash[currencyValue];
            const priceOfDeFichainPerCoin = prices.defichain[currencyValue];
            // Calculate the assets value against selected currency rate value
            state.totalValueOfDashCoins = Number(state.noOfDashCoins) * Number(priceOfDashPerCoin);
            state.totalValueOfDefiChainCoins = Number(state.noOfDeFiChainCoins) * Number(priceOfDeFichainPerCoin);
            // Sum of total assets value
            state.sumOfTotalAssetsValue = state.totalValueOfDashCoins + state.totalValueOfDefiChainCoins;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchMasterNodes.fulfilled, (state, { payload }) => {
            state.masternodes = payload;
            state.masterNodesOfDash = state.masternodes.filter((node) => {
                return node.coin === `Dash` && node.status === `ACTIVE`;
            });
            state.masterNodesOfDeFi = state.masternodes.filter((node) => {
                return node.coin === `DeFi` && node.status === `ACTIVE`;
            });
            state.noOfDashCoins = state.masterNodesOfDash.length * NoOfCoinsPerMasterNode.Dash;
            state.noOfDeFiChainCoins = state.masterNodesOfDeFi.length * NoOfCoinsPerMasterNode.DeFiChain;
        });
    },
});

export const { calculateAUMOfMasterNodes } = masternodesSlice.actions;

export default masternodesSlice.reducer;
