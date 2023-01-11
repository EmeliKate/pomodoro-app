import styles from "./Settings.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {Space, Dropdown, Button, Drawer, Switch} from "antd";
import themesData from "../../themes/themes.json"
import {toggleSettings, changeTheme, setDefaultTime, toggleSound, toggleMusic} from "../../features/settings/settingsSlice";
import music from "../../assets/sounds/lofi0.mp3"
import Sound from 'react-sound'
import {useEffect} from "react";

const themes = themesData.themes
const Settings = () => {
    console.log("SETTINGS")

    const {isOpen} = useSelector( (store) => store.settings)
    const {appTheme} = useSelector( (store) => store.settings)
    const {soundOn} = useSelector( (store) => store.settings)
    const {musicOn} = useSelector( (store) => store.settings)
    const dispatch = useDispatch()

    const onClose = () => {
        dispatch(toggleSettings())
    }

    useEffect( () => {
        localStorage.setItem("appTheme_colorText", appTheme.colorText)
        localStorage.setItem("appTheme_colorBgBase", appTheme.colorBgBase)
        localStorage.setItem("appTheme_colorPrimaryBg", appTheme.colorPrimaryBg)
        localStorage.setItem("appTheme_colorPrimaryText", appTheme.colorPrimaryText)
        localStorage.setItem("appTheme_colorFillSecondary", appTheme.colorFillSecondary)
        localStorage.setItem("appTheme_colorTextHeading", appTheme.colorTextHeading)
        localStorage.setItem("appTheme_colorBgLayout", appTheme.colorBgLayout)
        localStorage.setItem("soundOn", soundOn)
        localStorage.setItem("musicOn", musicOn)
        console.log("appTheme: " + appTheme.colorBgLayout)
        console.log("appThemeColor: " + appTheme.colorText)
        console.log("appThemeStorage: " + localStorage.getItem("appTheme"))
    }, [soundOn, appTheme, musicOn])

    const themeItems = themes.map((theme) => {
        const item = {
            key: theme.key,
            label: (
                <div onClick={ () => dispatch(changeTheme(theme))}>
                    {theme.key}
                </div>
            ),
            colorText: theme.colorText,
            colorBgBase: theme.colorBgBase,
            colorPrimaryBg: theme.colorPrimaryBg,
            colorFillSecondary: theme.colorFillSecondary,
            colorTextHeading: theme.colorTextHeading
        }
        return item;
    })

    const updateDefaultTime = (defaultTime) => {
        dispatch(setDefaultTime(defaultTime))
        localStorage.setItem("defaultTime", defaultTime)
       // localStorage.setItem("secondsLeft", secondsLeft)
    }

    const intervalItems = [
        {
            key: "50/10",
            label: (
                 <div onClick={ () => updateDefaultTime(intervalItems[0].workTime*60)}>
                     50/10
                 </div>
            ),
            workTime: 50
        },
        {
            key: "25/5",
            label: (
                <div onClick={ () => updateDefaultTime(intervalItems[1].workTime*60)}>
                    25/5
                </div>
            ),
            workTime: 25
        }
    ]

    return <Drawer
        className="settings"
        placement="right"
        open={isOpen}
        onClose={onClose}
        closable={false}
        mask={false}
    >
        <p>
            <Dropdown
                menu={{items: themeItems}}
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <Button className="dropdown-btn">
                            Themes
                        </Button>
                    </Space>
                </a>
            </Dropdown>
        </p>
        <p>
            <Dropdown
                menu={{items: intervalItems}}
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <Button className="dropdown-btn">
                            Interval
                        </Button>
                    </Space>
                </a>
            </Dropdown>
        </p>
        <p>
            <Button onClick={ () => dispatch(toggleSound())}>
                {soundOn ? "Sound on" : "Sound off"}
            </Button>
        </p>
        <p>
            <Button onClick={ () => dispatch(toggleMusic())}>
                {musicOn ? "Music on" : "Music off"}
            </Button>
        </p>
        <Sound
            url={music}
            playStatus={musicOn ? "PLAYING" : "STOPPED"}
            loop={true}
        />
    </Drawer>
}


export default Settings;