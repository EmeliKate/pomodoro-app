import styles from "./Controls.module.scss";
import {Button, Space} from "antd";
import {useSelector} from "react-redux";

const Controls = ({onPlay, onReset, onSettings}) =>{

    const {isOn} = useSelector( (store) => store.timer)

    return <Space>
        <Button onClick={onPlay}>{isOn?"Pause":"Play"}</Button>
        <Button onClick={onReset}>Reset</Button>
        <Button onClick={onSettings}>Settings</Button>
    </Space>
}

export default Controls;