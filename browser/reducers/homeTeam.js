const SET_HOME_TEAM = 'SET_HOME_TEAM';

export function setHomeTeam(userId) {
    return {
        type: SET_HOME_TEAM,
        userId
    }
}

export default function setHomeTeamReducer(state = null, action) {
    switch (action.type) {
        case SET_HOME_TEAM:
            return action.userId;
        default:
            return state;
    }
}