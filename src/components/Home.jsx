import React from 'react';
import { Link } from 'react-router-dom';

import useGameContext from './useGameContext';
import { Difficulty } from './Provider';

import '../styles/App.css'
import '../styles/Home.css'

export default function Home() {
    const { difficulty, updateDifficulty, updateCurrentWord } = useGameContext();

    function setNewDifficulty(newDifficulty, buttonId) {
        if (difficulty !== newDifficulty) {
            const buttonElement = document.getElementById(buttonId);
            buttonElement.classList.add("selected-button");

            let previousSelectedButton;
            switch(difficulty) {
                case Difficulty.EASY:
                    previousSelectedButton = document.getElementById("easy-button");
                    break;
                case Difficulty.MEDIUM:
                    previousSelectedButton = document.getElementById("medium-button");
                    break;
                default:
                    previousSelectedButton = document.getElementById("hard-button");
            }

            previousSelectedButton.classList.remove("selected-button");
            updateDifficulty(newDifficulty);
        }
    }

    function handleStartNewGame() {
        updateCurrentWord();
    }

    return(
        <div id="page-container">
            <h1 className="main-header">Wordle Clone</h1>
            <h4 className="sub-header">Difficulty</h4>
            <div className="difficulty-button-container">
                <button id="easy-button" 
                        className={difficulty === Difficulty.EASY ? "button selected-button" : "button"} 
                        onClick={() => setNewDifficulty(Difficulty.EASY, "easy-button")}>
                    Easy
                </button>
                <button id="medium-button" 
                        className={difficulty === Difficulty.MEDIUM ? "button selected-button" : "button"} 
                        onClick={() => setNewDifficulty(Difficulty.MEDIUM, "medium-button")}>
                    Medium
                </button>
                <button id="hard-button" 
                        className={difficulty === Difficulty.HARD ? "button selected-button" : "button"} 
                        onClick={() => setNewDifficulty(Difficulty.HARD, "hard-button")}>
                    Hard
                </button>
            </div>
            <div className="route-button-container">
                <Link to="/rules">
                    <button className="button route-button">Rules</button>
                </Link>
                <Link to={"/game?difficulty=" + difficulty.toString()}>
                    <button className="button route-button" onClick={handleStartNewGame}>Start New Game</button>
                </Link>
            </div>
        </div>
    );
}