import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import AllBatters from './AllBatters';
import SingleBatter from './SingleBatter';
import AllPitchers from './AllPitchers';
import SinglePitcher from './SinglePitcher';
import AllPlayers from './AllPlayers';

export default function Main() {
    return (
        <Router>
            <div>
            <Navbar />
                <Switch>
                    <Route exact path='/players' component={AllPlayers} />
                    <Route exact path='/players/batters' component={AllBatters} />
                    <Route path='/players/batters/:batterId' component={SingleBatter} />
                    <Route exact path='/players/pitchers' component={AllPitchers} />
                    <Route  path='/players/pitchers/:pitcherId' component={SinglePitcher} />
                </Switch>
            </div>
        </Router>
    )
}

