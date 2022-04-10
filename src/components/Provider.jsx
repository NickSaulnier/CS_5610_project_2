import React, { useState } from 'react';

export const Difficulty = {
    EASY: 0,
    MEDIUM: 1,
    HARD: 2
};

export const DefaultGameState = {
    difficulty: Difficulty.EASY,
    currentWord: '',
    currentGuesses: Array(7).fill('')
};

export function difficultyToGuesses(difficulty) {
    switch (difficulty) {
        case Difficulty.MEDIUM:
            return 6;
        case Difficulty.HARD:
            return 5;
        default:
            // Default to easy difficulty
            return 7;
    }
}

export function difficultyToWordLength(difficulty) {
    switch (difficulty) {
        case Difficulty.EASY:
            return 5;
        case Difficulty.MEDIUM:
            return 6;
        default:
            // Default to easy difficulty
            return 7;
    }
}

export const GameContext = React.createContext(DefaultGameState);

// Source: https://javascript.plainenglish.io/react-context-patterns-with-usecontext-hook-62085b90c7eb
const Provider = ({ children }) => {
    const [state, setState] = useState({...DefaultGameState});

    return (
        <GameContext.Provider value={[state, setState]}>
            {children}
        </GameContext.Provider>
    );
};

export default Provider;
