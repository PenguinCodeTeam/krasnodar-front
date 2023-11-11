import React, {memo, useMemo} from "react";
import RoutMapComponent from "./RoutMapComponent";
import ListTasksComponent from "./ListTasksComponent";
import useResize from "../hooks/useResize";
import {Tabs, TabsProps} from "antd";
import {createGetRequestService} from "../services/createRequestService";
import {useHistory} from "react-router-dom";
import {useAppSelector} from "../hooks/redux";

const ViewTasks: React.FunctionComponent = () => {
    const size: any[] = useResize();
    const isMobile: any = useMemo(()=> {
        if (size[0] >= 900) return false
        else if (size[0] < 900) return true
    }, [size])

    const toDate = (date?:any)=>{
        const today = date || new Date();
        const yyyy = today.getFullYear();
        let mm: string | number = today.getMonth() + 1;
        let dd: string | number = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return  yyyy + '-' + mm + '-' + dd;
    }

    const {user} = useAppSelector(state => state.userReducer)

    const history = useHistory();
    const url = user?.role == 'manager' ? history.location.pathname.replace('/employee/', '') : user?.id

    const filterParam = {
        user_id: url,
        date: toDate()
    }
    const {data} = createGetRequestService({url: 'task/appointed', method: 'get', params: filterParam});

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Задачи',
            children: <ListTasksComponent data={data?.tasks}></ListTasksComponent>,
        },
        {
            key: '2',
            label: 'Карты',
            children: <div style={{width: '100vw', height: '100vh'}}>
                <RoutMapComponent data={data?.tasks}></RoutMapComponent>
            </div>
        },
    ];
    return (
        <>
            {
                !isMobile &&
                <div className={'ViewTasks'}>
                    <div className={'ListTasks'}>
                        <ListTasksComponent data={data?.tasks}></ListTasksComponent>
                    </div>
                    <div className={'MapTasks'}>
                        <RoutMapComponent data={data?.tasks}></RoutMapComponent>
                    </div>
                </div>
            }
            {
                isMobile &&

                <div className={'ViewTasks'}>
                    <div className={'EmployeeList'}>
                       <Tabs items={items}>
                       </Tabs>
                    </div>
                </div>
            }
        </>
    )
}

export default memo(ViewTasks)
