import React, { Component } from 'react';
import axios from 'axios';

export default class AddToTeam extends Component {
    constructor() {
        super();

        this.state = {
            selectedUserTeam: ''        
        }
    }
    
    handleSelectUser(event) {
        this.setState({ selectedUserTeam: event.target.value })
    }

    handleAdd() {
        if (this.props.isBatter) {
            axios.post('/api/users/add-batter', {
                userTeam: this.state.selectedUserTeam,
                batterId: this.props.playerId
            })
        } else {
            axios.post('/api/users/add-pitcher', {
                userTeam: this.state.selectedUserTeam,
                pitcherId: this.props.playerId
            })
        }
    }
    
    render() {
        return (
            <div>
                <select onChange={this.handleSelectUser.bind(this)}>
                    <option defaultValue defaultChecked hidden>Select your team</option>
                    {
                        this.props.users.map(user => {
                            return (
                                <option key={user.id}>{user.teamName}</option>
                            )
                        })
                    }
                </select>
                <button onClick={this.handleAdd.bind(this)}>Add player</button>
            </div>
        )
    }
}
