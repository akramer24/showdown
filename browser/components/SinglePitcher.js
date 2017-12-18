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
        this.props.loadPitcher(this.props.playerId);
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

        if (pitcher.id === this.props.playerId) {

            return (
                <div>
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
                </div>
            )
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        singlePitcher: state.singlePitcher
        }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadPitcher(id) {
            dispatch(fetchPitcher(id));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SinglePitcher));