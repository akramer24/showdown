import { combineReducers } from 'redux';
import batters from './batters';
import singleBatter from './singleBatter';
import pitchers from './pitchers';
import singlePitcher from './singlePitcher';
import users from './users';
import singleUser from './singleUser';

const reducer = combineReducers({
    batters,
    singleBatter,
    pitchers,
    singlePitcher,
    users,
    singleUser
});

export default reducer;

export * from './batters';
export * from './singleBatter';
export * from './pitchers';
export * from './singlePitcher';
export * from './users';
export * from './singleUser';