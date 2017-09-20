'use strict';

import {combineReducers} from 'redux';

import auth from './auth.js';
import expReviews from './exp-review.js'
import userProfile from './profile.js'

export default combineReducers({
   auth,
   expReviews,
   userProfile,
});
