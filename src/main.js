import './style/main.scss'

import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';


import App from './component/app';
import ExpReviewForm from './component/forms/exp-review-form';
import appStoreCreate from './lib/store-create.js';
import DashboardContainer from './component/dashboard-container'
import Navbar from './component/navbar'
import CommentForm from './component/forms/comment-form/index'
import './style/main.scss';

let store = appStoreCreate();

let AppContainer = () => {
  return(
    <Provider store={store}>
      <DashboardContainer />
    </Provider>
  )
};

ReactDom.render(<AppContainer/>,  document.getElementById('root'));
