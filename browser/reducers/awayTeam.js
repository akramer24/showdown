const SET_AWAY_TEAM = 'SET_AWAY_TEAM';

export function setAwayTeam(userId) {
    return {
        type: SET_AWAY_TEAM,
        userId
    }
}

export default function setAwayTeamReducer(state = null, action) {
    switch (action.type) {
        case SET_AWAY_TEAM:
            return action.userId;
        default:
            return state;
    }
}