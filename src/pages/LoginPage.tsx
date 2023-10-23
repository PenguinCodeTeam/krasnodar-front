import React, {useEffect} from "react";
import StaticPage from "../components/StaticPage";
import {Button, Form, Input} from "antd";
import Title from "antd/es/typography/Title";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {signIn} from "../store/redusers/userSlice";
import {useHistory} from "react-router-dom";

const LoginPage: React.FunctionComponent = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch()
    const {isAuth} = useAppSelector(state => state.userReducer)
    const history = useHistory();

    const onFinish = (values: any) => {
        dispatch(signIn({url: 'login', data: values}))
        form.resetFields()
    };
    useEffect(() => {
        if (isAuth) history.push('home')
    },[isAuth])

    return (
        <StaticPage>
            <Title>Вход</Title>
            <Form
                form={form}
                name="basic"
                layout="vertical"
                onFinish={onFinish}
                className={"LoginModal"}
            >
                <Form.Item
                    name="login"
                    label="Логин"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите логин!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите пароль!'
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </StaticPage>
    )
}

export default LoginPage