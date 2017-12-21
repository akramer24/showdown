const SET_AWAY_TEAM_NAME = 'SET_AWAY_TEAM_NAME';

export function setAwayTeamName(name) {
    return {
        type: SET_AWAY_TEAM_NAME,
        name
    }
}

export default function setAwayTeamNameReducer(state = '', action) {
    switch (action.type) {
        case SET_AWAY_TEAM_NAME:
            return action.name;
        default:
            return state;
    }
}