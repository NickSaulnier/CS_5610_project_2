import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';

import EndGameDialog from './EndGameDialog';
import GuessContainer from './GuessContainer';
import useGameContext from './useGameContext';
import { Difficulty, difficultyToGuesses, difficultyToWordLength } from './Provider';

import '../styles/App.css'
import '../styles/Game.css'

const AUTO_HIDE_DURATION = 3000;

function isValidDifficultyParam(difficultyParam) {
    if (!isNaN(difficultyParam) && difficultyParam >= Difficulty.EASY && difficultyParam <= Difficulty.HARD) {
        return true;
    }
    return false;
}

// Source: https://mui.com/components/snackbars/
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function getCurrentWordCharacterCounts(currentWord) {
    const counts = {};
    currentWord.split('').forEach(char => {
        if (char in counts) {
            counts[char] += 1; 
        } else {
            counts[char] = 1; 
        }
    });
    return counts;
}

export const BACKGROUNDS = {
    WHITE_BACKGROUND: 'white-background',
    GRAY_BACKGROUND: 'gray-background',
    YELLOW_BACKGROUND: 'yellow-background',
    GREEN_BACKGROUND: 'green-background'
};

export default function Game() {
    const { currentWord, difficulty, updateCurrentWord, updateDifficulty } = useGameContext();
    const [inputValue, setInputValue] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentGuesses, setCurrentGuesses] = useState(Array(difficultyToGuesses(difficulty)).fill(''));
    const [currentBackgrounds, setCurrentBackgrounds] = useState(
        Array(difficultyToGuesses(difficulty)).fill(Array(difficultyToWordLength(difficulty)).fill(BACKGROUNDS.WHITE_BACKGROUND))
    );
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [disableInput, setDisableInput] = useState(false);

    function handleInputChange(event) {
        const newInputValue = event.target.value;
        setInputValue(newInputValue);
        const newCurrentGuesses = [...currentGuesses];
        newCurrentGuesses[currentIndex] = newInputValue;
        setCurrentGuesses(newCurrentGuesses);
    }

    function checkForWin(colors) {
        return colors.every(color => color === BACKGROUNDS.GREEN_BACKGROUND);
    }

    function calculateGuessBackground() {
        const guessBackgrounds = [];
        const currentGuessCharacterCounts = {};
        const currentWordCharacterCounts = getCurrentWordCharacterCounts(currentWord);

        inputValue.split('').forEach((char, index) => {
            if (char in currentGuessCharacterCounts) {
                currentGuessCharacterCounts[char] += 1;
            } else {
                currentGuessCharacterCounts[char] = 1;
            }

            if (currentWord[index] === char) {
                guessBackgrounds.push(BACKGROUNDS.GREEN_BACKGROUND);
            } else if (
                currentWordCharacterCounts.hasOwnProperty(char) 
                && currentGuessCharacterCounts[char] <= currentWordCharacterCounts[char]) {
                guessBackgrounds.push(BACKGROUNDS.YELLOW_BACKGROUND);
            } else {
                guessBackgrounds.push(BACKGROUNDS.GRAY_BACKGROUND);
            }
        });

        const newCurrentBackgrounds = [...currentBackgrounds];
        newCurrentBackgrounds[currentIndex] = guessBackgrounds;
        setCurrentBackgrounds(newCurrentBackgrounds);

        if (checkForWin(newCurrentBackgrounds[currentIndex])) {
            // Open the congratulations dialog if the user wins
            setDisableInput(true);
            setDialogOpen(true);
        }
    }

    function handleSubmit() {
        if (inputValue.length !== difficultyToWordLength(difficulty)) {
            setSnackbarMessage("Error: Guesses must be " + difficultyToWordLength(difficulty) + " characters long");
            setSnackbarOpen(true);
        } else if (currentIndex < difficultyToGuesses(difficulty) - 1) {
            calculateGuessBackground();
            setCurrentIndex(currentIndex + 1);
            setInputValue("");
        } else {
            setInputValue("");
            setDisableInput(true);
        }
    }

    function handleSnackbarClose() {
        setSnackbarOpen(false);
    }

    function handleResetWord() {
        updateCurrentWord()
        setInputValue("");
        setCurrentIndex(0);
        setCurrentGuesses(Array(difficultyToGuesses(difficulty)).fill(''));
        setCurrentBackgrounds(
            Array(difficultyToGuesses(difficulty)).fill(Array(difficultyToWordLength(difficulty)).fill(BACKGROUNDS.WHITE_BACKGROUND))
        );
        setDisableInput(false);
    }

    function closeDialog() {
        setDialogOpen(false);
    }

    // Ensure that the set difficulty matches any valid difficulty params, and that
    // the current guesses array has the correct number of entries for the set
    // difficulty.
    useEffect(() => {
        const difficultyParam = Number(searchParams.get('difficulty'));
        if (difficultyParam !== difficulty && isValidDifficultyParam(difficultyParam)) {
            updateDifficulty(difficultyParam);
            setCurrentGuesses(Array(difficultyToGuesses(difficultyParam)).fill(''));
        }
    }, [difficulty, searchParams, updateDifficulty])

    // Ensure that the current word is valid for the set difficulty.
    useEffect(() => {
        if (currentWord.length !== difficultyToWordLength(difficulty)) {
            updateCurrentWord();
        }
    }, [difficulty, updateCurrentWord, currentWord.length])

    // For ease of verifying functionality, I've left this in.
    console.log(currentWord);

    return(
        <div id='game-container'>
            <div id='input-container'>
                <TextField label="Guess" value={inputValue} onChange={handleInputChange} disabled={disableInput}></TextField>
                <button className="button margin-left medium-button-font-size" onClick={handleSubmit} disabled={disableInput}>Submit</button>
            </div>
            {
                currentGuesses.map((guess, index) => (
                    <GuessContainer 
                        key={index}
                        guess={guess.substring(0, difficultyToWordLength(difficulty)).padEnd(difficultyToWordLength(difficulty), ' ')}
                        backgrounds={currentBackgrounds[index]}
                    />
                ))
            }
            <Snackbar open={snackbarOpen} 
                      autoHideDuration={AUTO_HIDE_DURATION} 
                      onClose={handleSnackbarClose} 
                      anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                <Alert severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <button className="button margin-10" onClick={handleResetWord}>Reset</button>
            <EndGameDialog open={dialogOpen} resetWord={handleResetWord} close={closeDialog}></EndGameDialog>
        </div>
    );
}