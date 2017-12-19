import React from 'react';

const lineup = ['---', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

export default function BattingOrder() {
    return lineup.map(spot => {
        const idx = lineup.indexOf(spot);
        if (idx === 0) {
            return (
                <option hidden key='0'>{spot}</option>
            )
        } else if (idx >= 1 && idx <= 9) {
            return (
                <option key={idx}>{spot}</option>
            )
        } else if (idx >= 10 && idx <= 12) {
            return (
                <option key={idx}>Bench</option>
            )
        } else if (idx === 13) {
            return (
                <option key={idx} value={idx}>SP</option>
            )
        } else if (idx >= 14 && idx <= 16) {
            return (
                <option key={idx} value={idx}>RP</option>
            )
        }
    })
}
