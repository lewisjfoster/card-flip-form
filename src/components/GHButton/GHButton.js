import React from 'react';

import styles from './GHButton.css';
import { button as lang } from '../../libs/lang';
import { GITHUB_LINK } from '../../libs/constants';

const GHButton = () => (
    <div className={styles.button} data-testid="gh-button">
        <a href={GITHUB_LINK} target="_blank" rel="noreferrer" className={styles.link}>
            {lang.link}
        </a>
    </div>
);

export default GHButton;
