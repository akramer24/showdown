import axios from 'axios';

const GET_BATTER = 'GET_BATTER';

export function getBatter(batter) {
    return {
        type: GET_BATTER,
        batter
    }
}

export function fetchBatter(id) {
    return function thunk(dispatch) {
        return axios.get(`/api/batters/${id}`)
                .then(res => res.data)
                .then(batter => dispatch(getBatter(batter)))
                .catch(console.error);
    }
}

export default function singleBatterReducer(state = {}, action) {
    switch (action.type) {
        case GET_BATTER:
            return action.batter;
        default: 
            return state;
    }
}