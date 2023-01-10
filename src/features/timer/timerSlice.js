import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    secondsLeft: 0.1 * 60,
    isOn: false,
    onBreak: false
}

const timerSlice = createSlice({
    name: "timer",
    initialState,
    reducers: {
        set(state, action){
            state.secondsLeft = action.payload
        },
        toggleTimer(state){
            state.isOn = !state.isOn
        },
        tick(state){
            state.secondsLeft = state.secondsLeft-1
        },
        toggleOnBreak(state){
            state.onBreak = !state.onBreak
        }
    }
})

export const {set, toggleTimer, tick, toggleOnBreak} = timerSlice.actions;
export default timerSlice.reducer;