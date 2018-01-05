import React from 'react';
import AllBatters from './AllBatters';
import AllPitchers from './AllPitchers';
import DisplayTeam from './DisplayTeam';

export default class AllPlayers extends React.Component {
    constructor() {
        super();
        this.state = {
            isAllDisplayed: true
        }
    }
    
    render() {
        return (
            <div className='display-players'>
                <DisplayTeam isAllDisplayed={this.state.isAllDisplayed}/>
                <AllBatters isAllDisplayed={this.state.isAllDisplayed}/>
                <AllPitchers isAllDisplayed={this.state.isAllDisplayed}/>
            </div>
        )
    }
}