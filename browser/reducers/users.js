import axios from 'axios';

const GET_USERS = 'GET_USERS';

export function getUsers(users) {
    return {
        type: GET_USERS,
        users
    }
}

export function fetchUsers() {
    return function thunk(dispatch) {
        return axios.get('/api/users')
                .then(res => res.data)
                .then(users => dispatch(getUsers(users)))
                .catch(console.error);
    }
}

export default function usersReducer(state = [], action) {
    switch (action.type) {
        case GET_USERS:
            return action.users;
        default:
            return state;
    }
}