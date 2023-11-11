import React, {useState} from "react";
import StaticPage from "../components/StaticPage";
import {Avatar, Button, List, Tabs, Tag, Tooltip} from "antd";
import {DownOutlined, EditTwoTone, EyeTwoTone, MenuOutlined, UpOutlined, DeleteTwoTone} from "@ant-design/icons";
import {createGetRequestService} from "../services/createRequestService";
import {Link} from "react-router-dom";
import {PlusOutlined} from '@ant-design/icons';
import ModalAddEditManager from "../components/ModalAddEditManager";
import ModalAddEditEmployee from "../components/ModalAddEditEmployee";
import {useMutation, useQueryClient} from "react-query";
import {notifyRequestCreator} from "../api/notify";



async function fetchDeleteUser(args: any){
    const {data} = await notifyRequestCreator(Object.assign({},{
        url: args.url,
        method: 'delete'
    }))
    return data
}

interface DataI {
    id: string,
    address: string,
    login: string,
    name: string,
    surname: string,
    patronymic: string,
    role: string,
    grade: string,
}
const EmployeePage: React.FunctionComponent = () => {
    const {data: employeeData} = createGetRequestService({url: 'employee', method: 'get'})
    const {data: managerData} = createGetRequestService({url: 'manager', method: 'get'})
    const [active, setActive] = useState('employee')
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const queryClient = useQueryClient()
    const deleteUser = useMutation((data: object)=>fetchDeleteUser(data),{
        onSuccess: () => queryClient.invalidateQueries(active)
    })

    const selectUser = (item: any) => {
        setOpen(true)
        setSelected(item)
    }

    const handleDelete = (item: any) => {
        const dataReq = {
            url: `${active}/${item?.id}`,
        }
        deleteUser.mutate(dataReq)
    }

    const actionMass = (item: DataI) => {
        const actions = [
            <Tooltip title="Изменить информацию о пользователе">
                <EditTwoTone twoToneColor="#103a8c" onClick={()=>selectUser(item)}/>
            </Tooltip>
        ]
        if (item.role === 'employee') {
            actions.push(
                <Tooltip title="Просмотреть список задач пользователя">
                    <Link to={`/employee/${item.id}`}><EyeTwoTone twoToneColor="#103a8c" /></Link>
                </Tooltip>
            )
        }
        actions.push(
            <Tooltip title="Удалить пользователя">
                <DeleteTwoTone twoToneColor="red" onClick={()=>handleDelete(item)}/>
            </Tooltip>
        )
        return actions
    }
    const Page1 = (dataObj: any) => {
        const data = dataObj?.data?.employees || dataObj?.data?.managers || []
        return (
            <List
                itemLayout="horizontal"
                dataSource={data}
                pagination={{position: 'bottom', align: 'end'}}
                renderItem={(item: any) => (
                    <List.Item
                        actions={actionMass(item)}
                    >
                        <List.Item.Meta
                            avatar={<Avatar style={{ backgroundColor: '#b1cffc', verticalAlign: 'middle' }} >
                                И
                            </Avatar>}
                            title={`${item.surname} ${item.name} ${item.patronymic}`}
                            description={item?.workplace ? `г. ${item?.workplace?.city}, ${item?.workplace?.address}` : ''}
                        />
                        <div>
                            {
                                item.grade == 'senior' &&
                                <Tag icon={<UpOutlined twoToneColor='#cf1322' />} color="error">
                                    {item.grade}
                                </Tag>
                            }
                            {
                                item.grade == 'middle' &&
                                <Tag icon={<MenuOutlined twoToneColor='#d48806' />} color="orange">
                                    {item.grade}
                                </Tag>
                            }
                            {
                                item.grade == 'junior' &&

                                <Tag icon={<DownOutlined />} color="gold">
                                    {item.grade}
                                </Tag>
                            }
                        </div>
                        <div>
                            <Tag color={item.role === 'manager' ? 'blue' : 'green'}>
                                {item.role === 'manager' ? 'менеджер' : 'работник'}
                            </Tag>
                        </div>
                        {
                            item.role === 'manager' && <div style={{width: '30px'}}></div>
                        }
                    </List.Item>
                )}
            />
        )
    }
    const handleClose = () => {
        setOpen(false)
        setSelected(null)
    }

    return (
        <StaticPage>
            <div className={'ViewTasks'}>
                <div className={'EmployeeList'}>
                    <div style={{width: '100%', textAlign: 'right'}}>
                        <Button
                            icon={<PlusOutlined />}
                            onClick={()=>setOpen(true)}
                        >
                            {`Добавить ${active=='employee' ? 'работника' : 'менеджера'}`}
                        </Button>
                    </div>

                    <Tabs
                        defaultActiveKey="employee"
                        activeKey={active}
                        onChange={(active)=>setActive(active)}
                        items={[
                            {
                                label: 'Работники',
                                key: 'employee',
                                children: (
                                    <Page1 data={employeeData} key='employee' />
                                )
                            },
                            {
                                label: 'Менеджеры',
                                key: 'manager',
                                children: (
                                    <Page1 data={managerData} key='manager' />
                                )
                            },
                        ]}
                    />

                    {
                        active == 'manager' && !selected &&
                        <ModalAddEditManager open={open} onClose={handleClose} keyStr={managerData ? JSON.stringify(managerData): ''} type='add' />
                    }
                    {
                        active == 'employee' && !selected &&
                        <ModalAddEditEmployee open={open} onClose={handleClose} keyStr={employeeData ? JSON.stringify(employeeData) : ''} type='add' />
                    }

                    {
                        active == 'manager' && selected &&
                        <ModalAddEditManager open={open} onClose={handleClose} keyStr={managerData ? JSON.stringify(managerData): ''} type='edit' data={selected || null} />
                    }
                    {
                        active == 'employee' && selected &&
                        <ModalAddEditEmployee open={open} onClose={handleClose} keyStr={employeeData ? JSON.stringify(employeeData) : ''} type='edit' data={selected || null} />
                    }
                </div>
            </div>
        </StaticPage>
    )
}

export default EmployeePage