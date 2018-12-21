import React from 'react';
import ReactDOM from 'react-dom';

import styles from './index.css';

const App = () => (
  <div className={styles.container}>
    <div className={styles.content}>
      <span className={styles.alert}>This works</span>
    </div>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
