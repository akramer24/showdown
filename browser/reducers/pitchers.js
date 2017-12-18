import axios from 'axios';

const GET_PITCHERS = 'GET_PITCHERS';

export function getPitchers(pitchers) {
    return {
        type: GET_PITCHERS,
        pitchers
    }
}

export function fetchPitchers() {
    return function thunk(dispatch) {
        return axios.get('/api/pitchers')
            .then(res => res.data)
            .then(batters => dispatch(getPitchers(batters)))
            .catch(console.error);
    }
}

export function fetchUserPitchers(id) {
    return function thunk(dispatch) {
        return axios.get(`/api/users/${id}/pitchers`)
                .then(res => res.data)
                .then(pitchers => dispatch(getPitchers(pitchers)))
                .catch(err => console.error(err))
    }
}

export default function pitchersReducer(state = [], action) {
    switch (action.type) {
        case GET_PITCHERS:
            return action.pitchers;
        default:
            return state;
    }
}