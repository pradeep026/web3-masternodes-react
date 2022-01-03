import React from 'react';
import './style.scss';


type Props = {

    /**
     * Children element to be wrapped with screen container class
     */
    children: React.ReactNode;

    /**
     * This prop to apply a custom style which will override the components style.
     * It's an optional prop
     */
    className?: string;
}

const ScreenContainer: React.FC<Props> = ({ children, className }) => {


    return (
        <div
            className={`screen--container ${className ?? ``}`}>
            {children}
        </div>
    )
};

export default ScreenContainer;