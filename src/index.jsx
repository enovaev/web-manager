import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Normalize } from 'styled-normalize';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(() => {}, {});

ReactDOM.render(
  <Provider store={store}>
    <Normalize />
    <App />
  </Provider>,
  document.getElementById('root'),
);
serviceWorker.unregister();
