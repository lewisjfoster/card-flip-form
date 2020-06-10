/* eslint-disable import/prefer-default-export */
import creditCardType from 'credit-card-type';

import VisaIcon from './assets/visa.svg';
import MastercardIcon from './assets/mastercard.svg';
import AmexIcon from './assets/amex.svg';
import DinersIcon from './assets/diners.svg';
import DiscoverIcon from './assets/discover.svg';
import EloIcon from './assets/elo.svg';
import HipercardIcon from './assets/hipercard.svg';
import JcbIcon from './assets/jcb.svg';
import MaestroIcon from './assets/maestro.svg';
import UnionpayIcon from './assets/unionpay.svg';

export const card = {
    [creditCardType.types.VISA]: VisaIcon,
    [creditCardType.types.MASTERCARD]: MastercardIcon,
    [creditCardType.types.AMERICAN_EXPRESS]: AmexIcon,
    [creditCardType.types.DINERS_CLUB]: DinersIcon,
    [creditCardType.types.DISCOVER]: DiscoverIcon,
    [creditCardType.types.JCB]: JcbIcon,
    [creditCardType.types.UNIONPAY]: UnionpayIcon,
    [creditCardType.types.MAESTRO]: MaestroIcon,
    [creditCardType.types.ELO]: EloIcon,
    [creditCardType.types.MIR]: VisaIcon,
    [creditCardType.types.HIPER]: HipercardIcon,
    [creditCardType.types.HIPERCARD]: HipercardIcon,
};
