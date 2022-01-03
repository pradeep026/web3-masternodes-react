import React from 'react';
import FormatUtils from '../../utils';
import './style.scss';

type Props = {

    /**
     * Total sum of assets value calculated against selected currency
     */
    sumOfTotalAssetsValue: number;

    /**
     * Selected currency to format the sum value
     */
    selectedCurrency: string;


}

const UserAssetsPortfolio: React.FC<Props> = ({ sumOfTotalAssetsValue = 0, selectedCurrency }) => {

    return (
        <div className='user--portfolio'>
            <span>Total Assets</span>
            <h3 data-testid={'testid--sum-value'}>
                {FormatUtils.formatCurrency(sumOfTotalAssetsValue ?? 0, selectedCurrency)}
            </h3>
        </div>
    )
};


export default UserAssetsPortfolio;