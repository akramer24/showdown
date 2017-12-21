import React, { Component } from 'react';

export default class PlayerAttributes extends Component {

    constructor() {
        super();
        this.convertArray = this.convertArray.bind(this);
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
        if (this.props.batter) {
            const batter = this.props.batter;

            return (
                <div id='batter-game-attributes'>
                    <li>Strikeout: {this.convertArray(batter.SO)}</li>
                    <li>Groundout: {this.convertArray(batter.GB)}</li>
                    <li>Flyout: {this.convertArray(batter.FB)}</li>
                    <li>Walk: {this.convertArray(batter.BB)}</li>
                    <li>Single: {this.convertArray(batter.single)}</li>
                    <li>Single-Plus: {this.convertArray(batter.singlePlus)}</li>
                    <li>Double: {this.convertArray(batter.double)}</li>
                    <li>Triple: {this.convertArray(batter.triple)}</li>
                    <li>Home Run: {this.convertArray(batter.homeRun)}</li>
                </div>
            )
        } else {
            const pitcher = this.props.pitcher;

            return (
                <div id='pitcher-game-attributes'>
                    <li>Popout: {this.convertArray(pitcher.PU)}</li>
                    <li>Strikeout: {this.convertArray(pitcher.SO)}</li>
                    <li>Groundout: {this.convertArray(pitcher.GB)}</li>
                    <li>Flyout: {this.convertArray(pitcher.FB)}</li>
                    <li>Walk: {this.convertArray(pitcher.BB)}</li>
                    <li>Single: {this.convertArray(pitcher.single)}</li>
                    <li>Double: {this.convertArray(pitcher.double)}</li>
                    <li>Home Run: {this.convertArray(pitcher.homeRun)}</li>
                </div>
            )
        }

    }
}