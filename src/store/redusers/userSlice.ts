import {createAction, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
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
export const checkAuth = createAsyncThunk(
    'user/checkAuth',
    async () => {
        const response = await notifyRequestCreator(Object.assign({}, {
            url: `${localStorage.getItem('role')}/${localStorage.getItem('id')}`,
            method: 'get'
        }))
        return response.data
    }
)

export const signOut = createAction('user/signOutReducer')
export const updateUser = createAction('user/updateUserReducer')

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signOutReducer: (state) => {
            state.isAuth = false;
            state.user = null;
            localStorage.removeItem('token')
        },
        updateUserReducer: (state,action) => {
            state.user = action.payload
        }
    },
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
            localStorage.setItem('id', action.payload.id)
            localStorage.setItem('role', action.payload.role)
        },
        [signIn.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload || true;
        },
        [checkAuth.pending.type]: (state) => {
            state.loading = true;
        },
        [checkAuth.fulfilled.type]: (state, action: PayloadAction<ResUser>) => {
            state.loading = false;
            state.error = null;
            state.user = action.payload
            state.isAuth = true
        },
        [checkAuth.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export default userSlice.reducer;