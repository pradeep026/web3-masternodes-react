import React, { useEffect } from 'react';
// Import store and actions goes here
import { RootState, useAppDispatch, useAppSelector } from '../../stores';
import { fetchExchangeRate, selectCurrency } from '../../stores/slices/currencies';
import { calculateAUMOfMasterNodes, fetchMasterNodes } from '../../stores/slices/masternodes';
// Import components goes here
import AssetsCard from '../../components/AssetsCard';
import Header from '../../components/Header';
import ScreenContainer from '../../components/ScreenContainer';
import Select from '../../components/Select';
// Import Utils goes here
import FormatUtils from '../../utils';
// Import Icons goes here
import { ReactComponent as SVGDeFiChainIcon } from '../../assets/icons/icon_defi-chain.svg';
import { ReactComponent as SVGDashIcon } from '../../assets/icons/icon_dash.svg';
// Import styles goes here
import './style.scss';
import UserAssetsPortfolio from '../../components/UserAssetsPortfolio';

const MasterNodesAUMPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const masternodes = useAppSelector((state) => state.masternodes);
    const currencies = useAppSelector((state) => state.currencies);

    useEffect(() => {
        async function fetchData() {
            await dispatch(fetchMasterNodes());
            await dispatch(fetchExchangeRate());
        };
        fetchData();
    }, []);

    useEffect(() => {
        if(currencies.priceRates) {
            dispatch(calculateAUMOfMasterNodes({
                currencyValue: currencies.selectedCurrency,
                prices: currencies.priceRates
            }))
        }
    }, [currencies.priceRates, currencies.selectedCurrency])

    const onChangeCurrency = (value: string) => {
        dispatch(selectCurrency(value));
    }

    return (
        <ScreenContainer className='aum--page'>
          <Header />
          <div className='wrapper'>
              <UserAssetsPortfolio
                sumOfTotalAssetsValue={masternodes.sumOfTotalAssetsValue}
                selectedCurrency={currencies.selectedCurrency} />
              <div className='currency---selection'>
                <h4>Display prices in</h4>
                <Select
                    testId={`testid--currency-list`}
                    options={currencies.currenciesList}
                    value={currencies.selectedCurrency}
                    onSelect={onChangeCurrency} />
              </div>
              <div className='card--wrapper'>
                <AssetsCard
                    headerIcon={<SVGDeFiChainIcon />}
                    headingLabel={`DeFi`}
                    selecteCurrency={currencies.selectedCurrency}
                    selectedCurrencyRatePerCoin={currencies.priceRates?.defichain[currencies.selectedCurrency]}
                    noOfMasterNodes={masternodes.masterNodesOfDeFi.length}
                    noOfCoins={masternodes.noOfDeFiChainCoins}
                    totalValueOfAssets={masternodes.totalValueOfDefiChainCoins}/>
                <AssetsCard
                    headerIcon={<SVGDashIcon />}
                    headingLabel={`Dash`}
                    selecteCurrency={currencies.selectedCurrency}
                    selectedCurrencyRatePerCoin={currencies.priceRates?.dash[currencies.selectedCurrency]}
                    noOfMasterNodes={masternodes.masterNodesOfDash.length}
                    noOfCoins={masternodes.noOfDashCoins}
                    totalValueOfAssets={masternodes.totalValueOfDashCoins} />
              </div>
          </div>
        </ScreenContainer>
      );
}

export default MasterNodesAUMPage;