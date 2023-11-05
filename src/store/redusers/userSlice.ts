import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {notifyRequestCreator} from "../../api/notify";
import axios from "axios";
import {ENTRY_POINT, ENTRY_POINT_V} from "../../constants";

interface IUser {
    id: number
    email: string
    name: string
    role: string
}
interface ResUser {
    accessToken: string
    refreshToken: string
    user: IUser
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
            url: '/logout',
            method: 'post'
        })
        return response.data
    }
)
export const checkAuth = createAsyncThunk(
    'user/checkAuth',
    async () => {
        const response = await axios.get(`${ENTRY_POINT}${ENTRY_POINT_V}/check_auth`, {withCredentials: true})
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
            localStorage.setItem('token', action.payload.accessToken)
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
        [checkAuth.pending.type]: (state) => {
            state.loading = true;
        },
        [checkAuth.fulfilled.type]: (state, action: PayloadAction<ResUser>) => {
            state.loading = false;
            state.error = null;
            state.user = action.payload
            state.isAuth = true
            localStorage.setItem('token', action.payload.accessToken)
        },
        [checkAuth.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export default userSlice.reducer;