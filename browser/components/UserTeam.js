import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserBatters, fetchUserPitchers, fetchUser } from '../reducers';
import AllBatters from './AllBatters';
import AllPitchers from './AllPitchers';
import AllPlayers from './AllPlayers';
import DisplayTeam from './DisplayTeam';

class UserTeam extends Component {
    componentDidMount() {
        const id = this.props.match.params.userId;
        this.props.loadUserBatters(id);
        this.props.loadUserPitchers(id);
        this.props.loadUser(id);
    }

    render() {
        return (
            <div className='display-players'>
                <div className='team-page-name'>
                    <h1>{this.props.singleUser.teamName}</h1>
                </div>
                <div>
                    <AllPlayers />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        batters: state.batters,
        pitchers: state.pitchers,
        singleUser: state.singleUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserBatters(id) {
            dispatch(fetchUserBatters(id));
        },
        loadUserPitchers(id) {
            dispatch(fetchUserPitchers(id));
        },
        loadUser(id) {
            dispatch(fetchUser(id));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserTeam));