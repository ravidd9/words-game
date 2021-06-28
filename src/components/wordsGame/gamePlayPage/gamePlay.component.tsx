import React, { useState, useEffect } from 'react';
import { gamePages } from '../wordsGame.component';
import { words } from '../../../assets/words';
import './gamePlayPage.style.css';

export type Props = {
    changePage: (page: gamePages) => void;
    score: number;
    setScore: (score: number) => void;
};


export function GamePlayPageComponent(props: Props) {
    const [word, setWord] = useState<string>('');
    const [hiddenWord, setHiddenWord] = useState<string>('');
    const [lives, setLives] = useState<number>(3);
    const [level, setLevel] = useState<number>(1);
    const [guess, setGuess] = useState<string>('');
    const [guessMsg, setGuessMsg] = useState<string>('');

    useEffect(() => {
        const randomWord = generateWord();
        const hiddenWord = hideWord(randomWord);
        setWord(randomWord);
        setHiddenWord(hiddenWord);
    }, [word]);

    const hideWord = (word: string) => {
        const numLettersToShow = 2;
        const positionsToHide = getRandomPositionsToHide((word.length - numLettersToShow), word.length);
        let hiddenWord = Array.from(word).map((char, index) => {
            if (positionsToHide.some(pos => pos === index)) {
                return '_';
            } else {
                return char;
            }
        })
        return hiddenWord.toString().replaceAll(',', ' ');
    }




    const getRandomPositionsToHide = (quantity: number, max: number) => {
        const set = new Set()
        while (set.size < quantity) {
            set.add(Math.floor(Math.random() * max))
        }
        return Array.from(set);
    }

    const generateWord = () => {
        const randomWord = words[level - 1][Math.floor(Math.random() * words[level - 1].length)];
        return randomWord;
    }

    const levelUp = () => {
        props.setScore(props.score + 100);
        if (level < 5) { setLevel(level + 1); }
        const randomWord = generateWord();
        const hiddenWord = hideWord(randomWord);
        setGuess('');
        setWord(randomWord);
        setHiddenWord(hiddenWord);
        setLives(3);
        setGuessMsg('Level Up !!!')
    }

    const checkGuess = () => {
        if (guess.toLowerCase() === word.toLowerCase()) {
            setGuessMsg('Good Guess!');
            levelUp();
        } else if (lives === 1) {
            props.changePage(gamePages.GAMEOVER);
        } else {
            setLives(lives - 1);
            setGuessMsg('Bad Guess');
            setGuess('');
        }
    }

    const inputKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") { checkGuess(); }
    }


    return (
        <div className="gamePlayPageContainer">
            <div className="levelMsg">Level {level} &nbsp; - &nbsp; Score: {props.score} &nbsp; - &nbsp; {lives} x ❤️</div>
            <div className="instruction">Guess the word</div>
            <div className="wordToGuess">{hiddenWord}</div>
            <input className="guessInput" type="text" 
                value={guess}
                onChange={(e) => setGuess(e.target.value)}  
                onKeyPress={(e) => inputKeyPress(e)} />
            <div className="checkGuessBtn" onClick={checkGuess}>Check The Guess</div>
            <div className="guessMsg">{guessMsg}</div>
            <div className="backToIntroBtn" onClick={() => props.changePage(gamePages.INTRO)}>Back To Intro</div>
        </div>
    );
}
