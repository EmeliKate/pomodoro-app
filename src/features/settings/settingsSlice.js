import { createSlice } from '@reduxjs/toolkit';
import themesData from "../../themes/themes.json"

const themes = themesData.themes

const initialState = {
    defaultTime: 0.1 * 60,
    isOpen: true,
    appTheme: {
        colorText: localStorage.getItem("appTheme_colorText") ? localStorage.getItem("appTheme_colorText") : themes[0].colorText,
        colorBgBase: localStorage.getItem("appTheme_colorBgBase") ? localStorage.getItem("appTheme_colorBgBase") :themes[0].colorBgBase,
        colorPrimaryBg: localStorage.getItem("appTheme_colorPrimaryBg") ? localStorage.getItem("appTheme_colorPrimaryBg") :themes[0].colorPrimaryBg,
        colorPrimaryText: localStorage.getItem("appTheme_colorPrimaryText") ? localStorage.getItem("appTheme_colorPrimaryText") :themes[0].colorPrimaryText,
        colorFillSecondary: localStorage.getItem("appTheme_colorFillSecondary") ? localStorage.getItem("appTheme_colorFillSecondary") :themes[0].colorFillSecondary,
        colorTextHeading: localStorage.getItem("appTheme_colorTextHeading") ? localStorage.getItem("appTheme_colorTextHeading") :themes[0].colorTextHeading,
        colorBgLayout: localStorage.getItem("appTheme_colorBgLayout") ? localStorage.getItem("appTheme_colorBgLayout") :themes[0].colorBgLayout
    },
    soundOn: localStorage.getItem("soundOn")==="true",
    musicOn: localStorage.getItem("musicOn")==="true"
}

const settingSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setDefaultTime(state, action){
            state.defaultTime = action.payload
        },
        toggleSettings(state){
            state.isOpen = !state.isOpen;
        },
        changeTheme(state, action){
            state.appTheme = action.payload
        },
        toggleSound(state){
            state.soundOn = !state.soundOn
        },
        toggleMusic(state){
            state.musicOn = !state.musicOn
        }
    }
})

export const {setDefaultTime, toggleSettings, changeTheme, toggleSound, toggleMusic} = settingSlice.actions;
export default settingSlice.reducer;