import React, {useEffect} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {authEmployeeRoutes, authManagerRoutes, publicRoutes} from "./utils/routes";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {checkAuth} from "./store/redusers/userSlice";

const App: React.FunctionComponent = function () {
    const {isAuth, user} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(checkAuth())
    }, [])

    return (
        <>
            <BrowserRouter>
                <Switch>
                    {
                        (isAuth && user && user.role == 'employee') &&
                        authEmployeeRoutes.map(({path, Component}) => {
                            return <Route key={path} path={path} component={Component} exact />
                        })
                    }
                    {
                        (isAuth && user && user.role == 'manager') &&
                        authManagerRoutes.map(({path, Component}) => {
                            return <Route key={path} path={path} component={Component} exact />
                        })
                    }
                    {
                        publicRoutes.map(({path, Component}) => {
                            return <Route key={path} path={path} component={Component} exact />
                        })
                    }
                    <Redirect to='login'/>
                </Switch>
            </BrowserRouter>
            <ToastContainer />
        </>
    )
}


export default App
