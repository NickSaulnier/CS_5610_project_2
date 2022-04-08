import React from 'react';

import CharacterContainer from './CharacterContainer';

import '../styles/GuessContainer.css'

const GuessContainer = props => {
    return (
    <div className="guess-container">
    {
        props.guess.split('').map((char, index) => ( 
            <CharacterContainer key={index} character={char} background={props.backgrounds[index]} />
        ))
    }
    </div>
    );
}

export default GuessContainer;