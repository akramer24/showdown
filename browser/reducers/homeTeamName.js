const SET_HOME_TEAM_NAME = 'SET_HOME_TEAM_NAME';

export function setHomeTeamName(name) {
    return {
        type: SET_HOME_TEAM_NAME,
        name
    }
}

export default function setHomeTeamNameReducer(state = '', action) {
    switch (action.type) {
        case SET_HOME_TEAM_NAME:
            return action.name;
        default:
            return state;
    }
}