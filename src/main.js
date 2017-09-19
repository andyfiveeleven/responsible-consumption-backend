'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';


import App from './component/app';
import ExpReviewForm from './component/forms/exp-review-form';
import appStoreCreate from './lib/store-create.js';
import './style/main.scss';

const store = appStoreCreate();

const AppContainer = () => {
  return(
    <Provider store={store}>
      <App />
    </Provider>
  )
};

ReactDom.render(<ExpReviewForm />,  document.getElementById('root'));
