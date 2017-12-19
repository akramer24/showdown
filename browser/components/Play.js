import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Play extends Component {

    constructor() {
        super();
        this.state = {
            turn: '',
            result: '',
            half: 'top',
            inning: 1,
            outs: 0,
            awayOrder: [],
            homeOrder: [],
            awayPitcher: {},
            homePitcher: {},
            batter: {},
            pitcher: {},
            first: '',
            second: '',
            third: ''
        }
    }

    componentDidMount() {
        this.setState(
            {
                awayOrder: this.props.awayLineup.slice(0, 9),
                homeOrder: this.props.homeLineup.slice(0, 9),
                awayPitcher: this.props.awayLineup[12],
                homePitcher: this.props.homeLineup[12],
                batter: this.props.awayLineup.slice(0, 9)[0],
                pitcher: this.props.awayLineup[12]
            }
        )
    }

    handleRoll() {
        const roll = Math.ceil(Math.random() * 20);
        const onBase = this.state.batter.onBase;
        const control = this.state.pitcher.control;

        if (roll + control > onBase) {
            this.setState({ turn: 'pitcher' })
        } else {
            this.setState({ turn: 'batter' })
        }
    }

    handlePitch() {
        const roll = Math.ceil(Math.random() * 20);
        let roller = {};

        if (this.state.turn == 'pitcher') {
            roller = this.state.pitcher;
        } else {
            roller = this.state.batter;
        }

        const outs = ['PU', 'SO', 'GB', 'FB'];
        const notOuts = ['BB', 'single', 'singlePlus', 'double', 'triple', 'homeRun'];
        let order = [];

        if (this.state.half == 'top') {
            order = this.state.awayOrder;
        } else {
            order = this.state.homeOrder;
        }

        const newOrder = order.slice(1).concat(order.slice(0, 1))
        
        for (let key in roller) {
            if (outs.includes(key) && roller[key] !== null && roller[key].includes(roll)) {
                console.log('out: ', key)
                this.setState({
                    result: key,
                    outs: this.state.outs + 1,
                    batter: this.state.awayOrder[1],
                    awayOrder: newOrder

                });
                return;
            } else if (notOuts.includes(key) && roller[key] !== null && roller[key].includes(roll)) {
                console.log('reached by: ', key)
                this.setState({
                    result: key,
                    batter: this.state.awayOrder[1],
                    awayOrder: newOrder
                });
                return;
            }
        }
    }

    render() {

        return (
            <div>
                <div>
                    <h3>Batter: {this.state.batter.name}</h3>
                </div>
                <div>
                    <h3>Pitcher: {this.state.pitcher && this.state.pitcher.name}</h3>
                </div>
                <div>
                    <button onClick={this.handleRoll.bind(this)}>Roll for turn</button>
                    <h4>Turn: {this.state.turn}</h4>
                    <button onClick={this.handlePitch.bind(this)}>Pitch</button>
                </div>
                <div>
                    <h3>Outs: {this.state.outs}</h3>
                </div>
                <div>
                    <h3>First: </h3>
                </div>
                <div>
                    <h3>Second: </h3>
                </div>
                <div>
                    <h3>Third: </h3>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        awayLineup: state.awayLineup,
        homeLineup: state.homeLineup
    }
}

export default withRouter(connect(mapStateToProps)(Play));