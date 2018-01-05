import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPitchers, fetchUsers } from '../reducers';
import AddToTeam from './AddToTeam';
import SinglePitcher from './SinglePitcher';
import DisplayTeam from './DisplayTeam';
import RemoveFromTeam from './RemoveFromTeam';

class AllPitchers extends Component {

    constructor() {
        super();
        this.state = {
            displayAttributes: false,
            displayPlayer: null
        }
    }

    componentDidMount() {
        this.props.loadPitchers();
        this.props.loadUsers();
    }

    render() {
        const pitchers = this.props.pitchers;

        return (
            <div className='display-players'>
                <h1 className='page-header'>Pitchers</h1>
                <div id='all-pitchers'>
                    {
                        this.props.isAllDisplayed || this.props.match.path.indexOf('team') > -1
                            ?
                            null
                            :
                            <DisplayTeam />
                    }
                    {
                        pitchers.map(pitcher => {
                            return (
                                <div key={pitcher.id} className='pitcher'>
                                    <h3>{pitcher.name}</h3>
                                    <button onClick={
                                        () => this.setState({
                                            displayAttributes: !this.state.displayAttributes,
                                            displayPlayer: pitcher.id
                                        })
                                    }> {
                                            this.state.displayAttributes && pitcher.id === this.state.displayPlayer
                                                ?
                                                <h3>See less</h3>
                                                :
                                                <h3>See all attributes</h3>
                                        }
                                    </button>
                                    <div>
                                        <ul className='attributes-list'>
                                            <li>Position: {pitcher.position}</li>
                                            <li>Control: {pitcher.control}</li>

                                            {
                                                this.state.displayAttributes && pitcher.id === this.state.displayPlayer
                                                    ?
                                                    <SinglePitcher playerId={this.state.displayPlayer} />
                                                    :
                                                    null
                                            }
                                        </ul>
                                        {
                                            this.state.displayAttributes && pitcher.id === this.state.displayPlayer
                                                ?
                                                null
                                                :
                                                <img src={pitcher.image} className='player-img' />
                                        }
                                    </div>
                                    {
                                        this.props.location.pathname.includes('team')
                                            ?
                                            <RemoveFromTeam userId={this.props.location.pathname.slice(6)} player={pitcher} playerId={pitcher.id} />
                                            :
                                            <AddToTeam users={this.props.users} playerId={pitcher.id} />
                                    } 
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
        pitchers: state.pitchers,
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadPitchers() {
            dispatch(fetchPitchers());
        },

        loadUsers() {
            dispatch(fetchUsers());
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllPitchers));