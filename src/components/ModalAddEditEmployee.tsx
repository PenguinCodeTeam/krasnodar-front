import React, {memo} from "react";
import {Form, Input, Modal, Select} from "antd";
import {useMutation, useQueryClient} from "react-query";
import {notifyRequestCreator} from "../api/notify";
import {useHistory} from "react-router-dom";

async function fetchAddEditEmployee(args: any){
    const {data} = await notifyRequestCreator(Object.assign({},{
        url: args.url,
        method: args.method,
        data: args.data,
    }))
    return data
}
interface Props {
    open: boolean
    onClose: (values: any) => void;
    type: string
    keyStr?: string
    data?: any
}

const ModalAddEditEmployee: React.FunctionComponent<Props> = memo((props) => {
    const {open, onClose, type, data=null, keyStr} = props
    const [form] = Form.useForm();
    const queryClient = useQueryClient()
    const history = useHistory();
    const url = history.location.pathname.replace('/account/', '')
    const queryKey = url=='/employee' ? 'manager' : url
    const mutationProduct = useMutation((data: object)=>fetchAddEditEmployee(data),{
        onSuccess: () => queryClient.invalidateQueries(queryKey)
    })


    const handleOk = async (value: any) => {
        const reqData = value
        if (type=='add') {
            if (reqData.password === reqData.secondpassword) {
                delete reqData.secondpassword
            }
        }

        const dataReq = {
            data: reqData,
            method: type == 'add' ? 'post' : 'patch',
            url: type == 'add' ? '/employee' : `/employee/${data?.id}`
        }
        mutationProduct.mutate(dataReq)
        form.resetFields()
        onClose(true)
    };

    return (
        <Modal
            title={`${type == 'add' ? 'Добавление' : 'Редактирование'} информации о работнике`}
            open={open}
            onOk={form.submit}
            onCancel={()=>onClose(false)}
            width={800}
            okText= {type=='add' ? 'Добавить' : 'Изменить'}
            cancelText= "Отменить"
            okType="default"
        >
            <Form
                layout="horizontal"
                onFinish={handleOk}
                form={form}
                initialValues={data}
                key={keyStr}
            >
                <Form.Item
                    label="Логин"
                    name="login"
                    rules={[{ required: true, message: 'Пожалуйста введите логин!' }]}
                >
                    <Input autoComplete='new-login' />
                </Form.Item>
                <Form.Item
                    label="Имя"
                    name="name"
                    rules={[{ required: true, message: 'Пожалуйста введите имя!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Фамилия"
                    name="surname"
                    rules={[{ required: true, message: 'Пожалуйста введите фамилию!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Отчество"
                    name="patronymic"
                    rules={[{ required: true, message: 'Пожалуйста введите отчество!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="grade"
                    label="Уровень"
                    rules={[{ required: true, message: 'Пожалуйста введите уровень!' }]}
                >
                    <Select>
                        <Select.Option value="junior">Младший</Select.Option>
                        <Select.Option value="middle">Средний</Select.Option>
                        <Select.Option value="senior">Старший</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Адрес"
                    name="address"
                    rules={[{ required: true, message: 'Пожалуйста введите адрес!' }]}
                >
                    <Input />
                </Form.Item>
                {
                    type=='add' &&
                    <Form.Item
                        name="password"
                        label="Пароль"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите пароль!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password autoComplete='new-password' />
                    </Form.Item>
                }
                {
                    type=='add' &&
                    <Form.Item
                        name="secondpassword"
                        label="Подтверждение пароля"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, подтвердите пароль!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Пароли не совпадают!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                }
            </Form>
        </Modal>
    )
})

export default ModalAddEditEmployee