import axios from 'axios';

const GET_PITCHER = 'GET_PITCHER';

export function getPitcher(pitcher) {
    return {
        type: GET_PITCHER,
        pitcher
    }
}

export function fetchPitcher(id) {
    return function thunk(dispatch) {
        return axios.get(`/api/pitchers/${id}`)
                .then(res => res.data)
                .then(pitcher => dispatch(getPitcher(pitcher)))
                .catch(console.error);
    }
}

export default function singlePitcherReducer(state = {}, action) {
    switch (action.type) {
        case GET_PITCHER: 
            return action.pitcher;
        default: 
            return state;
    }
}