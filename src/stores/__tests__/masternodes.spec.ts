import masternodesReducer from '../slices/masternodes';
import { MasterNodesState } from '../index';


describe(`Tests masternodes reducer`, () => {
    it(`initial state loads as expected`, () => {
        const initialState = {
            masternodes: [],
            masterNodesOfDash: [],
            masterNodesOfDeFi: [],
            noOfDashCoins: 0,
            noOfDeFiChainCoins: 0,
            totalValueOfDashCoins: 0,
            totalValueOfDefiChainCoins: 0,
            sumOfTotalAssetsValue: 0,
        } as MasterNodesState;
        const state = masternodesReducer(initialState, { type: null });
        expect(state).toBe(initialState);
    });

});
