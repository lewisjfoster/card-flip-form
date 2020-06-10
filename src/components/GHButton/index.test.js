import React from 'react';
import { render, screen } from '@testing-library/react';

import GHButton from '.';
import { button as lang } from '../../libs/lang';
import { GITHUB_LINK } from '../../libs/constants';

describe('App', () => {
    it('should render the component', () => {
        render(<GHButton />);

        expect(screen.getByTestId('gh-button')).toBeInTheDocument();
    });

    it('should render the button with the correct text and href', () => {
        render(<GHButton />);

        const button = screen.getByText(lang.link);
        expect(button).toHaveAttribute('href', GITHUB_LINK);
    });
});
