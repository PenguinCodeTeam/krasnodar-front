import React, {useMemo, useState} from "react";
import StaticPage from "../components/StaticPage";
import {DatePicker, DatePickerProps, Table, Tag} from "antd";
import {ColumnsType} from "antd/es/table";
import {Link} from "react-router-dom";
import {createGetRequestService} from "../services/createRequestService";
import dayjs from "dayjs";
import {UpOutlined, MenuOutlined, DownOutlined} from "@ant-design/icons";

interface EmployeeI {
    id: string;
    name: string;
}
interface DataType {
    key: React.Key;
    id: string;
    status: string;
    name: string;
    priority: string;
    time: number;
    point: object;
    date: string;
    employee: EmployeeI;
}

const TasksPage: React.FunctionComponent = () => {

    const [date, setDate] = useState<string>(new Date().toLocaleDateString().replace(/\./g, "-"))
    const {data} = createGetRequestService({url: 'tasks', method: 'get', params: {date: date}}, [date])

    // const data: any[] = [
    //     {
    //         key: 'id1',
    //         id: 'id1',
    //         status: 'open',
    //         name: 'Задача1',
    //         priority: 'medium',
    //         time: 34,
    //         point: {
    //             lat: '123',
    //             lng: '123',
    //         },
    //         date: '12.03.12',
    //         employee: {
    //             id: 'idEmployee1',
    //             name: 'Иванов Иван'
    //         },
    //     },
    //     {
    //         key: 'id2',
    //         id: 'id2',
    //         status: 'open',
    //         name: 'Задача2',
    //         priority: 'high',
    //         time: 32,
    //         point: {
    //             lat: '123',
    //             lng: '123',
    //         },
    //         date: '12.05.12',
    //         employee: {
    //             id: 'idEmployee1',
    //             name: 'Иванов Иван'
    //         },
    //     },
    //     {
    //         key: 'id3',
    //         id: 'id3',
    //         status: 'open',
    //         name: 'Задача3',
    //         priority: 'low',
    //         time: 32,
    //         point: {
    //             lat: '123',
    //             lng: '123',
    //         },
    //         date: '12.03.12',
    //         employee: {
    //             id: 'idEmployee1',
    //             name: 'Иванов Иван'
    //         },
    //     },
    //     {
    //         key: 'id4',
    //         id: 'id4',
    //         status: 'open',
    //         name: 'Задача4',
    //         priority: 'medium',
    //         time: 32,
    //         point: {
    //             lat: '123',
    //             lng: '123',
    //         },
    //         date: '12.04.12',
    //         employee: {
    //             id: 'idEmployee2',
    //             name: 'Алексеев Алексей'
    //         },
    //     },
    //     {
    //         key: 'id5',
    //         id: 'id5',
    //         status: 'close',
    //         name: 'Задача5',
    //         priority: 'high',
    //         time: 32,
    //         point: {
    //             lat: '123',
    //             lng: '123',
    //         },
    //         date: '12.05.12',
    //         employee: {
    //             id: 'idEmployee2',
    //             name: 'Алексеев Алексей'
    //         },
    //     },
    // ]
    const dateFormat = 'DD-MM-YYYY';

    const filterEmployee = useMemo(() => {
        const filterEmployee:any = []
        const massEmployee:any[] = []
        data?.forEach((item: DataType) => {
            if (!massEmployee.includes(item.employee.name)) {
                massEmployee.push(item.employee.name)
                filterEmployee.push({
                    text: item.employee.name,
                    value: item.employee.name,
                })
            }
        })
        return filterEmployee
    }, [data])

    const columns: ColumnsType<DataType> = [
        {
            title: 'Наименование',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            width: 250,
        },
        {
            title: 'Приоритет',
            dataIndex: 'priority',
            key: 'priority',
            width: 100,
            render: (priority) => {
                return (
                    <>
                        {
                            priority == 'high' &&
                            <Tag icon={<UpOutlined twoToneColor='#cf1322' />} color="error">
                                Высокий
                            </Tag>
                        }
                        {
                            priority == 'medium' &&
                            <Tag icon={<MenuOutlined twoToneColor='#d48806' />} color="gold">
                                Средний
                            </Tag>
                        }
                        {
                            priority == 'low' &&

                            <Tag icon={<DownOutlined />} color="success">
                                Низкий
                            </Tag>
                        }

                    </>
                )
            },
            sorter: (a, b) => a.priority.localeCompare(b.priority)
        },
        {
            title: 'Исполнитель',
            dataIndex: 'employee',
            key: 'employee',
            width: 200,
            filterSearch: true,
            render: (employee) => {
                return <Link to={`/employee/${employee?.id}`}>{employee?.name}</Link>
            },
            filters: filterEmployee,
            onFilter: (value: any, record) => record.employee.name.indexOf(value) === 0,
            sorter: (a, b) => a.employee.name.localeCompare(b.employee.name)
        },
        {
            title: 'Время выполнения',
            dataIndex: 'time',
            key: 'time',
            width: 150,
            sorter: (a, b) => a.time - b.time,
        },
        {
            title: 'Дата выполнения',
            dataIndex: 'date',
            key: 'date',
            width: 150,
            sorter: (a, b) => a.date.localeCompare(b.date)
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            fixed: 'right',
            width: 100,
            render: (status) => {
                console.log(status)
                const statusOpen = status == 'open'
                const color = statusOpen ? 'blue' : 'green'
                const text = statusOpen ? 'ОТКРЫТО' : 'ЗАВЕРШЕНО'
                return (
                    <Tag color={color}>
                        {text}
                    </Tag>
                )
            },
            sorter: (a, b) => a.status.localeCompare(b.status)
        },
    ];
    const onChange: DatePickerProps['onChange'] = (date: any, dateString) => {
        if (date) setDate(dateString.split('-').reverse().join('-'))
    };

    return (
        <StaticPage>
            <div className={'TableTasks'}>
                <div style={{width: '100%', margin: '0 0 20px 0', textAlign: 'right'}}>
                    <DatePicker onChange={onChange} defaultValue={dayjs(date, dateFormat)} clearIcon={false} />
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: '100vw' }}
                >
                </Table>
            </div>
        </StaticPage>
    )
}

export default TasksPage