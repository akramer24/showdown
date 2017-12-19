const SET_AWAY_LINEUP = 'SET_AWAY_LINEUP';

export function setAwayLineup(lineup) {
    return {
        type: SET_AWAY_LINEUP,
        lineup
    }
}

export default function setAwayLineupReducer(state = [], action) {
    switch (action.type) {
        case SET_AWAY_LINEUP:
            return action.lineup;
        default:
            return state;
    }
}