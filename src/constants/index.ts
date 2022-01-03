/**
 * Maintain store related constants values here
 */

export const HttpConstants = {
    Timeout: 60_000,
} as const;

export const LocaleConstants = {
    // Default Locale value
    Locale: `en`,
    // Used to format the numbers into formatted value
    MaximumSignificantDigits: 3,
}

export const CryptoCoins = {
    DeFiChain: `defichain`,
    Dash: `dash`
};

export const NoOfCoinsPerMasterNode = {
    Dash: 1_000, // 1000
    DeFiChain: 20_000, // 20,000 
};

export const Currencies = [
    {
        label: `USD`,
        value: `usd`
    },
    {
        label: `EUR`,
        value: `eur`
    },
    {
        label: `SGD`,
        value: `sgd`
    },
    {
        label: `BTC`,
        value: `btc`
    },
    {
        label: `ETH`,
        value: `eth`
    },
]