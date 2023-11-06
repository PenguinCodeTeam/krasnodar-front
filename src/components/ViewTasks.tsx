import React, {memo} from "react";
import MapComponent from "./MapComponent";
import ListTasksComponent from "./ListTasksComponent";
import {useAppSelector} from "../hooks/redux";

const ViewTasks: React.FunctionComponent = () => {
    const {isMobile} = useAppSelector(state => state.userReducer)

    return (
        <>
            {
                !isMobile &&
                <div className={'ViewTasks'}>
                    <div className={'ListTasks'}>
                        <ListTasksComponent></ListTasksComponent>
                    </div>
                    <div className={'MapTasks'}>
                        <MapComponent></MapComponent>
                    </div>
                </div>
            }
            {
                isMobile &&
                <div className={'ViewTasks'}>
                    mobileVersion
                </div>
            }
        </>
    )
}

export default memo(ViewTasks)