import React, { Component } from 'react';

export default class Sub extends Component {

    handleSub(sub) {
        const lineupIdx = this.props.lineup.indexOf(this.props.batter);
        const benchIdx = this.props.bench.indexOf(sub);
        this.props.lineup[lineupIdx] = sub;
        this.props.bench.splice(benchIdx, 1);
        console.log(this.props.lineup, this.props.bench)
    }

    render() {
        return (
            <div id='sub'>
                <h3>Bench</h3>
                {
                    this.props.bench.map(player => {
                        return <li key={player.id}>{player.name}, {player.position}
                            <button onClick={this.handleSub.bind(this, player)}>Insert</button>
                        </li>
                    })
                }
            </div>
        )
    }
}