import React from 'react';

import '../styles/CharacterContainer.css'

const CharacterContainer = props => {
    return (
        <div className={'character-container ' + props.background}>{props.character}</div>
    );
}

export default CharacterContainer;