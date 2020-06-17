/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import chip from '../../libs/assets/chip.png';

import styles from './Card.css';
import { card as lang } from '../../libs/lang';
import { card as config } from '../../libs/config';
import { chunkCardNo } from '../../libs/utils';

const formatCardNo = (cardNoArray, placeholder) => {
    const formattedArray = [...cardNoArray];

    for (let i = 1; i < cardNoArray.length - 1; i++) {
        formattedArray[i] = cardNoArray[i].replace(/\d{1}/g, placeholder);
    }

    return formattedArray;
};

const Card = ({
    cardNo,
    cardNoGaps,
    cardNoLength,
    cardHolder,
    cardExpirationMonth,
    cardExpirationYear,
    cardCvv,
    cardTypeId,
    isFlipped,
}) => {
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

    const Icon = config[cardTypeId];

    return (
        <div className={styles.cardWrapper} data-testid="card">
            <div className={cx(styles.card, isFlipped ? styles.isFlipped : null)} data-testid="card-flip">
                <div className={cx(styles.cardFace, styles.cardFront)}>
                    <div className={styles.cardFrontTop}>
                        <Icon data-testid="card-icon" />
                        <img src={chip} alt="chip" data-testid="card-chip" />
                    </div>

                    <div className={styles.cardFrontNumber}>
                        {formatCardNo(
                            chunkCardNo(cardNo + cardNoPlaceholder.repeat(cardNoLength - cardNo.length), cardNoGaps),
                            cardMask,
                        ).map((numbers, index) => (
                            <div key={index} data-testid="card-chunk">
                                {numbers}
                            </div>
                        ))}
                    </div>

                    <div className={styles.cardFrontBottom}>
                        <div>
                            <div className={styles.title}>{cardHolderLabel}</div>
                            <div>{cardHolder.toUpperCase() || cardHolderPlaceholder}</div>
                        </div>
                        <div>
                            <div className={styles.title}>{cardExpirationLabel}</div>
                            <div>
                                {`${cardExpirationMonth || cardExpirationMonthPlaceholder}/${
                                    cardExpirationYear.substr(2, 4) || cardExpirationYearPlaceholder
                                }`}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx(styles.cardFace, styles.cardBack)}>
                    <div className={styles.cardBackStrip} />
                    <div className={styles.cardBackCvv}>
                        <div className={styles.title}>{cardCvvLabel}</div>
                        <div className={styles.cardBackSignature}>
                            {!cardCvv || cardCvv.match(/.{1}/g).map(() => cardMask)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Card.propTypes = {
    cardNo: PropTypes.string.isRequired,
    cardNoGaps: PropTypes.array.isRequired,
    cardNoLength: PropTypes.number.isRequired,
    cardHolder: PropTypes.string.isRequired,
    cardExpirationMonth: PropTypes.string.isRequired,
    cardExpirationYear: PropTypes.string.isRequired,
    cardCvv: PropTypes.string.isRequired,
    cardTypeId: PropTypes.string.isRequired,
    isFlipped: PropTypes.bool.isRequired,
};

export default Card;
