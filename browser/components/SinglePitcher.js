import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPitcher, fetchUsers } from '../reducers';
import AddToTeam from './AddToTeam';

class SinglePitcher extends Component {
    constructor() {
        super();
        this.convertArray = this.convertArray.bind(this);
    }

    componentDidMount() {
        this.props.loadPitcher(this.props.match.params.pitcherId);
        this.props.loadUsers();
    }

    convertArray(arr) {
        if (!arr) {
            return '-';
        } else if (arr.length === 1 && arr[0] !== 0) {
            return arr.join('');
        } else if (arr[0] === 0) {
            return '-';
        } else {
            return arr[0] + '-' + arr[arr.length - 1];
        }
    }

    render() {
        const pitcher = this.props.singlePitcher;

        return (
            <div>
                <div>
                    <h1>{pitcher.name}</h1>
                    <ul>
                        <li>Position: {pitcher.position}</li>
                        <li>Control: {pitcher.control}</li>
                        <li>Pop-out: {this.convertArray(pitcher.PU)}</li>
                        <li>Strikeout: {this.convertArray(pitcher.SO)}</li>
                        <li>Groundout: {this.convertArray(pitcher.GB)}</li>
                        <li>Flyout: {this.convertArray(pitcher.FB)}</li>
                        <li>Walk: {this.convertArray(pitcher.BB)}</li>
                        <li>Single: {this.convertArray(pitcher.single)}</li>
                        <li>Double: {this.convertArray(pitcher.double)}</li>
                        <li>Home Run: {this.convertArray(pitcher.homeRun)}</li>
                    </ul>
                </div>
                <div>
                    <img src={pitcher.image}/>
                </div>
                <AddToTeam users={this.props.users} playerId={pitcher.id} />
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        singlePitcher: state.singlePitcher,
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadPitcher(id) {
            dispatch(fetchPitcher(id));
        },
        
        loadUsers() {
            dispatch(fetchUsers());
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SinglePitcher));