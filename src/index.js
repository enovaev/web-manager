import React from 'react';
import ReactDOM from 'react-dom';
import { Normalize } from 'styled-normalize';
import { Provider } from 'react-redux';
import store from './state/store/store';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <Provider store={store}>
    <Normalize />
    <App />
  </Provider>,
  document.getElementById('root'),
);
serviceWorker.unregister();
