import React, {memo, useMemo} from "react";
import MapComponent from "./MapComponent";
import ListTasksComponent from "./ListTasksComponent";
import useResize from "../hooks/useResize";

const ViewTasks: React.FunctionComponent = () => {
    const size: any[] = useResize();
    const isMobile: any = useMemo(()=> {
        if (size[0] >= 900) return false
        else if (size[0] < 900) return true
    }, [size])
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