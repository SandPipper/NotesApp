import { combineReducers } from 'redux';

import app from './services/Application/aids/reducer';
import notes from './services/Notes/aids/reducer';
import categories from './services/Categories/aids/reducer';

export default combineReducers({
  app,
  notes,
  categories,
});