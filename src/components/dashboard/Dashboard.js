import styles from "./Dashboard.module.scss";
import Clock from "../clock/Clock";
import Controls from "../controls/Controls";
import {useSelector, useDispatch} from "react-redux";
import {set, toggleTimer} from "../../features/timer/timerSlice";
import {toggleSettings} from "../../features/settings/settingsSlice";
import {Layout} from "antd";

const formatTime = (seconds) => {
    const minutesLeft = Math.floor(seconds/60).toString().padStart(2, "0");
    const secondsLeft = Math.floor(seconds%60).toString().padStart(2, "0");
    return [minutesLeft, secondsLeft].join(":")
}
const Dashboard = () => {

    const {secondsLeft} = useSelector( (store) => store.timer)
    const {onBreak} = useSelector((store) => store.timer)
    const {defaultTime} = useSelector((store) => store.settings)
    const {appTheme} = useSelector( (store) => store.settings)
    const dispatch = useDispatch()

    return <Layout
        className={styles.dashboard}
        style={{color: appTheme.colorTextHeading}}
    >
        {onBreak ? "BREAK" : "Study time!"}
        <Clock time={formatTime(secondsLeft)}/>
        <Controls
           onReset={ () => dispatch(set(defaultTime))}
           onSettings={ () => dispatch(toggleSettings())}
           onPlay={ () => dispatch(toggleTimer())}
        />
    </Layout>
}

export default Dashboard;