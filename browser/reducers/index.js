import { combineReducers } from 'redux';
import batters from './batters';
import singleBatter from './singleBatter';
import pitchers from './pitchers';
import singlePitcher from './singlePitcher';
import users from './users';
import singleUser from './singleUser';
import awayTeam from './awayTeam';
import homeTeam from './homeTeam';
import awayLineup from './awayLineup';
import homeLineup from './homeLineup';

const reducer = combineReducers({
    batters,
    singleBatter,
    pitchers,
    singlePitcher,
    users,
    singleUser,
    awayTeam,
    homeTeam,
    awayLineup,
    homeLineup
});

export default reducer;

export * from './batters';
export * from './singleBatter';
export * from './pitchers';
export * from './singlePitcher';
export * from './users';
export * from './singleUser';
export * from './awayTeam';
export * from './homeTeam';
export * from './awayLineup';
export * from './homeLineup';