import React from 'react';
import ReactDOM from 'react-dom';

import styles from './index.css';

const App = () => <div className={styles.wrapper}>This works!</div>;

ReactDOM.render(<App />, document.getElementById('root'));
