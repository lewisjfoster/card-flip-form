import React, { useState } from 'react';
import creditCardType from 'credit-card-type';

import Card from '../Card';

import styles from './Form.css';
import { form as lang } from '../../libs/lang';
import { AMEX_CARD_NO_LENGTH, DEFAULT_CARD_NO_LENGTH } from '../../libs/constants';
import { chunkCardNo } from '../../libs/utils';

export const formatCardMask = (cardNoChunks) => {
    let formattedCardNo = cardNoChunks[0];

    if (cardNoChunks.length === 1) return formattedCardNo;

    for (let i = 1; i <= cardNoChunks.length; i++) {
        if (!cardNoChunks[i]) break;
        formattedCardNo += ` ${cardNoChunks[i]}`;
    }

    return formattedCardNo;
};

export const getCardNoLength = (type) =>
    type === creditCardType.types.AMERICAN_EXPRESS ? AMEX_CARD_NO_LENGTH : DEFAULT_CARD_NO_LENGTH;

const Form = () => {
    const [cardNo, setCardNo] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [cardExpirationMonth, setCardExpirationMonth] = useState('');
    const [cardExpirationYear, setCardExpirationYear] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    const [cardType, setCardType] = useState(creditCardType(cardNo)[0]);
    const [cardNoLength, setCardNoLength] = useState(getCardNoLength(cardType.type));
    const [isFlipped, setIsFlipped] = useState(false);

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const chunkedCardNo = chunkCardNo(cardNo, cardType.gaps);

    const {
        cardNoLabel,
        cardHolderLabel,
        cardExpirationLabel,
        cardExpirationMonthLabel,
        cardExpirationYearLabel,
        cardCvvLabel,
        submitButton,
    } = lang;

    return (
        <>
            <Card
                cardNo={cardNo}
                cardNoGaps={cardType.gaps}
                cardNoLength={cardNoLength}
                cardHolder={cardHolder}
                cardExpirationMonth={cardExpirationMonth}
                cardExpirationYear={cardExpirationYear}
                cardCvv={cardCvv}
                cardTypeId={cardType.type}
                isFlipped={isFlipped}
            />

            <form className={styles.form} data-testid="form">
                <label htmlFor="card-no">{cardNoLabel}</label>
                <input
                    id="card-no"
                    type="text"
                    value={formatCardMask(chunkedCardNo)}
                    onChange={(e) => {
                        const re = /^[0-9\b]+$/;
                        const value = e.target.value.replace(/\s/g, '');
                        if (value === '' || re.test(value)) {
                            const newCardType = creditCardType(value)[0] || creditCardType('')[0];
                            const newCardLength = getCardNoLength(newCardType.type);

                            setCardType(newCardType);
                            setCardNoLength(newCardLength);
                            setCardNo(value.slice(0, newCardLength));
                        }
                    }}
                />

                <label htmlFor="card-holder">{cardHolderLabel}</label>
                <input
                    id="card-holder"
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                />

                <div className={styles.formBottom}>
                    <div className={styles.formExpiration}>
                        <label htmlFor="card-expiration-month">{cardExpirationLabel}</label>
                        <div className={styles.formExpirationSelect}>
                            <select
                                id="card-expiration-month"
                                value={cardExpirationMonth}
                                onChange={(e) => setCardExpirationMonth(e.target.value)}
                            >
                                <option value="" disabled>
                                    {cardExpirationMonthLabel}
                                </option>
                                {[...Array(12).keys()]
                                    .map((i) => (i + 1).toString().padStart(2, '0'))
                                    .map((i) => (
                                        <option
                                            key={i}
                                            value={i}
                                            disabled={
                                                parseInt(cardExpirationYear, 10) === currentYear &&
                                                parseInt(i, 10) < currentMonth
                                            }
                                        >
                                            {i}
                                        </option>
                                    ))}
                            </select>

                            <select
                                data-testid="card-expiration-year"
                                value={cardExpirationYear}
                                onChange={(e) => {
                                    setCardExpirationYear(e.target.value);
                                    if (
                                        parseInt(e.target.value, 10) === currentYear &&
                                        parseInt(cardExpirationMonth, 10) < currentMonth
                                    )
                                        setCardExpirationMonth('');
                                }}
                            >
                                <option value="" disabled>
                                    {cardExpirationYearLabel}
                                </option>
                                {[...Array(11).keys()]
                                    .map((i) => i + currentYear)
                                    .map((i) => (
                                        <option key={i} value={i}>
                                            {i}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    {/* Add better validation for numbers and length */}
                    <div className={styles.formCardCvv}>
                        <label htmlFor="card-cvv">{cardCvvLabel}</label>
                        <input
                            id="card-cvv"
                            type="text"
                            value={cardCvv}
                            onChange={(e) => {
                                const re = /^[0-9\b]+$/;
                                const value = e.target.value.replace(/\s/g, '');
                                if (value === '' || re.test(value)) {
                                    setCardCvv(value.slice(0, cardType.code.size));
                                }
                            }}
                            onFocus={() => setIsFlipped(!isFlipped)}
                            onBlur={() => setIsFlipped(!isFlipped)}
                        />
                    </div>
                </div>

                <button type="button">{submitButton}</button>
            </form>
        </>
    );
};

export default Form;
