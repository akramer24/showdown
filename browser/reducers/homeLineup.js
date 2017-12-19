const SET_HOME_LINEUP = 'SET_HOME_LINEUP';

export function setHomeLineup(lineup) {
    return {
        type: SET_HOME_LINEUP,
        lineup
    }
}

export default function setHomeLineupReducer(state = [], action) {
    switch (action.type) {
        case SET_HOME_LINEUP:
            return action.lineup;
        default:
            return state;
    }
}