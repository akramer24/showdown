import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBatter, fetchUsers } from '../reducers';
import AddToTeam from './AddToTeam';

class SingleBatter extends Component {
    constructor() {
        super();
        this.convertArray = this.convertArray.bind(this);
    }

    componentDidMount() {
        this.props.loadBatter(this.props.match.params.batterId);
        this.props.loadUsers();
    }

    convertArray(arr) {
        if (!arr) {
            return '-';
        } else if (arr.length === 1) {
            return arr.join('');
        } else {
            return arr[0] + '-' + arr[arr.length - 1];
        }
    }

    render() {
        const batter = this.props.singleBatter;

        return (
            <div>
                <div>
                    <h1>{batter.name}</h1>
                    <ul>
                        <li>Position: {batter.position}</li>
                        <li>On-Base: {batter.onBase}</li>
                        <li>Strikeout: {this.convertArray(batter.SO)}</li>
                        <li>Groundout: {this.convertArray(batter.GB)}</li>
                        <li>Flyout: {this.convertArray(batter.FB)}</li>
                        <li>Walk: {this.convertArray(batter.BB)}</li>
                        <li>Single: {this.convertArray(batter.single)}</li>
                        <li>Single-Plus: {this.convertArray(batter.singlePlus)}</li>
                        <li>Double: {this.convertArray(batter.double)}</li>
                        <li>Triple: {this.convertArray(batter.triple)}</li>
                        <li>Home Run: {this.convertArray(batter.homeRun)}</li>
                    </ul>
                </div>
                <div>
                    <img src={batter.image}/>
                </div>
                <AddToTeam users={this.props.users} playerId={batter.id} />
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        singleBatter: state.singleBatter,
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadBatter(id) {
            dispatch(fetchBatter(id));
        },
        
        loadUsers() {
            dispatch(fetchUsers());
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleBatter));