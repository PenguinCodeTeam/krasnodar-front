import React, {memo, useMemo} from "react";
import RoutMapComponent from "./RoutMapComponent";
import ListTasksComponent from "./ListTasksComponent";
import useResize from "../hooks/useResize";
import {Tabs, TabsProps} from "antd";

const ViewTasks: React.FunctionComponent = () => {
    const size: any[] = useResize();
    const isMobile: any = useMemo(()=> {
        if (size[0] >= 900) return false
        else if (size[0] < 900) return true
    }, [size])
    // const {data} = createGetRequestService({url: 'tasks', method: 'get', params: {date: date}}, [date]

    const data: any[] = [
        {
            key: 'id1',
            id: 'id1',
            status: 'open',
            name: 'Задача1',
            priority: 'medium',
            time: 34,
            point: {
                lat: '123',
                lng: '123',
                address: "г. Краснодар, ул. им. 40-летия Победы, д. 20/1"
            },
            date: '12.03.12',
            employee: {
                id: 'idEmployee1',
                name: 'Иванов Иван'
            },
        },
        {
            key: 'id2',
            id: 'id2',
            status: 'open',
            name: 'Задача2',
            priority: 'high',
            time: 32,
            point: {
                lat: '123',
                lng: '123',
                address: "г. Краснодар, ул. им. Атарбекова, д. 24"
            },
            date: '12.05.12',
            employee: {
                id: 'idEmployee1',
                name: 'Иванов Иван'
            },
        },
        {
            key: 'id3',
            id: 'id3',
            status: 'open',
            name: 'Задача3',
            priority: 'low',
            time: 32,
            point: {
                lat: '123',
                lng: '123',
                address: "г. Краснодар, ул. им. Героя Аверкиева А.А., д. 8"
            },
            date: '12.03.12',
            employee: {
                id: 'idEmployee1',
                name: 'Иванов Иван'
            },
        },
        {
            key: 'id4',
            id: 'id4',
            status: 'open',
            name: 'Задача4',
            priority: 'medium',
            time: 32,
            point: {
                lat: '123',
                lng: '123',
                address: "г. Краснодар, ул. им. Героя Аверкиева А.А., д. 8/1 к. мая, кв. 268"
            },
            date: '12.04.12',
            employee: {
                id: 'idEmployee2',
                name: 'Алексеев Алексей'
            },
        },
        {
            key: 'id5',
            id: 'id5',
            status: 'close',
            name: 'Задача5',
            priority: 'high',
            time: 32,
            point: {
                lat: '123',
                lng: '123',
                address: "г. Краснодар, ул. им. Тургенева, д. 106"
            },
            date: '12.05.12',
            employee: {
                id: 'idEmployee2',
                name: 'Алексеев Алексей'
            },
        },
    ]
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Задачи',
            children: <ListTasksComponent data={data}></ListTasksComponent>,
        },
        {
            key: '2',
            label: 'Карты',
            children: <RoutMapComponent data={data}></RoutMapComponent>
        },
    ];
    return (
        <>
            {
                !isMobile &&
                <div className={'ViewTasks'}>
                    <div className={'ListTasks'}>
                        <ListTasksComponent data={data}></ListTasksComponent>
                    </div>
                    <div className={'MapTasks'}>
                        <RoutMapComponent data={data}></RoutMapComponent>
                    </div>
                </div>
            }
            {
                isMobile &&
                <div className={'TableTasks'}>
                   <Tabs items={items}>
                   </Tabs>
                </div>
            }
        </>
    )
}

export default memo(ViewTasks)
