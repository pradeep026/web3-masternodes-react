import React from 'react';
import FormatUtils from '../../utils';
import './style.scss';

type Props = {
    /**
     * Logo icon to display in card header
     */
    headerIcon?: React.SVGProps<SVGSVGElement>;

    /**
     * Heading label
     */
    headingLabel: string;
    
    /**
     * Use selected currency symbol
     */
    selecteCurrency: string;

    selectedCurrencyRatePerCoin: undefined | number;

    /**
     * Total no of masternodes available
     */
    noOfMasterNodes?: number;
    
    /**
     * Total no of masternodes available
     */
    noOfCoins?: number;
    
    /**
     * Total no of masternodes available
     */
    totalValueOfAssets?: number;
}

const AssetsCard: React.FC<Props> = ({ headerIcon, headingLabel, selecteCurrency, selectedCurrencyRatePerCoin, totalValueOfAssets, noOfCoins: noOfActiveMasterNodes, noOfMasterNodes }) => {

    return (
        <div className='card'>
            <div className='card--header'>
                { headerIcon && headerIcon}
                <h3>{headingLabel}</h3>
                {
                    selectedCurrencyRatePerCoin &&
                    <h4>
                        <span>Per Coin</span>
                        {selectedCurrencyRatePerCoin} {selecteCurrency}
                    </h4>
                }
            </div>
            <div className='card--content'>
                <div className='info'>
                    <label>Total masternodes</label>
                    <p>{FormatUtils.formatNumber(noOfMasterNodes)}</p>
                </div>
                <div className='info'>
                    <label>Total Coins</label>
                    <p>{FormatUtils.formatNumber(noOfActiveMasterNodes)}</p>
                </div>
                <div className='info'>
                    <label>Total value in</label>
                    <p>{FormatUtils.formatCurrency(totalValueOfAssets, selecteCurrency)}</p>
                </div>
            </div>
        </div>
    )
};

export default AssetsCard;