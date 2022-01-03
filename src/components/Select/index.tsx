import React, { ChangeEvent } from 'react';
import './style.scss';

type OptionType = {
    label: string;
    value: string;
}

type Props = {
    /**
     * List of options to be rendered under select component
     */
    options: OptionType[];

    /**
     * Current selected value
     */
    value: string;

    /**
     * Callback function to be called on value change
     */
    onSelect: (value: string) => void;
}

const Select: React.FC<Props> = React.memo(({ options, value, onSelect }) => {
    
  
    const __onChangeOption = (event: ChangeEvent<HTMLSelectElement>) => {
        onSelect(event.target.value)
    };

    return (
      <div className="select--component">
        <select value={value} onChange={__onChangeOption}>
            {
                options.map((option, index) => {
                    return <option value={option.value} key={index}>{option.label}</option>
                })
            }
        </select>
      </div>
    );
})

export default Select;