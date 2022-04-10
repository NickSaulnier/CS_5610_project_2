import React from 'react';

import CharacterContainer from './CharacterContainer';

import '../styles/App.css'
import '../styles/GuessContainer.css'

const GuessContainer = props => {
    return (
        <div className={props.class ? props.class + " margin-10" : "guess-container margin-10"}>
        {
            props.guess.toUpperCase().split('').map((char, index) => ( 
                <CharacterContainer key={index} character={char} background={props.backgrounds[index]} />
            ))
        }
        </div>
    );
}

export default GuessContainer;