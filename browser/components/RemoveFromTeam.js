import React, { Component } from 'react';
import axios from 'axios';
import store from '../store';
import { removeBatter, removePitcher } from '../reducers';

export default class RemoveFromTeam extends Component {

    deletePlayer(player) {
        if (this.props.isBatter) {
            axios.delete(`/api/users/remove-batter/user/${this.props.userId}/batter/${this.props.playerId}`)
                .then(() => store.dispatch(removeBatter(player)))
                .catch(console.error);
        } else {
            axios.delete(`/api/users/remove-pitcher/user/${this.props.userId}/pitcher/${this.props.playerId}`)
                .then(() => store.dispatch(removePitcher(player)))
                .catch(console.error);
        }
    }

    handleDelete(player) {
        this.deletePlayer(player);
    }

    render() {
        return (
            <button onClick={this.handleDelete.bind(this, this.props.player)}>Delete</button>
        )
    }
}