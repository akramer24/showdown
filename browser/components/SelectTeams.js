import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsers } from '../reducers';

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
                    <button>Select</button>
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
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PickTeams));