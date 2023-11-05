import React from "react";
import AppMenu from "./AppMenu";
import AccountMenu from "./AccountMenu";
import {useAppSelector} from "../hooks/redux";

const StaticPage: React.FunctionComponent = ({children}) => {
    const {user} = useAppSelector(state => state.userReducer)
    return (
        <div className={"App"}>
            <div className={"TopPanel"}>
                {
                    (user && user.role == 'manager') &&
                    <div className={"MenuPanel"}>
                        <AppMenu></AppMenu>
                    </div>
                }
                <div className={"AccountPanel"}>
                    <AccountMenu></AccountMenu>
                </div>
            </div>
            <div className={"BodyPanel"}>
                {children}
            </div>
        </div>
    )
}

export default StaticPage