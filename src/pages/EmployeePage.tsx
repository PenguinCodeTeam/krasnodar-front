import React from "react";
import StaticPage from "../components/StaticPage";
import {Avatar, Button, List, Tabs, Tag, Tooltip} from "antd";
import {DownOutlined, EditTwoTone, EyeTwoTone, MenuOutlined, UpOutlined} from "@ant-design/icons";
import {createGetRequestService} from "../services/createRequestService";
import {Link} from "react-router-dom";
import {PlusOutlined} from '@ant-design/icons';

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
    // TODO: нужна кнопка добавления сотрудника

    const {data: employeeData} = createGetRequestService({url: 'employee', method: 'get'})
    const {data: managerData} = createGetRequestService({url: 'manager', method: 'get'})
    // const employeeData = {
    //     employees: [
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "Иван",
    //             "surname": "Иванов",
    //             "patronymic": "Иванович",
    //             "role": "manager",
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-2c96ff66afa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "Григорий",
    //             "surname": "Картошкин",
    //             "patronymic": "Васильевич",
    //             "role": "employee",
    //             "grade": "senior"
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-2c963f6safa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "Василий",
    //             "surname": "Мокров",
    //             "patronymic": "Олегович",
    //             "role": "manager",
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-23963f66afa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "Анна",
    //             "surname": "Минаева",
    //             "patronymic": "Андреевна",
    //             "role": "employee",
    //             "grade": "junior"
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-23963f66afa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "Екатерина",
    //             "surname": "Иванова",
    //             "patronymic": "Петровна",
    //             "role": "employee",
    //             "grade": "senior"
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-2c963f6safa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "string",
    //             "surname": "string",
    //             "patronymic": "string",
    //             "role": "manager",
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-23963f66afa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "string",
    //             "surname": "string",
    //             "patronymic": "string",
    //             "role": "employee",
    //             "grade": "senior"
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-23963f66afa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "string",
    //             "surname": "string",
    //             "patronymic": "string",
    //             "role": "employee",
    //             "grade": "middle"
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-2c963f6safa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "string",
    //             "surname": "string",
    //             "patronymic": "string",
    //             "role": "manager",
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-23963f66afa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "Анна",
    //             "surname": "Минаева",
    //             "patronymic": "Андреевна",
    //             "role": "employee",
    //             "grade": "junior"
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-23963f66afa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "Екатерина",
    //             "surname": "Иванова",
    //             "patronymic": "Петровна",
    //             "role": "employee",
    //             "grade": "senior"
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-2c963f6safa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "string",
    //             "surname": "string",
    //             "patronymic": "string",
    //             "role": "manager",
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-23963f66afa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "string",
    //             "surname": "string",
    //             "patronymic": "string",
    //             "role": "employee",
    //             "grade": "senior"
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-23963f66afa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "string",
    //             "surname": "string",
    //             "patronymic": "string",
    //             "role": "employee",
    //             "grade": "middle"
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-2c963f6safa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "string",
    //             "surname": "string",
    //             "patronymic": "string",
    //             "role": "manager",
    //         },
    //     ]
    // };
    // const managerData = {
    //     managers: [
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-23963f66afa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "Анна",
    //             "surname": "Минаева",
    //             "patronymic": "Андреевна",
    //             "role": "employee",
    //             "grade": "junior"
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-23963f66afa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "Екатерина",
    //             "surname": "Иванова",
    //             "patronymic": "Петровна",
    //             "role": "employee",
    //             "grade": "senior"
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-2c963f6safa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "string",
    //             "surname": "string",
    //             "patronymic": "string",
    //             "role": "manager",
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "Иван",
    //             "surname": "Иванов",
    //             "patronymic": "Иванович",
    //             "role": "manager",
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-2c96ff66afa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "Григорий",
    //             "surname": "Картошкин",
    //             "patronymic": "Васильевич",
    //             "role": "employee",
    //             "grade": "senior"
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-2c963f6safa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "Василий",
    //             "surname": "Мокров",
    //             "patronymic": "Олегович",
    //             "role": "manager",
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-23963f66afa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "string",
    //             "surname": "string",
    //             "patronymic": "string",
    //             "role": "employee",
    //             "grade": "senior"
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-23963f66afa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "string",
    //             "surname": "string",
    //             "patronymic": "string",
    //             "role": "employee",
    //             "grade": "middle"
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-2c963f6safa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "string",
    //             "surname": "string",
    //             "patronymic": "string",
    //             "role": "manager",
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-23963f66afa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "Анна",
    //             "surname": "Минаева",
    //             "patronymic": "Андреевна",
    //             "role": "employee",
    //             "grade": "junior"
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-23963f66afa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "Екатерина",
    //             "surname": "Иванова",
    //             "patronymic": "Петровна",
    //             "role": "employee",
    //             "grade": "senior"
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-2c963f6safa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "string",
    //             "surname": "string",
    //             "patronymic": "string",
    //             "role": "manager",
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-23963f66afa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "string",
    //             "surname": "string",
    //             "patronymic": "string",
    //             "role": "employee",
    //             "grade": "senior"
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-23963f66afa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "string",
    //             "surname": "string",
    //             "patronymic": "string",
    //             "role": "employee",
    //             "grade": "middle"
    //         },
    //         {
    //             "id": "3fa85f64-5717-4562-b3fc-2c963f6safa6",
    //             "address": "город улица дом квартира",
    //             "login": "string",
    //             "name": "string",
    //             "surname": "string",
    //             "patronymic": "string",
    //             "role": "manager",
    //         },
    //     ]
    // };

    const actionMass = (item: DataI) => {
        const actions = [
            <Tooltip title="Изменить информацию о пользователе">
                <Link to={`/account/${item.role}/${item.id}`}><EditTwoTone twoToneColor="#103a8c"/></Link>
            </Tooltip>
        ]
        if (item.role === 'employee') {
            actions.push(
                <Tooltip title="Просмотреть список задач пользователя">
                    <Link to={`/employee/${item.id}`}><EyeTwoTone twoToneColor="#103a8c" /></Link>
                </Tooltip>
            )
        }
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
                            description={item.address}
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


    return (
        <StaticPage>
            <div className={'ViewTasks'}>
                <div className={'EmployeeList'}>
                    <div style={{width: '100%', textAlign: 'right'}}>
                        <Button icon={<PlusOutlined />}>добавить пользователя</Button>
                    </div>

                    <Tabs
                        defaultActiveKey="employee"
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
                </div>
            </div>
        </StaticPage>
    )
}

export default EmployeePage