import React from 'react';
import { render } from '@testing-library/react';
import ScreenContainer from '../ScreenContainer';

describe('Component - ScreenContainer', () => {
  
    it(`renders header component`, () => {
        render(<ScreenContainer><p>Test Content</p></ScreenContainer>);
    });
});
