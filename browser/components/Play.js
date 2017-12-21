import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Play extends Component {

    constructor() {
        super();
        this.state = {
            turn: '',
            roll: null,
            result: '',
            totalPAs: 0,
            half: 'top',
            inning: 1,
            outs: 0,
            awayOrder: [],
            homeOrder: [],
            currentOrder: [],
            awayPitcher: {},
            homePitcher: {},
            batter: {},
            pitcher: {},
            first: '',
            second: '',
            third: '',
            awayScore: 0,
            homeScore: 0,
            currentScore: 0
        }
    }

    componentDidMount() {
        this.setState(
            {
                awayOrder: this.props.awayLineup.slice(0, 9),
                homeOrder: this.props.homeLineup.slice(0, 9),
                currentOrder: this.props.awayLineup.slice(0, 9),
                awayPitcher: this.props.awayLineup[12],
                homePitcher: this.props.homeLineup[12],
                batter: this.props.awayLineup.slice(0, 9)[0],
                pitcher: this.props.homeLineup[12]
            }
        )
    }

    handleRoll() {
        const roll = Math.ceil(Math.random() * 20);
        const onBase = this.state.batter.onBase;
        const control = this.state.pitcher.control;

        if (roll + control > onBase) {
            this.setState({ 
                turn: 'pitcher',
                roll,
                result: '',
                totalPAs: this.state.totalPAs + 1
            })
        } else {
            this.setState({
                turn: 'batter',
                roll,
                result: '',
                totalPAs: this.state.totalPAs + 1                
            })
        }
    }

    handlePitch() {
        this.setState({
            turn: '',
            roll: '',
        });
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

        const prevBatter = this.state.currentOrder.slice(0, 1);
        const newOrder = this.state.currentOrder.slice(1).concat(prevBatter)

        for (let key in roller) {
            if (outs.includes(key) && roller[key] !== null && roller[key].includes(roll)) {
                console.log(this.state.batter.name + 'out: ', key)
                this.setState({
                    result: key,
                    outs: this.state.outs + 1,
                    batter: this.state.currentOrder[1],
                    currentOrder: newOrder

                });
                return;
            } else if (notOuts.includes(key) && roller[key] !== null && roller[key].includes(roll)) {
                if (key == 'BB' && !this.state.first && !this.state.second && !this.state.third) {
                    //bases empty walk
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        first: this.state.batter,
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder
                    });
                    return;
                } else if (key == 'BB' && this.state.first && !this.state.second && !this.state.third) {
                    //man on first walk
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        second: this.state.first,
                        first: this.state.batter,
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder
                    });
                    return;
                } else if (key == 'BB' && this.state.first && this.state.second && !this.state.third) {
                    //men on first and second walk
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        third: this.state.second,
                        second: this.state.first,
                        first: this.state.batter,
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder
                    });
                    return;
                } else if (key == 'BB' && this.state.first && this.state.second && this.state.third) {
                    //bases loaded walk
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        third: this.state.second,
                        second: this.state.first,
                        first: this.state.batter,
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder,
                        currentScore: this.state.currentScore + 1
                    });
                    return;
                } else if (key == 'BB' && !this.state.first && this.state.second && this.state.third) {
                    //men on second and third walk
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        first: this.state.batter,
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder
                    });
                    return;
                } else if (key == 'BB' && !this.state.first && this.state.second && !this.state.third) {
                    //man on second walk
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        first: this.state.batter,
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder
                    });
                    return;
                } else if (key == 'BB' && !this.state.first && !this.state.second && this.state.third) {
                    //man on third walk
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        first: this.state.batter,
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder
                    });
                    return;
                } else if (key == 'BB' && this.state.first && !this.state.second && this.state.third) {
                    //men on first and third walk
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        second: this.state.first,
                        first: this.state.batter,
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder
                    });
                    return;
                } else if (key == 'single' && !this.state.first && !this.state.second && !this.state.third) {
                    //bases empty single
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        first: this.state.batter,
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder
                    });
                    return;
                } else if ((key == 'single' || key == 'singlePlus') && this.state.first && !this.state.second && !this.state.third) {
                    //man on first single
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        second: this.state.first,
                        first: this.state.batter,
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder
                    });
                    return;
                } else if (key == 'single' && !this.state.first && this.state.second && !this.state.third) {
                    //man on second single
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        third: this.state.second,
                        second: '',
                        first: this.state.batter,
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder
                    });
                    return;
                } else if (key == 'single' && !this.state.first && !this.state.second && this.state.third) {
                    //man on third single
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        third: '',
                        first: this.state.batter,
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder,
                        currentScore: this.state.currentScore + 1
                    });
                    return;
                } else if ((key == 'single' || key == 'singlePlus') && this.state.first && this.state.second && !this.state.third) {
                    //men on first and second single
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        third: this.state.second,
                        second: this.state.first,
                        first: this.state.batter,
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder
                    });
                    return;
                } else if ((key == 'single' || key == 'singlePlus') && this.state.first && !this.state.second && this.state.third) {
                    //men on first and third single
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        third: '',
                        second: this.state.first,
                        first: this.state.batter,
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder,
                        currentScore: this.state.currentScore + 1
                    });
                    return;
                } else if (key == 'single' && !this.state.first && this.state.second && this.state.third) {
                    //men on second and third single
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        third: this.state.second,
                        second: '',
                        first: this.state.batter,
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder,
                        currentScore: this.state.currentScore + 1
                    });
                    return;
                } else if ((key == 'single' || key == 'singlePlus') && this.state.first && this.state.second && this.state.third) {
                    //bases loaded single
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        third: this.state.second,
                        second: this.state.first,
                        first: this.state.batter,
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder,
                        currentScore: this.state.currentScore + 1
                    });
                    return;
                } else if (key == 'singlePlus' && !this.state.first && !this.state.second && !this.state.third) {
                    //bases empty singlePlus
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        second: this.state.batter,
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder
                    });
                    return;
                } else if (key == 'singlePlus' && !this.state.first && this.state.second && !this.state.third) {
                    //man on second singlePlus
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        third: this.state.second,
                        second: this.state.batter,
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder
                    });
                    return;
                } else if (key == 'singlePlus' && !this.state.first && !this.state.second && this.state.third) {
                    //man on third singlePlus
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        second: this.state.batter,
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder,
                        currentScore: this.state.currentScore + 1
                    });
                    return;
                } else if (key == 'double' && !this.state.first && !this.state.second && !this.state.third) {
                    //bases empty double
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        second: this.state.batter,
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder
                    });
                    return;
                } else if (key == 'double' && this.state.first && !this.state.second && !this.state.third) {
                    //man on first double
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        third: this.state.first,
                        second: this.state.batter,
                        first: '',
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder
                    });
                    return;
                } else if (key == 'double' && !this.state.first && this.state.second && !this.state.third) {
                    //man on second double
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        second: this.state.batter,
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder,
                        currentScore: this.state.currentScore + 1
                    });
                    return;
                } else if (key == 'double' && !this.state.first && !this.state.second && this.state.third) {
                    //man on third double
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        third: '',
                        second: this.state.batter,
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder,
                        currentScore: this.state.currentScore + 1
                    });
                    return;
                } else if (key == 'double' && this.state.first && this.state.second && !this.state.third) {
                    //men on first and second double
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        third: this.state.first,
                        second: this.state.batter,
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder,
                        currentScore: this.state.currentScore + 1
                    });
                    return;
                } else if (key == 'double' && this.state.first && !this.state.second && this.state.third) {
                    //men on first and third double
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        third: this.state.first,
                        second: this.state.batter,
                        first: '',
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder,
                        currentScore: this.state.currentScore + 1
                    });
                    return;
                } else if (key == 'double' && !this.state.first && this.state.second && this.state.third) {
                    //men on second and third double
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        third: '',
                        second: this.state.batter,
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder,
                        currentScore: this.state.currentScore + 2
                    });
                    return;
                } else if (key == 'double' && this.state.first && this.state.second && this.state.third) {
                    //bases loaded double
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        third: this.state.first,
                        second: this.state.batter,
                        first: '',
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder,
                        currentScore: this.state.currentScore + 2
                    });
                    return;
                } else if (key == 'triple' && !this.state.first && !this.state.second && !this.state.third) {
                    //bases empty triple
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        third: this.state.batter,
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder
                    });
                    return;
                } else if (key == 'triple' && this.state.first && !this.state.second && !this.state.third) {
                    //man on first triple
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        third: this.state.batter,
                        first: '',
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder,
                        currentScore: this.state.currentScore + 1
                    });
                    return;
                } else if (key == 'triple' && !this.state.first && this.state.second && !this.state.third) {
                    //man on second triple
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        third: this.state.batter,
                        second: '',
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder,
                        currentScore: this.state.currentScore + 1
                    });
                    return;
                } else if (key == 'triple' && !this.state.first && !this.state.second && this.state.third) {
                    //man on third triple
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        third: this.state.batter,
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder,
                        currentScore: this.state.currentScore + 1
                    });
                    return;
                } else if (key == 'triple' && this.state.first && this.state.second && !this.state.third) {
                    //men on first and second triple
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        third: this.state.batter,
                        second: '',
                        first: '',
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder,
                        currentScore: this.state.currentScore + 2
                    });
                    return;
                } else if (key == 'triple' && this.state.first && !this.state.second && this.state.third) {
                    //men on first and third triple
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        third: this.state.batter,
                        first: '',
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder,
                        currentScore: this.state.currentScore + 2
                    });
                    return;
                } else if (key == 'triple' && !this.state.first && this.state.second && this.state.third) {
                    //men on second and third triple
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        third: this.state.batter,
                        second: '',
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder,
                        currentScore: this.state.currentScore + 2
                    });
                    return;
                } else if (key == 'triple' && this.state.first && this.state.second && this.state.third) {
                    //bases loaded triple
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        third: this.state.batter,
                        second: '',
                        first: '',
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder,
                        currentScore: this.state.currentScore + 3
                    });
                    return;
                } else if (key == 'homeRun' && !this.state.first && !this.state.second && !this.state.third) {
                    //bases empty homeRun
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder,
                        currentScore: this.state.currentScore + 1
                    });
                    return;
                } else if (key == 'homeRun' && this.state.first && !this.state.second && !this.state.third) {
                    //man on first homeRun
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        first: '',
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder,
                        currentScore: this.state.currentScore + 2
                    });
                    return;
                } else if (key == 'homeRun' && !this.state.first && this.state.second && !this.state.third) {
                    //man on second homeRun
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        second: '',
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder,
                        currentScore: this.state.currentScore + 2
                    });
                    return;
                } else if (key == 'homeRun' && !this.state.first && !this.state.second && this.state.third) {
                    //man on third homeRun
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        third: '',
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder,
                        currentScore: this.state.currentScore + 2
                    });
                    return;
                } else if (key == 'homeRun' && this.state.first && this.state.second && !this.state.third) {
                    //men on first and second homeRun
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        second: '',
                        first: '',
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder,
                        currentScore: this.state.currentScore + 3
                    });
                    return;
                } else if (key == 'homeRun' && this.state.first && !this.state.second && this.state.third) {
                    //men on first and third homeRun
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        third: '',
                        first: '',
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder,
                        currentScore: this.state.currentScore + 3
                    });
                    return;
                } else if (key == 'homeRun' && !this.state.first && this.state.second && this.state.third) {
                    //men on second and third homeRun
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        third: '',
                        second: '',
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder,
                        currentScore: this.state.currentScore + 3
                    });
                    return;
                } else if (key == 'homeRun' && this.state.first && this.state.second && this.state.third) {
                    //bases loaded homeRun
                    console.log(this.state.batter.name + 'reached by: ', key)
                    this.setState({
                        result: key,
                        third: '',
                        second: '',
                        first: '',
                        batter: this.state.currentOrder[1],
                        currentOrder: newOrder,
                        currentScore: this.state.currentScore + 4
                    });
                    return;
                }
            }
        }
    }

    handleNextInning() {
        const newInning = this.state.inning + 1;
        console.log('new half inning')

        if (this.state.half == 'top') {
            this.setState({
                awayOrder: this.state.currentOrder,
                result: '',
                totalPAs: 0,
                half: 'bottom',
                outs: 0,
                first: '',
                second: '',
                third: '',
                currentOrder: this.state.homeOrder,
                batter: this.state.homeOrder[0],
                pitcher: this.props.awayLineup[12],
                awayScore: this.state.currentScore,
                currentScore: this.state.homeScore
            })
        } else if (this.state.half == 'bottom') {
            this.setState({
                homeOrder: this.state.currentOrder,
                half: 'top',
                result: '',
                totalPAs: 0,
                outs: 0,
                inning: newInning,
                first: '',
                second: '',
                third: '',
                currentOrder: this.state.awayOrder,
                batter: this.state.awayOrder[0],
                pitcher: this.props.homeLineup[12],
                homeScore: this.state.currentScore,
                currentScore: this.state.awayScore
            })
        }
    }

    render() {
        if (this.state.inning >= 9 && this.state.half == 'bottom' && this.state.homeScore > this.state.awayScore) {
            return (
                <h1>Home wins!</h1>
            )
        } else if (this.state.inning >= 10 && this.state.half == 'top' && this.state.homeScore < this.state.awayScore) {
            return (
                <h1>Away wins!</h1>
            )
        } else {
            return (
                <div id='board'>
                    <div id='board-buttons'>
                        {
                            this.state.outs == 3
                                ?
                                <div>
                                    <button onClick={this.handleNextInning.bind(this)}>Next inning</button>
                                    <h4>Result: {this.state.result}</h4>
                                </div>
                                :
                                <div>
                                    {
                                        this.state.result || this.state.totalPAs === 0
                                            ?
                                            <button onClick={this.handleRoll.bind(this)}>Roll for turn</button>
                                            :
                                            <button onClick={this.handlePitch.bind(this)}>Pitch</button>
                                    }
                                    <h4>Pitcher Control: {this.state.pitcher.control}</h4>
                                    <h4>Batter On-Base: {this.state.batter.onBase}</h4>
                                    {
                                        this.state.roll
                                            ?
                                            <h4>Roll: {this.state.roll}</h4>
                                            :
                                            null
                                    }
                                    {
                                        this.state.turn
                                            ?
                                            <h4>Advantage: {this.state.turn}</h4>
                                            :
                                            null
                                    }
                                    {
                                        this.state.result
                                            ?
                                            <h4>Result: {this.state.result}</h4>
                                            :
                                            null
                                    }
                                </div>
                        }
                    </div>
                    <div id='diamond'>
                        <div id='home'>
                            <img src={this.state.batter.image} id='home-image'/>
                        </div>
                        <div id='mound'>
                            <img src={this.state.pitcher.image} id='mound-image'/>
                        </div>
                        <div id='first-base'>
                            <h3>{this.state.first.name}</h3>
                        </div>
                        <div id='second-base'>
                            <h3>{this.state.second.name}</h3>
                        </div>
                        <div id='third-base'>
                            <h3>{this.state.third.name}</h3>
                        </div>
                    </div>
                    <div id='scoreboard'>
                        <h1>Scoreboard</h1>
                        <h3>Away: {
                            this.state.half == 'top'
                                ?
                                this.state.currentScore
                                :
                                this.state.awayScore
                        }
                        </h3>
                        <h3>Home: {
                            this.state.half == 'bottom'
                                ?
                                this.state.currentScore
                                :
                                this.state.homeScore
                        }
                        </h3>
                        <h3>Inning: {this.state.half + ' ' + this.state.inning}</h3>
                        <h3>Outs: {this.state.outs}</h3>
                    </div>
                    <div>
                        <h3>Lineup</h3>
                        {
                            this.state.currentOrder.map((batter, idx) => {
                                if (idx === 0) {
                                    return <h4 key={batter.id}>At Bat: {batter.name}</h4>
                                } else if (idx === 1) {
                                    return <h4 key={batter.id}>On Deck: {batter.name}</h4>
                                } else {
                                    return <h4 key={batter.id}>{batter.name}</h4>
                                }
                            })
                        }
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        awayLineup: state.awayLineup,
        homeLineup: state.homeLineup
    }
}

export default withRouter(connect(mapStateToProps)(Play));