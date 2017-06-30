import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { actionCtrCenter } from 'dva-atr'

function IndexPage({ type = 'empty', onBtnByClick }) {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
        <button onClick={onBtnByClick}>click me</button>
        <li>curType is: {type}</li>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {
};

const mapStateToProps = ({
   example
}) => {
  return example.toJS()
}

const mapDispatchToProps = dispatch => ({
  onBtnByClick() {
    dispatch(actionCtrCenter['example'].set({
      path: 'type',
      value: 'change-click'
    }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
