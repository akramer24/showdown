import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsers, fetchUser, fetchUserBatters, fetchUserPitchers } from '../reducers';

class PickTeams extends Component {
    constructor() {
        super();
        this.state = {
            userId: null
        }
    }

    componentDidMount() {
        this.props.loadUsers();
    }

    handleSelectUser(event) {
        this.setState({ userId: event.target.value });
    }

    handleSelect(id) {
        this.props.loadUser(id);
        this.props.loadUserBatters(id);
        this.props.loadUserPitchers(id);
    }

    render() {
        return (
            <div>
                <select onChange={this.handleSelectUser.bind(this)}>
                    <option defaultValue defaultChecked hidden>Select team</option>
                    {
                        this.props.users.map(user => {
                            return (
                                <option key={user.id} value={user.id}>{user.teamName}</option>
                            )
                        })
                    }
                </select>
                <NavLink to={`/team/${this.state.userId}`}>
                    <button onClick={this.handleSelect.bind(this, this.state.userId)}>Select</button>
                </NavLink>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadUsers() {
            dispatch(fetchUsers());
        },
        loadUser(id) {
            dispatch(fetchUser(id));
        },
        loadUserBatters(id) {
            dispatch(fetchUserBatters(id));
        },
        loadUserPitchers(id) {
            dispatch(fetchUserPitchers(id));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PickTeams));