import React, { useState, useEffect } from 'react';
import { IntroPageComponent } from './introPage/introPage.component';
import { GamePlayPageComponent } from './gamePlayPage/gamePlay.component';
import { GameOverPageComponent } from './gameOverPage/gameOverPage.component';
import './wordsGame.style.css';

export type Props = {

};

export enum gamePages {
    INTRO = 1,
    GAMEPLAY = 2,
    GAMEOVER = 3
}



export function WordsGameComponent(props: Props) {

    const [currentPage, setCurrentPage] = useState<gamePages>(gamePages.INTRO);
    // const [currentPage, setCurrentPage] = useState<gamePages>(gamePages.GAMEOVER);
    const [score, setScore] = useState<number>(0);


    const changePage = (page: gamePages) => setCurrentPage(page);

    return (
        <div className="wordsGameContainer">
            {currentPage === gamePages.INTRO 
                && <IntroPageComponent changePage={changePage}/>}
            {currentPage === gamePages.GAMEPLAY 
                && <GamePlayPageComponent changePage={changePage} score={score} setScore={setScore}/>}
            {currentPage === gamePages.GAMEOVER 
                && <GameOverPageComponent changePage={changePage} score={score} setScore={setScore}/>}
        </div>
    );
}
