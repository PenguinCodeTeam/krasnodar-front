import React, {useState} from "react";
import StaticPage from "../components/StaticPage";
import {DatePicker, DatePickerProps, Table, Tag} from "antd";
import {ColumnsType} from "antd/es/table";
import {Link} from "react-router-dom";
import {createGetRequestService} from "../services/createRequestService";
import dayjs from "dayjs";
import {UpOutlined, MenuOutlined, DownOutlined} from "@ant-design/icons";

interface DataType {
    key: React.Key;
    id: string;
    status: string;
    name: string;
    priority: string;
    time: number;
    point: object;
    created_date: string;
}

const data: any = { tasks: [{
        "id": "cced1d42-53c3-4d01-a24c-bcc6c644f864",
        "status": "appointed",
        "name": "Обучение агента",
        "task_type_id": 2,
        "priority": "medium",
        "time": 120,
        "point": {
            "id": "585d810b-fb7a-4ac3-9144-7f5c2ccc93d4",
            "full_address": "г. Краснодар, ул. им. Горького, д. 128"
        },
        "created_date": "2023-11-11",
        "date": "2023-11-11",
        "task_number": 2,
        "started_at": "11:06",
        "finished_at": "13:18",
        "message": ""
    }]};

const TasksPage: React.FunctionComponent = () => {
    const toDate = (date?:any)=>{
        const today = date || new Date();
        const yyyy = today.getFullYear();
        let mm: string | number = today.getMonth() + 1;
        let dd: string | number = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return  yyyy + '-' + mm + '-' + dd;
    }


    const [date, setDate] = useState<string>(toDate())
   // const {data} = createGetRequestService({url: 'task/appointed', method: 'get', params: {date: date}}, [date])

    const dateFormat = 'YYYY-MM-DD';

    const columns: ColumnsType<DataType> = [
        {
            title: 'Наименование',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            width: 250,
            render: (name, task) => {
                return <Link to={`/task/${task.id}`}>{task?.name}</Link>
            },
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
            title: 'Время выполнения',
            dataIndex: 'time',
            key: 'time',
            width: 150,
            sorter: (a, b) => a.time - b.time,
        },
        {
            title: 'Дата выполнения',
            dataIndex: 'created_date',
            key: 'created_date',
            width: 150,
            sorter: (a, b) => a.created_date.localeCompare(b.created_date)
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            fixed: 'right',
            width: 100,
            render: (status) => {
                const statusOpen = status
                const color = statusOpen === 'open' ? 'blue' : statusOpen === 'appointed'? 'yellow': 'green';
                const text = statusOpen === 'open' ? 'ОТКРЫТО' : statusOpen === 'appointed'? 'РАСПРЕДЕЛЕНО': 'ЗАВЕРШЕНО'
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
        if (date) setDate(dateString)
    };

    return (
        <StaticPage>
            <div className={'TableTasks'}>
                <div style={{width: '100%', margin: '0 0 20px 0', textAlign: 'right'}}>
                    <DatePicker onChange={onChange} defaultValue={dayjs(date, dateFormat)} clearIcon={false} />
                </div>
                <Table
                    columns={columns}
                    dataSource={data?.tasks}
                    scroll={{ x: '100vw' }}
                >
                </Table>
            </div>
        </StaticPage>
    )
}

export default TasksPage
