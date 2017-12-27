import React from 'react';

export default function Sub(props) {
    return (
        <div id='sub'>
        {
            props.away.map(player => {
                return <li key={player.id}>{player.name}, {player.position}</li>
            })
        }
        </div>
    )
}