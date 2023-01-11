import styles from "./Clock.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {tick} from "../../features/timer/timerSlice";
import {useEffect} from "react";
import {setDefaultTime} from "../../features/settings/settingsSlice";
import {toggleOnBreak, set} from "../../features/timer/timerSlice";
import pauseSound from "../../assets/sounds/pause.mp3"

const Clock = ({time}) => {

    const {isOn} = useSelector( (store) => store.timer)
    const {onBreak} = useSelector( (store) => store.timer)
    const {secondsLeft} = useSelector( (store) => store.timer)
    const {appTheme} = useSelector((store) => store.settings)
    const {defaultTime} = useSelector( (store) => store.settings)
    const {soundOn} = useSelector( (store) => store.settings)
    const dispatch = useDispatch()

    useEffect( () => {
        const secondsLeftToBeSet = localStorage.getItem("secondsLeft") ? parseInt(localStorage.getItem("secondsLeft")) : secondsLeft
        dispatch(set(secondsLeftToBeSet))
        const defaultTimeToBeSet = localStorage.getItem("defaultTime") ? parseInt(localStorage.getItem("defaultTime")) : defaultTime
        dispatch(setDefaultTime(defaultTimeToBeSet))
    }, [])

    useEffect( () => {
        const interval = setInterval(() => {
            if (isOn) {
                console.log("tick")
                if (secondsLeft<1){
                    if (soundOn){
                        const sound = new Audio(pauseSound)
                        sound.play()
                    }
                    if(!onBreak){
                        const timeToSet = defaultTime/5+1
                        dispatch(set(timeToSet))
                    } else {
                        const timeToSet = defaultTime+1
                        dispatch(set(timeToSet))
                    }
                    dispatch(toggleOnBreak())
                }
                dispatch(tick())
            }
            localStorage.setItem("secondsLeft", secondsLeft)
            localStorage.setItem("onBreak", onBreak)
        },1000);
        return () => {
            clearInterval(interval)
        }
    }, [isOn, secondsLeft])

    return <div
        className={styles.clock}
        style={{color: appTheme.colorTextHeading}}
    >{time}</div>
}

export default Clock;