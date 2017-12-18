import axios from 'axios';

const GET_USER = 'GET_USER';

export function getUser(user) {
    return {
        type: GET_USER,
        user
    }
}

export function fetchUser(id) {
    return function thunk(dispatch) {
        return axios.get(`/api/users/${id}`)
        .then(res => res.data)
        .then(user => dispatch(getUser(user)))
        .catch(console.error);
    }
}

export default function singleUserReducer(state = {}, action) {
    switch (action.type) {
        case GET_USER:
            return action.user;
        default:
            return state;
    }
}