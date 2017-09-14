'use strict';

import './style/main.scss';
import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';

import App from './component/app';
import appStoreCreate from './lib/app-store-create.js';

const store = appStoreCreate();

const AppContainer = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

ReactDom.render(<AppContainer />, document.getElementById('root'));
