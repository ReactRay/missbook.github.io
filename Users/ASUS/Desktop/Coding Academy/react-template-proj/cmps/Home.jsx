const { useState, useEffect, useRef } = React;
import { utilService } from '../services/util.service.js';

import {  AnimalList } from './AnimalList.jsx';
import {  SeasonClock } from './SeasonClock.jsx';
import CountDown from './CountDown.jsx';
import {  Watcher } from './Watcher.jsx';
import {  MouseMonitor } from './MouseMonitor.jsx';

const animalInfos = [ 
    {type: 'Malayan Tiger', count: 787},
    {type: 'Mountain Gorilla', count: 212},
    {type: 'Fin Whale', count: 28},
];

export function Home() {
    const counterRef = useRef();

    return (
        <section className="home">
            <AnimalList animalInfos={animalInfos}/>
            <SeasonClock/>
            <CountDown 
                ref={counterRef} 
                toTime={Date.now() + 1000*10}
                startFrom={9} 
                onDone={() => {
                    console.log('done counting');
                    utilService.animateCSS(counterRef.current)
                    .then(() => console.log('Animation completed'));
                }}
            />
            <Watcher/>
            <MouseMonitor/>
        </section>
    );
};

