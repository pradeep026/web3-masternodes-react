
export interface MasterNode {
    id:         string;
    coin:       string;
    address:    string;
    status:     string;
    lastReward: LastReward | null;
    type:       string;
}

export interface LastReward {
    createdAt: Date;
    amount:    Amount;
}

export interface Amount {
    coin:   string;
    kind:   string;
    amount: string;
}

export interface PriceRate {
    [currency: string]: number
}

export interface PriceRatesOfDashAndDefichain {
    dash:  PriceRate;
    defichain: PriceRate;
}

export type MasterNodesState = {
    /**
     * List of masternodes.
     */
    masternodes: MasterNode[];

    /**
     * Contains only the Dash coin's masternodes.
     */
    masterNodesOfDash: MasterNode[];

    /**
     * Contains only the Defi coin's masternodes.
     */
    masterNodesOfDeFi: MasterNode[];
    
    /**
     * no of active dash coins - dash node * 1_000
     */
    noOfDashCoins: number;

    /**
     * no of active defi chain coins - defi node * 20_000
     */
    noOfDeFiChainCoins: number;

    /**
     * Value of total dash coins value in selected currency 
     */
    totalValueOfDashCoins: number,

    /**
     * Value of total defichain coins value in selected currency 
     */
    totalValueOfDefiChainCoins: number,

    /**
     * Combined value of total dash + defichain coins value in selected currency 
     */
    sumOfTotalAssetsValue: number
}

export type CurrenciesState = {
    /**
     * List of currencies
     */
    currenciesList: string[],

    /**
     * Selected currency to calculate AUM value
     */
    selectedCurrency: string,

    /**
     * exchange
     */
    exchangeRatesOfDashAndDefichain: PriceRatesOfDashAndDefichain
}

export type CalculateActionPayloadType = {
    /**
     * Selected currency value to be used to calculate the assets
     */
    currencyValue: string;

    /**
     * List of prices of both defi and dash coins exchange price rates
     */
    prices: PriceRatesOfDashAndDefichain
}
