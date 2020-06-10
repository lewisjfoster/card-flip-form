import React from 'react';
import { render, screen } from '@testing-library/react';

import Card from '.';
import { card as lang } from '../../libs/lang';

const {
    cardMask,
    cardNoPlaceholder,
    cardHolderLabel,
    cardHolderPlaceholder,
    cardExpirationLabel,
    cardExpirationMonthPlaceholder,
    cardExpirationYearPlaceholder,
    cardCvvLabel,
} = lang;

const requiredProps = {
    cardNo: '',
    cardNoGaps: [4, 8, 12],
    cardNoLength: 16,
    cardHolder: '',
    cardExpirationMonth: '',
    cardExpirationYear: '',
    cardCvv: '',
    cardTypeId: 'visa',
    isFlipped: false,
};

describe('Card', () => {
    it('should render the component', () => {
        render(<Card {...requiredProps} />);

        expect(screen.getByTestId('card')).toBeInTheDocument();
    });

    describe('Card Front', () => {
        it('should render and img and svg', () => {
            render(<Card {...requiredProps} />);

            expect(screen.getByTestId('card-icon')).toBeInTheDocument();
            expect(screen.getByTestId('card-chip')).toBeInTheDocument();
        });

        describe('Card Number', () => {
            it('should render an empty card number', () => {
                render(<Card {...requiredProps} />);

                const cardChunks = screen.getAllByTestId('card-chunk');
                expect(cardChunks).toHaveLength(requiredProps.cardNoGaps.length + 1);

                cardChunks.forEach((chunk) => {
                    expect(chunk).toHaveTextContent('####');
                });
            });

            it('should render an partial card number', () => {
                const partialCardNo = '123456';
                render(<Card {...requiredProps} cardNo={partialCardNo} />);

                const expectedOutput = [
                    partialCardNo.substr(0, 4),
                    cardMask.repeat(2) + cardNoPlaceholder.repeat(2),
                    cardNoPlaceholder.repeat(4),
                    cardNoPlaceholder.repeat(4),
                ];

                const cardChunks = screen.getAllByTestId('card-chunk');
                expect(cardChunks).toHaveLength(requiredProps.cardNoGaps.length + 1);

                cardChunks.forEach((chunk, index) => {
                    expect(chunk).toHaveTextContent(expectedOutput[index]);
                });
            });

            it('should render a full card number', () => {
                const fullCardNo = '1234567887654321';
                render(<Card {...requiredProps} cardNo={fullCardNo} />);

                const expectedOutput = [
                    fullCardNo.substr(0, 4),
                    cardMask.repeat(4),
                    cardMask.repeat(4),
                    fullCardNo.substr(12, 4),
                ];

                const cardChunks = screen.getAllByTestId('card-chunk');
                expect(cardChunks).toHaveLength(requiredProps.cardNoGaps.length + 1);

                cardChunks.forEach((chunk, index) => {
                    expect(chunk).toHaveTextContent(expectedOutput[index]);
                });
            });
        });

        describe('Card Holder', () => {
            it('should render the card holder label and placeholder', () => {
                render(<Card {...requiredProps} />);

                expect(screen.getByText(cardHolderLabel)).toBeInTheDocument();
                expect(screen.getByText(cardHolderPlaceholder)).toBeInTheDocument();
            });

            it('should render an inputed card holders name', () => {
                const cardHolder = 'LeWiS FoSteR';
                render(<Card {...requiredProps} cardHolder={cardHolder} />);

                expect(screen.getByText(cardHolder.toUpperCase())).toBeInTheDocument();
            });
        });

        describe('Card Expiration', () => {
            it('should render the card expiration label and placeholder', () => {
                render(<Card {...requiredProps} />);

                expect(screen.getByText(cardExpirationLabel)).toBeInTheDocument();
                expect(
                    screen.getByText(`${cardExpirationMonthPlaceholder}/${cardExpirationYearPlaceholder}`),
                ).toBeInTheDocument();
            });

            it('should render the card expiration month', () => {
                const month = '06';
                render(<Card {...requiredProps} cardExpirationMonth={month} />);

                expect(screen.getByText(`${month}/${cardExpirationYearPlaceholder}`)).toBeInTheDocument();
            });

            it('should render the card expiration year', () => {
                const year = '2020';
                render(<Card {...requiredProps} cardExpirationYear={year} />);

                expect(screen.getByText(`${cardExpirationMonthPlaceholder}/${year.substr(0, 2)}`)).toBeInTheDocument();
            });

            it('should render the card expiration date', () => {
                const month = '06';
                const year = '2020';
                render(<Card {...requiredProps} cardExpirationMonth={month} cardExpirationYear={year} />);

                expect(screen.getByText(`${month}/${year.substr(0, 2)}`)).toBeInTheDocument();
            });
        });
    });

    describe('Card Back', () => {
        describe('Card CVV', () => {
            it('should render the card cvv label and cvv', () => {
                const cvv = '123';
                render(<Card {...requiredProps} cardCvv={cvv} />);

                expect(screen.getByText(cardCvvLabel)).toBeInTheDocument();
                expect(screen.getByText(cardMask.repeat(cvv.length))).toBeInTheDocument();
            });

            it('should render the card unflipped and should then flip', () => {
                const { rerender } = render(<Card {...requiredProps} />);

                expect(screen.getByTestId('card-flip')).not.toHaveClass('isFlipped');

                rerender(<Card {...requiredProps} isFlipped />);

                expect(screen.getByTestId('card-flip')).toHaveClass('isFlipped');
            });
        });
    });
});
