import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPitchers, fetchUsers } from '../reducers';
import AddToTeam from './AddToTeam';

class AllPitchers extends Component {

    componentDidMount() {
        this.props.loadPitchers();
        this.props.loadUsers();
    }

    render() {
        const pitchers = this.props.pitchers;

        return (
            <div>
            <h1 className='page-header'>Pitchers</h1>
            <div id='all-pitchers'>
                {
                    pitchers.map(pitcher => {
                        return (
                            <div key={pitcher.id} className='pitcher'>
                                <h3>{pitcher.name}</h3>
                                <div>
                                    <ul>
                                        <li>Position: {pitcher.position}</li>
                                        <li>Control: {pitcher.control}</li>
                                    </ul>
                                </div>
                                <div>
                                    <img src={pitcher.image} />
                                </div>
                                <AddToTeam users={this.props.users} playerId={pitcher.id}/>
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