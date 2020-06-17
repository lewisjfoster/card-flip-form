import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MockDate from 'mockdate';

import Form from '.';
import { card as cardLang, form as formLang } from '../../libs/lang';

const {
    cardMask,
    cardNoPlaceholder,
    cardHolderPlaceholder,
    cardExpirationMonthPlaceholder,
    cardExpirationYearPlaceholder,
} = cardLang;

const {
    cardNoLabel,
    cardHolderLabel,
    cardExpirationLabel,
    cardExpirationMonthLabel,
    cardExpirationYearLabel,
    cardCvvLabel,
    submitButton,
} = formLang;

MockDate.set('2020-06-20');
const currentDate = new Date();
const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const currentYear = currentDate.getFullYear().toString();

describe('Form', () => {
    it('should render the component', () => {
        render(<Form />);

        expect(screen.getByTestId('form')).toBeInTheDocument();
    });

    it('should render the Card inside the Form', () => {
        render(<Form />);

        expect(screen.getByTestId('card')).toBeInTheDocument();
    });

    describe('Card Number input', () => {
        it('should render the label and input for the card number', () => {
            render(<Form />);

            expect(screen.getByLabelText(cardNoLabel)).toBeInTheDocument();
            const inputNode = screen.getByLabelText(cardNoLabel);

            expect(inputNode.value).toBe('');
        });

        it.each`
            input                         | display
            ${'card form test'}           | ${''}
            ${'     '}                    | ${''}
            ${'1234 card form test 5678'} | ${''}
            ${'12345678'}                 | ${'1234 5678'}
            ${'1234567812345678999'}      | ${'1234 5678 1234 5678'}
            ${'1234567812345678'}         | ${'1234 5678 1234 5678'}
            ${'340000000012345999'}       | ${'3400 000000 12345'}
            ${'340000000012345'}          | ${'3400 000000 12345'}
        `('should display "$display" when "$input" is entered into the text field', ({ input, display }) => {
            render(<Form />);

            const inputNode = screen.getByLabelText(cardNoLabel);
            expect(inputNode.value).toBe('');

            fireEvent.change(inputNode, { target: { value: input } });
            expect(inputNode.value).toBe(display);
        });

        it.each`
            input       | display
            ${''}       | ${[cardNoPlaceholder.repeat(4), cardNoPlaceholder.repeat(4), cardNoPlaceholder.repeat(4), cardNoPlaceholder.repeat(4)]}
            ${'1234'}   | ${['1234', cardNoPlaceholder.repeat(4), cardNoPlaceholder.repeat(4), cardNoPlaceholder.repeat(4)]}
            ${'123456'} | ${['1234', cardMask.repeat(2) + cardNoPlaceholder.repeat(2), cardNoPlaceholder.repeat(4), cardNoPlaceholder.repeat(4)]}
            ${'123456'} | ${['1234', cardMask.repeat(2) + cardNoPlaceholder.repeat(2), cardNoPlaceholder.repeat(4), cardNoPlaceholder.repeat(4)]}
        `(
            'should display "$display" inside the Card when "$input" is entered into the text field',
            ({ input, display }) => {
                render(<Form />);

                const inputNode = screen.getByLabelText(cardNoLabel);
                expect(inputNode.value).toBe('');

                fireEvent.change(inputNode, { target: { value: input } });

                const cardChunks = screen.getAllByTestId('card-chunk');

                cardChunks.forEach((chunk, index) => {
                    expect(chunk).toHaveTextContent(display[index]);
                });
            },
        );
    });

    describe('Card Holder input', () => {
        it('should render the label and input for the card holder', () => {
            render(<Form />);

            expect(screen.getByLabelText(cardHolderLabel)).toBeInTheDocument();
            const inputNode = screen.getByLabelText(cardHolderLabel);

            expect(inputNode.value).toBe('');
        });

        it.each`
            input                    | display
            ${''}                    | ${''}
            ${'Mr Johnny Appleseed'} | ${'Mr Johnny Appleseed'}
        `('should display "$display" when "$input" is entered into the text field', ({ input, display }) => {
            render(<Form />);

            const inputNode = screen.getByLabelText(cardHolderLabel);
            expect(inputNode.value).toBe('');

            fireEvent.change(inputNode, { target: { value: input } });
            expect(inputNode.value).toBe(display);
        });

        it.each`
            input                    | display
            ${''}                    | ${cardHolderPlaceholder}
            ${'Mr Johnny Appleseed'} | ${'MR JOHNNY APPLESEED'}
        `(
            'should display "$display" inside the Card when "$input" is entered into the text field',
            ({ input, display }) => {
                render(<Form />);

                const inputNode = screen.getByLabelText(cardHolderLabel);
                expect(inputNode.value).toBe('');

                fireEvent.change(inputNode, { target: { value: input } });
                expect(screen.getByText(display)).toBeInTheDocument();
            },
        );
    });

    describe('Card Expiration input', () => {
        it('should render the label and input for the card expiration', () => {
            render(<Form />);

            expect(screen.getByLabelText(cardExpirationLabel)).toBeInTheDocument();
            const monthInputNode = screen.getByLabelText(cardExpirationLabel);
            const yearInputNode = screen.getByTestId('card-expiration-year');

            expect(monthInputNode.value).toBe('');
            expect(yearInputNode.value).toBe('');

            expect(screen.getByText(cardExpirationMonthLabel)).toBeInTheDocument();
            expect(screen.getByText(cardExpirationYearLabel)).toBeInTheDocument();
        });

        it.each`
            input      | display
            ${''}      | ${''}
            ${'lewis'} | ${''}
            ${'13'}    | ${''}
        `('should display nothing when "$input" is selected as the month', ({ input, display }) => {
            render(<Form />);

            expect(screen.getByLabelText(cardExpirationLabel)).toBeInTheDocument();
            const monthInputNode = screen.getByLabelText(cardExpirationLabel);
            fireEvent.change(monthInputNode, { target: { value: input } });

            expect(monthInputNode.value).toBe(display);
        });

        it('should allow all months to be selected', () => {
            render(<Form />);

            const monthInputNode = screen.getByLabelText(cardExpirationLabel);

            [...Array(12).keys()]
                .map((i) => (i + 1).toString().padStart(2, '0'))
                .forEach((i) => {
                    fireEvent.change(monthInputNode, { target: { value: '' } });
                    fireEvent.change(monthInputNode, { target: { value: i } });

                    expect(monthInputNode.value).toBe(i);
                });
        });

        it.each`
            input                                          | display
            ${''}                                          | ${''}
            ${'lewis'}                                     | ${''}
            ${currentYear - 1}                             | ${''}
            ${(parseInt(currentYear, 10) + 11).toString()} | ${''}
        `('should display nothing when "$input" is selected as the year', ({ input, display }) => {
            render(<Form />);

            const yearInputNode = screen.getByTestId('card-expiration-year');
            fireEvent.change(yearInputNode, { target: { value: input } });

            expect(yearInputNode.value).toBe(display);
        });

        it('should allow the next 10 years to be selected', () => {
            render(<Form />);

            const yearInputNode = screen.getByTestId('card-expiration-year');

            [...Array(11).keys()]
                .map((i) => (i + parseInt(currentYear, 10)).toString())
                .forEach((i) => {
                    fireEvent.change(yearInputNode, { target: { value: '' } });
                    fireEvent.change(yearInputNode, { target: { value: i } });

                    expect(yearInputNode.value).toBe(i);
                });
        });

        it('should not allow past dates to be selected', () => {
            const month = (currentMonth - 1).toString().padStart(2, '0');

            render(<Form />);

            const monthInputNode = screen.getByLabelText(cardExpirationLabel);
            const yearInputNode = screen.getByTestId('card-expiration-year');

            fireEvent.change(monthInputNode, { target: { value: month } });
            expect(monthInputNode.value).toBe(month);
            expect(yearInputNode.value).toBe('');

            fireEvent.change(yearInputNode, { target: { value: currentYear } });

            expect(monthInputNode.value).toBe('');
            expect(yearInputNode.value).toBe(currentYear);
        });

        it.each`
            month                                             | year           | display
            ${''}                                             | ${''}          | ${`${cardExpirationMonthPlaceholder}/${cardExpirationYearPlaceholder}`}
            ${(currentMonth - 1).toString().padStart(2, '0')} | ${currentYear} | ${`${cardExpirationMonthPlaceholder}/${currentYear.substr(0, 2)}`}
            ${currentMonth}                                   | ${''}          | ${`${currentMonth}/${cardExpirationYearPlaceholder}`}
            ${''}                                             | ${currentYear} | ${`${cardExpirationMonthPlaceholder}/${currentYear.substr(0, 2)}`}
            ${currentMonth}                                   | ${currentYear} | ${`${currentMonth}/${currentYear.substr(0, 2)}`}
        `(
            'should display "$display" in the card when "$month" is selected as the month and "$year" is selected as the year',
            ({ month, year, display }) => {
                render(<Form />);

                const monthInputNode = screen.getByLabelText(cardExpirationLabel);
                const yearInputNode = screen.getByTestId('card-expiration-year');
                fireEvent.change(monthInputNode, { target: { value: month } });
                fireEvent.change(yearInputNode, { target: { value: year } });

                expect(screen.getByText(display)).toBeInTheDocument();
            },
        );
    });

    describe('Card Cvv input', () => {
        it('should render the label and input for the card cvv', () => {
            render(<Form />);

            expect(screen.getByLabelText(cardCvvLabel)).toBeInTheDocument();
            const inputNode = screen.getByLabelText(cardCvvLabel);

            expect(inputNode.value).toBe('');
        });

        it.each`
            cvvInput    | cardNoInput | display
            ${''}       | ${''}       | ${''}
            ${'123'}    | ${''}       | ${'123'}
            ${'1234'}   | ${''}       | ${'123'}
            ${'123456'} | ${''}       | ${'123'}
            ${'123'}    | ${'34'}     | ${'123'}
            ${'123456'} | ${'34'}     | ${'1234'}
        `(
            'should display "$display" when "$input" is entered into the cvv field',
            ({ cvvInput, cardNoInput, display }) => {
                render(<Form />);

                const cvvInputNode = screen.getByLabelText(cardCvvLabel);
                const cardInputNode = screen.getByLabelText(cardNoLabel);

                fireEvent.change(cardInputNode, { target: { value: cardNoInput } });
                fireEvent.change(cvvInputNode, { target: { value: cvvInput } });

                expect(cvvInputNode.value).toBe(display);
            },
        );

        it.each`
            cvvInput    | cardNoInput | display
            ${'123'}    | ${''}       | ${cardMask.repeat(3)}
            ${'1234'}   | ${''}       | ${cardMask.repeat(3)}
            ${'123456'} | ${''}       | ${cardMask.repeat(3)}
            ${'123'}    | ${'34'}     | ${cardMask.repeat(3)}
            ${'123456'} | ${'34'}     | ${cardMask.repeat(4)}
        `(
            'should display "$display" when "$input" is entered into the cvv field',
            ({ cvvInput, cardNoInput, display }) => {
                render(<Form />);

                const cvvInputNode = screen.getByLabelText(cardCvvLabel);
                const cardInputNode = screen.getByLabelText(cardNoLabel);

                fireEvent.change(cardInputNode, { target: { value: cardNoInput } });
                fireEvent.change(cvvInputNode, { target: { value: cvvInput } });

                expect(screen.getByText(display)).toBeInTheDocument();
            },
        );

        it('should flip the card when the cvv field is in focus', () => {
            render(<Form />);

            expect(screen.getByTestId('card-flip')).not.toHaveClass('isFlipped');

            screen.getByLabelText(cardCvvLabel).focus();

            expect(screen.getByTestId('card-flip')).toHaveClass('isFlipped');
        });
    });

    describe('Submit button', () => {
        it('should render the submit button', () => {
            render(<Form />);

            expect(screen.getByText(submitButton)).toBeInTheDocument();
        });
    });
});
