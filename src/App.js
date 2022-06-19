import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
    // define timer states with values 'Running', 'Stopped' and 'Ended'
    const timerStates = {
        running: 'Running',
        stopped: 'Stopped',
        ended: 'Ended',
    }

    // define timer intervals pomodoro and shortbreak as arrays
    const displayTime = (time) => {
        const minutes = Math.floor(time / 60)
        let seconds = time % 60
        seconds = seconds < 10 ? `0${seconds}` : seconds
        return `${minutes}:${seconds}`
    }

    const timerIntervals = {
        pomodoro: 25 * 60,
        shortBreak: 5 * 60,
    }

    // define timers object with object properties pomodoro and shortBreak
    //  each property object should have properties: 
    //  type, timeout, timerState, timeLeft, timeLeftDisplay and message
    const timers = {
        pomodoro: {
            type: 'pomodoro',
            timeout: 0,
            timerState: timerStates.stopped,
            timeLeft: timerIntervals.pomodoro,
            timeLeftDisplay: displayTime(timerIntervals.pomodoro),
            message: 'Time to Work!',
        },
        shortBreak: {
            type: 'shortBreak',
            timeout: 0,
            timerState: timerStates.stopped,
            timeLeft: timerIntervals.shortBreak,
            timeLeftDisplay: displayTime(timerIntervals.shortBreak),
            message: 'Time for Break!',
        }
    }

    // Call useState Hook to manage 'currentTimer' state
    const [currentTimer, setCurrentTimer] = useState(timers.pomodoro)

    // Call useEffect Hook to update currentTimer state as timer interval expires
    useEffect(() => {
        if (currentTimer.timerState !== timerStates.running) return

        const timer = setInterval(() => {
            setCurrentTimer(currTimer => ({
                ...currTimer,
                timeLeft: currTimer.timeLeft - 1,
                timeLeftDisplay: displayTime(currTimer.timeLeft - 1),
            }))
        }, 1000)

        return () => clearInterval(timer)
    })
    // define startTimer() function to start timer and update currentTimer state
    const startTimer = () => {
        setCurrentTimer(currTimer => ({
            ...currTimer,
            timerState: timerStates.running,
        }))
    }
    // define endTimer() function to end current timer and navigate to next timer
    const endTimer = () => {
        navigateToNextTimer();
        setCurrentTimer(currTimer => ({
            ...currTimer,
            timerState: timerStates.ended,
            timeLeft: currTimer.timeLeft,
            timeLeftDisplay: displayTime(currTimer.timeLeft)
        }))
        stopTimer()
    }
    // define navigateToTimer() function to update currentTimer state with given timer
    const navigateToTimer = (timer) => {
        setCurrentTimer(timer)
    }
    // define navigateToNextTimer() function to update currentTimer with next timer state
    const navigateToNextTimer = () => {
        if (currentTimer.type === timers.pomodoro.type)
            navigateToTimer(timers.shortBreak)
        else
            navigateToTimer(timers.pomodoro)
    }
    // define stopTimer() function to pause the current timer and update the currentTimer state
    const stopTimer = () => {
        setCurrentTimer(currTimer => ({
            ...currTimer,
            timerState: timerStates.stopped,
        }))
    }
    // DO NOT MODIFY THE BELOW CODE, ELSE THE TEST CASES WILL FAIL 
    return (
        <div>
            <header>Pomodoro</header>
            <div className="timer-box">
                <div className="timer-box-tabs">
                    <button
                        id="btn-pd-timer"
                        onClick={navigateToTimer.bind(null, timers.pomodoro.type)}
                        className={
                            currentTimer.type === timers.pomodoro.type
                                ? "btn--tab btn--active"
                                : "btn--tab"}>
                        Pomodoro
                    </button>
                    <button
                        id="btn-sb-timer"
                        onClick={navigateToTimer.bind(null, timers.shortBreak.type)}
                        className={
                            currentTimer.type === timers.shortBreak.type
                                ? "btn--tab btn--active"
                                : "btn--tab"}>
                        Short Break
                    </button>
                </div>
                <div id="timer">{currentTimer.timeLeftDisplay}</div>
                <div className="timer-controls">
                    {
                        currentTimer.timerState === timerStates.stopped
                            ? <button
                                className="btn btn--control"
                                onClick={startTimer}
                                id="btn-start-timer">
                                start
                            </button>
                            : <>
                                <button
                                    className="btn btn--control"
                                    onClick={stopTimer}
                                    id="btn-stop-timer">stop</button>
                                <button
                                    className="btn btn--control"
                                    onClick={endTimer}
                                    id="btn-end-timer">end</button>
                            </>
                    }
                </div>
            </div>
            <div className="message-container">
                <div id="message">{currentTimer.message}</div>
            </div>
        </div>
    )
}
export default App;