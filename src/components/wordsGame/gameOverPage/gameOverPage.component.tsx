import React, { useState, useEffect } from 'react';
import { gamePages } from '../wordsGame.component';
import './gameOverPage.style.css';

export type Props = {
    changePage: (page: gamePages) => void;
    score: number;
    setScore: (score: number)=> void;
};


export function GameOverPageComponent(props: Props) {
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [formMsg, setFormMsg] = useState<string>('');


    const submitScore = () => {
        if (name.length < 2) { setFormMsg('Name must contain at least 2 chars'); }
        else if (phone.length != 10) { setFormMsg('Phone number must be 10 digits'); }
        else { setFormMsg('Score submitted'); }
    }

    const startNewGame = () => {
        props.setScore(0);
        props.changePage(gamePages.GAMEPLAY);
    }

    return (
        <div className="gameOverPageContainer">
            <div className="gameOverText">GAME OVER</div>
            <div className="gameOverScore">Your score is: {props.score}</div>
            <div className="submitScoreTitle">Submit Your Score</div>
            <div className="submitScoreForm">
                <div>Name</div>
                <input type="text" onChange={(e) => setName(e.target.value)} />
                <div>Phone Number</div>
                <input type="tel" onChange={(e) => setPhone(e.target.value)} />
                <div className="submitScoreBtn" onClick={() => submitScore()}>Submit</div>
            </div>
            <div className="formMsg">{formMsg}</div>
            <div className="newGameBtn" onClick={() => startNewGame() }>Start New Game</div>
            {/* <div className="leaderBoard">

            </div> */}
        </div>
    );
}
