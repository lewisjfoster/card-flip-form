import React from 'react';

import Form from '../Form';
import GHButton from '../GHButton';

import styles from './App.css';

const App = () => (
    <div className={styles.container} data-testid="app">
        <Form />
        <GHButton />
    </div>
);

export default App;
