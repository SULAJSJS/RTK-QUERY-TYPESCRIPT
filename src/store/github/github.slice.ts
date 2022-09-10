import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const LS_FSV_KEY = 'rfk';

interface GithubState {
    favourites: string[]
}

const initialState: GithubState = {
    favourites: JSON.parse(localStorage.getItem(LS_FSV_KEY) ?? '[]')
}

export const githubSlice = createSlice({
    name: 'github',
    initialState,
    reducers: {
        addFavourite(state, action: PayloadAction<string>) {
            state.favourites.push(action.payload)
            localStorage.setItem(LS_FSV_KEY, JSON.stringify(state.favourites))
        },
        removeFavourite(state, action: PayloadAction<string>) {
            state.favourites = state.favourites.filter(f => f !== action.payload)
        }
    }
})

export const githubAction = githubSlice.actions
export const githubReducer = githubSlice.reducer