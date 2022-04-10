import { useContext } from 'react';

import { Difficulty, GameContext } from './Provider';
import { EASY_WORDS } from '../data/easyWordBank';
import { MEDIUM_WORDS } from '../data/mediumWordBank';
import { HARD_WORDS } from '../data/hardWordBank';

// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Source: https://javascript.plainenglish.io/react-context-patterns-with-usecontext-hook-62085b90c7eb
export default function useGameContext() {
    const [state, updateState] = useContext(GameContext);

    function updateDifficulty(difficulty) {
        const newState = {...state};
        switch (difficulty) {
            case Difficulty.EASY:
                newState.difficulty = Difficulty.EASY;
                break;
            case Difficulty.MEDIUM:
                newState.difficulty = Difficulty.MEDIUM;
                break;
            case Difficulty.HARD:
                newState.difficulty = Difficulty.HARD;
                break;
            default:
                // Take no action
        }
        updateState(newState);
    }

    function getNewWord() {
        const index = getRandomInt(10);    
        if (state.difficulty === Difficulty.EASY) {
            return EASY_WORDS[index];
        } else if (state.difficulty === Difficulty.MEDIUM) {
            return MEDIUM_WORDS[index];
        } else {
            return HARD_WORDS[index];
        }
    }

    function updateCurrentWord() {
        const newState = {...state};
        const newWord = getNewWord();
        newState.currentWord = newWord;
        updateState(newState);
    }

    return {
        ...state,
        updateDifficulty,
        updateCurrentWord,
    };
}