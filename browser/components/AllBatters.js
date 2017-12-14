import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBatters, fetchUsers } from '../reducers';
import AddToTeam from './AddToTeam';

class AllBatters extends Component {

    constructor() {
        super();
        this.state = {
            isBatter: true
        }
    }

    componentDidMount() {
        this.props.loadBatters();
        this.props.loadUsers();
    }

    render() {
        const batters = this.props.batters;

        return (
            <div>
                <h1>Batters</h1>
                <div>
                    {
                        batters.map(batter => {
                            return (
                                <div key={batter.id}>
                                    <h3>{batter.name}</h3>
                                    <div>
                                        <ul>
                                            <li>Position: {batter.position}</li>
                                            <li>On-Base: {batter.onBase}</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <img src={batter.image} />
                                    </div>
                                    <AddToTeam users={this.props.users} playerId={batter.id} isBatter={this.state.isBatter}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        batters: state.batters,
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadBatters() {
            dispatch(fetchBatters());
        },

        loadUsers() {
            dispatch(fetchUsers())
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllBatters));