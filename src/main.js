'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';


import App from './component/app';
import appStoreCreate from './lib/store-create.js';
import CommentForm from './component/forms/comment-form/index'
import './style/main.scss';

const store = appStoreCreate();

const AppContainer = () => {
  return(
    <Provider store={store}>
      <App />
    </Provider>
  )
};

ReactDom.render(<AppContainer />, document.getElementById('root'));
