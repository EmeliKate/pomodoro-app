import  {configureStore} from "@reduxjs/toolkit";
import timerSlice from "../features/timer/timerSlice"
import settingsSlice from "../features/settings/settingsSlice";

export const store = configureStore({
    reducer: {
        timer: timerSlice,
        settings: settingsSlice
    }
})