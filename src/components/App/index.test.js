import React from 'react';
import { render, screen } from '@testing-library/react';

import App from '.';

describe('App', () => {
    it('should render the component', () => {
        render(<App />);

        expect(screen.getByTestId('app')).toBeInTheDocument();
    });

    it('should render the form inside the component', () => {
        render(<App />);

        expect(screen.getByTestId('form')).toBeInTheDocument();
    });

    it('should render the gh button inside the component', () => {
        render(<App />);

        expect(screen.getByTestId('gh-button')).toBeInTheDocument();
    });
});
