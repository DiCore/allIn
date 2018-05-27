import { combineReducers } from 'redux';

import sample from './sample';
import profiles from './profiles';
import videos from './videos';

export default combineReducers({
  sample,
  profiles,
  videos
});
