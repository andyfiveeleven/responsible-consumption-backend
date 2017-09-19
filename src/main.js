'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';


import App from './component/app';
import CommentForm from '/Users/jamesrbillard/programs/code_fellows/code_401/final/responsible-consumption-frontend/src/component/forms/comment-form/index.js'
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

ReactDom.render(<CommentForm />, document.getElementById('root'));
