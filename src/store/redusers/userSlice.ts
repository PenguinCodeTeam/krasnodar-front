import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {notifyRequestCreator} from "../../api/notify";

interface ResUser {
    access_token: string
    name: string
    surname: string
    patronymic: string
    role: string
    id: string
}
interface UsersState {
    user: ResUser | null
    loading: boolean
    error: any,
    isAuth: boolean
}
const initialState: UsersState = {
    user: null,
    loading: false,
    error: null,
    isAuth: false
}

export const signIn = createAsyncThunk(
    'user/signIn',
    async (param: any) => {
        const response = await notifyRequestCreator(Object.assign({}, param, {
            url: param.url,
            method: 'post'
        }))
        return response.data
    }
)
export const signOut = createAsyncThunk(
    'user/signOut',
    async () => {
        const response = await notifyRequestCreator({
            url: '/auth/logout',
            method: 'get'
        })
        return response.data
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [signIn.pending.type]: (state) => {
            state.loading = true;
        },
        [signIn.fulfilled.type]: (state, action: PayloadAction<ResUser>) => {
            state.loading = false;
            state.error = null;
            state.user = action.payload
            state.isAuth = true
            localStorage.setItem('token', action.payload.access_token)
        },
        [signIn.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload || true;
        },
        [signOut.pending.type]: (state) => {
            state.loading = true;
        },
        [signOut.fulfilled.type]: (state) => {
            state.loading = false;
            state.error = null;
            state.isAuth = false;
            state.user = null;
            localStorage.removeItem('token')
        },
        [signOut.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export default userSlice.reducer;