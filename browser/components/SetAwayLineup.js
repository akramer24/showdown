import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserBatters, fetchUserPitchers, fetchUser, setAwayLineup, setAwayTeamName } from '../reducers';
import SelectLineup from './SelectLineup';
import store from '../store';

class SetLineups extends Component {
    constructor() {
        super();
        this.order = [];
    }

    componentDidMount() {
        const id = this.props.awayTeam;

        this.props.loadUserBatters(id)
        this.props.loadUserPitchers(id)
        this.props.loadUser(id)
    }

    handleChange(player, event) {
        this.order[event.target.value - 1] = player;
    }

    handleSubmit() {
        store.dispatch(setAwayLineup(this.order));
        store.dispatch(setAwayTeamName(this.props.singleUser.teamName));
    }

    render() {
        return (
            <div className='display-players'>
                <h1 className='set-lineup-team'>{this.props.singleUser.teamName}</h1>
                <div className='set-lineup-players'>
                    <div className='set-lineup-batters'>
                    <h3>Batters</h3>
                    {
                        this.props.batters.map(batter => {
                            return (
                                <div key={batter.id}>
                                    <h4 key={batter.id} onChange={this.handleChange.bind(this, batter)}>{batter.name}
                                        <span>&nbsp;
                                        <select >
                                                <SelectLineup />
                                            </select>
                                        </span>
                                    </h4>

                                </div>
                            )
                        })
                    }
                    </div>
                    <div className='set-lineup-pitchers'>
                    <h3>Pitchers</h3>
                    {
                        this.props.pitchers.map(pitcher => {
                            return (
                                <div key={pitcher.id}>
                                    <h4 key={pitcher.id} onChange={this.handleChange.bind(this, pitcher)}>{pitcher.name}
                                        <span>&nbsp;
                                    <select >
                                                <SelectLineup />
                                            </select>
                                        </span>
                                    </h4>

                                </div>
                            )
                        })
                    }
                    </div>
                </div>
                <NavLink to='/home-lineup'><button onClick={this.handleSubmit.bind(this)}>Submit</button></NavLink>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        awayTeam: state.awayTeam,
        homeTeam: state.homeTeam,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SetLineups));