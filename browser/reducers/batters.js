import axios from 'axios';

const GET_BATTERS = 'GET_BATTERS';
const CREATE_BATTER = 'CREATE_BATTER';

export function getBatters(batters) {
    return {
        type: GET_BATTERS,
        batters
    }
}

export function createBatter(batter) {
    return {
        type: CREATE_BATTER,
        batter
    }
}

export function fetchBatters() {
    return function thunk(dispatch) {
        return axios.get('/api/batters')
                .then(res => res.data)
                .then(batters => dispatch(getBatters(batters)))
                .catch(err => console.error(err))
    }
}

export function fetchUserBatters(id) {
    return function thunk(dispatch) {
        return axios.get(`/api/users/${id}/batters`)
                .then(res => res.data)
                .then(batters => dispatch(getBatters(batters)))
                .catch(err => console.error(err))
    }
}


export default function battersReducer(state = [], action) {
    switch (action.type) {
        case GET_BATTERS:
            return action.batters;
        case CREATE_BATTER:
            return [...state, action.batter];
        default:
            return state;
    }
}