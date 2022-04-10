import React from 'react';

import { BACKGROUNDS } from './Game';
import GuessContainer from './GuessContainer';

import '../styles/Rules.css'

export default function Rules() {
    return(
        <div id="rules-container">
            <div id="header-container">
                <h1 className="header-margin">How to Play</h1>
            </div>
            <div id="content-container">
                <p className="content-text">Guess the word!<br/><br/>Easy mode: 5 letter words, 7 guesses.<br/>Medium mode: 6 letter words, 6 guesses.<br/>Hard mode: 7 letter words, 5 guesses.</p>
                <p className="content-text">After each guess, the color of the tiles will change to provide hints about the target word characters.</p>
                <hr className="horizontal-break" />
                <h2>Examples</h2>
                <GuessContainer class="rules-guess-container" guess="guess" 
                                backgrounds={[
                                    BACKGROUNDS.GREEN_BACKGROUND, 
                                    BACKGROUNDS.WHITE_BACKGROUND, 
                                    BACKGROUNDS.WHITE_BACKGROUND, 
                                    BACKGROUNDS.WHITE_BACKGROUND, 
                                    BACKGROUNDS.WHITE_BACKGROUND
                                ]}/>
                <p className="content-text">The letter <strong>G</strong> is in the correct position.</p>
                <br/>
                <GuessContainer class="rules-guess-container" guess="piggy" 
                                backgrounds={[
                                    BACKGROUNDS.WHITE_BACKGROUND, 
                                    BACKGROUNDS.YELLOW_BACKGROUND, 
                                    BACKGROUNDS.WHITE_BACKGROUND, 
                                    BACKGROUNDS.WHITE_BACKGROUND, 
                                    BACKGROUNDS.WHITE_BACKGROUND
                                ]}/>
                <p className="content-text">The letter <strong>I</strong> is in the word but in the wrong spot.</p>
                <br/>
                <GuessContainer class="rules-guess-container" guess="wrong" 
                                backgrounds={[
                                    BACKGROUNDS.WHITE_BACKGROUND, 
                                    BACKGROUNDS.WHITE_BACKGROUND, 
                                    BACKGROUNDS.WHITE_BACKGROUND, 
                                    BACKGROUNDS.GRAY_BACKGROUND, 
                                    BACKGROUNDS.WHITE_BACKGROUND
                                ]}/>
                <p className="content-text">The letter <strong>N</strong> is in not in the word in any spot.</p>
            </div>
        </div>
    );
}