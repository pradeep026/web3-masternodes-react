import React from 'react';
import './style.scss';


type Props = {

    /**
     * This props to render a custom component to header right side
     * It's an optional function
     */
     renderRightSideContent?: () => React.ReactNode;
}

const Header: React.FC<Props> = ({ renderRightSideContent }) => {

    return (
        <header>
            <h1>Cake - Assets Under Management</h1>
        </header>
    )
};

export default Header;