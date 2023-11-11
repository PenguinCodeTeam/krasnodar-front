import React, {useEffect, useState} from "react";
import StaticPage from "../components/StaticPage";
import {Avatar, Card, Tooltip} from "antd";
import Meta from "antd/es/card/Meta";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {signOut, updateUser} from "../store/redusers/userSlice";
import {EditOutlined} from "@ant-design/icons";
import {createGetRequestService} from "../services/createRequestService";
import {useHistory} from "react-router-dom";
import ModalAddEditManager from "../components/ModalAddEditManager";
import ModalAddEditEmployee from "../components/ModalAddEditEmployee";

const AccountPage: React.FunctionComponent = () => {

    const {user} = useAppSelector(state => state.userReducer)
    const history = useHistory();
    const url = history.location.pathname.replace('/account/', '')
    const {data} = createGetRequestService({url: url, method: 'get'})
    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false);

    const handleOut = () => {
        history.push('/')
        dispatch(signOut())
    };

    useEffect(() => {
        if (data && user && data?.name !== user?.name) dispatch(updateUser(data))
    }, [data])


    return (
        <StaticPage>
            <Card
                style={{ width: '70vw', marginTop: 16,textAlign: 'left' }}
                actions={[
                    <Tooltip title="Редактировать аккаунт">
                        <EditOutlined key="edit" onClick={()=>setOpen(true)}/>
                    </Tooltip>,
                    <Tooltip title="Выйти из аккаунта">
                        <div onClick={handleOut}>Выйти</div>
                    </Tooltip>
                ]}
            >
                <Meta
                    avatar={
                        <Avatar style={{ backgroundColor: '#103a8c', verticalAlign: 'middle' }} size={40}>
                            {data?.name[0] || ''}
                        </Avatar>
                    }
                    title={`${data?.surname} ${data?.name} ${data?.patronymic}`}
                    description={
                        <div>
                            <p>Логин: {data?.login}</p>
                            <p>Роль: {data?.role}</p>
                            {
                                data?.grade &&
                                <p>Уровень: {data?.grade}</p>
                            }
                            {
                                data?.address &&
                                <p>Адрес: {data?.address}</p>
                            }
                        </div>
                    }
                />
            </Card>
            {
                data?.role == 'manager' &&
                <ModalAddEditManager open={open} onClose={()=>setOpen(false)} key={JSON.stringify(data)} type='edit' data={data}/>
            }
            {
                data?.role == 'employee' &&
                <ModalAddEditEmployee open={open} onClose={()=>setOpen(false)} key={JSON.stringify(data)} type='edit' data={data} />
            }
        </StaticPage>
    )
}

export default AccountPage
