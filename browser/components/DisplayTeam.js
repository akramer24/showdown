import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsers, fetchUserBatters, fetchUserPitchers } from '../reducers';
import SelectTeams from './SelectTeams';

class DisplayTeams extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         userId: null
    //     }
    // }

    // componentDidMount() {
    //     this.props.loadUsers();
    // }

    // handleSelectUser(event) {
    //     this.setState({ userId: event.target.value });
    //     // this.props.history.push(`/team/${id}`);
    // }

    render() {
        return (
            <div>
                <div id='display-players-page'>
                    <h3>View Teams</h3>
                    <SelectTeams />
                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DisplayTeams));