import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsers } from '../reducers';

class PickTeams extends Component {
    constructor() {
        super();
        this.state = {
            awayUserId: null,
            homeUserId: null
        }
    }

    componentDidMount() {
        this.props.loadUsers();
    }

    handleSelectAwayUser(event) {
        this.setState({ awayUserId: event.target.value });
    }

    handleSelectHomeUser(event) {
        this.setState({ homeUserId: event.target.value });
    }

    render() {
        return (
            <div>
                Away: <select onChange={this.handleSelectAwayUser.bind(this)}>
                    <option defaultValue defaultChecked hidden>Select team</option>
                    {
                        this.props.users.map(user => {
                            return (
                                <option key={user.id} value={user.id}>{user.teamName}</option>
                            )
                        })
                    }
                </select>

                <NavLink to='/play'><button>Play!</button></NavLink>

                Home: <select onChange={this.handleSelectHomeUser.bind(this)}>
                    <option defaultValue defaultChecked hidden>Select team</option>
                    {
                        this.props.users.map(user => {
                            return (
                                <option key={user.id} value={user.id}>{user.teamName}</option>
                            )
                        })
                    }
                </select>
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
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PickTeams));