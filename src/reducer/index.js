'use strict';

import {combineReducers} from 'redux';

import auth from './auth.js';
import expReview from './exp-review.js'
import userProfile from './profile.js'

export default combineReducers({
   auth,
   expReview,
   userProfile,
});
