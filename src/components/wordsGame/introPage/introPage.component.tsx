import React, { useState, useEffect } from 'react';
import { gamePages } from '../wordsGame.component';
import './introPage.style.css';

export type Props = {
    changePage: (page: gamePages) => void;
};


export function IntroPageComponent(props: Props) {


    return (
        <div className="introPageContainer">
            <div className="introWelcome">Welcome to</div>
            <div className="introGameName">WORDS GAME</div>
            <div className="introWelcome">By Ravid Cohen</div>
            <div className="startGameButton" onClick={() => props.changePage(gamePages.GAMEPLAY)}>Start New Game</div>
        </div>
    );
}
