import React, {useEffect, useMemo} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {authEmployeeRoutes, authManagerRoutes, publicRoutes} from "./utils/routes";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {changeSize, checkAuth, signIn} from "./store/redusers/userSlice";
import HomePage from "./pages/HomePage";
import useResize from "./hooks/useResize";

const App: React.FunctionComponent = function () {
    const {isAuth, user, isMobile} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    const size: any[] = useResize();
    useEffect(() => {
        dispatch(checkAuth())
    }, [])
    const mobile: any = useMemo(()=> {
        if (isMobile && size[0] >= 900) return false
        else if (!isMobile && size[0] < 900) return true
        return isMobile
    }, [size])
    useEffect(() => {
        dispatch(changeSize(mobile))
    }, [mobile])

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
