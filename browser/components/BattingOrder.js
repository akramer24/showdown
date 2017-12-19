import React from 'react';

const lineup = ['---', 1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function BattingOrder() {
    return lineup.map(spot => {
        if (lineup.indexOf(spot) === 0) {
            return (
                <option hidden key='0'>{spot}</option>
            )
        } else {
            return (
                <option key={lineup.indexOf(spot)}>{spot}</option>
            )
        }
    })
}
