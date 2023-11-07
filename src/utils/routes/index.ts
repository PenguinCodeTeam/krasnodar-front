import HomePage from "../../pages/HomePage";
import {ACCOUNT_PATH, EMPLOYEE_ID_PATH, EMPLOYEE_PATH, HOME_PATH, LOAD_INFO_PATH, LOGIN_PATH, TASKS_PATH} from "./path";
import LoginPage from "../../pages/LoginPage";
import LoadInfoPage from "../../pages/LoadInfoPage";
import TasksPage from "../../pages/TasksPage";
import EmployeePage from "../../pages/EmployeePage";
import AccountPage from "../../pages/AccountPage";

export const publicRoutes = [
    {
        path: LOGIN_PATH,
        Component: LoginPage,
    },
]
export const authEmployeeRoutes = [
    {
        path: HOME_PATH,
        Component: HomePage,
    },
    {
        path: ACCOUNT_PATH,
        Component: AccountPage,
    },
]
export const authManagerRoutes = [
    {
        path: LOAD_INFO_PATH,
        Component: LoadInfoPage,
    },
    {
        path: TASKS_PATH,
        Component: TasksPage,
    },
    {
        path: EMPLOYEE_PATH,
        Component: EmployeePage,
    },
    {
        path: ACCOUNT_PATH,
        Component: AccountPage,
    },
    {
        path: EMPLOYEE_ID_PATH,
        Component: HomePage,
    },
]