import HomePage from "../../pages/HomePage";
import {HOME_PATH, LOGIN_PATH} from "./path";
import LoginPage from "../../pages/LoginPage";

export const publicRoutes = [
    {
        path: LOGIN_PATH,
        Component: LoginPage,
    },
]
export const authRoutes = [
    {
        path: HOME_PATH,
        Component: HomePage,
    },
]