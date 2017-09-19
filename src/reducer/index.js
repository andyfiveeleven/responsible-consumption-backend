'use strict';

import {combineReducers} from 'redux';

import auth from './auth.js';
import expReview from './exp-review.js'

export default combineReducers({
   auth,
   expReview,
});
