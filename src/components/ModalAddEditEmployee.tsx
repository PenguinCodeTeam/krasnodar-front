import React, {memo} from "react";
import {Form, Input, Modal} from "antd";
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
    data: {
        id: string,
        login: string,
        name: string,
        surname: string,
        patronymic: string,
        role: string,
        grade: string,
        address: string
    }
}

const ModalAddEditEmployee: React.FunctionComponent<Props> = memo((props) => {
    const {open, onClose, type, data} = props
    const [form] = Form.useForm();
    const queryClient = useQueryClient()
    const history = useHistory();
    const url = history.location.pathname.replace('/account/', '')
    const mutationProduct = useMutation((data: object)=>fetchAddEditEmployee(data),{
        onSuccess: () => queryClient.invalidateQueries(url)
    })

    const handleOk = async (value: any) => {
        const dataReq = {
            data: value,
            method: type == 'add' ? 'post' : 'patch',
            url: `/employee/${data?.id}`
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
            okText="Изменить"
            cancelText= "Отменить"
            okType="default"
        >
            <Form
                layout="horizontal"
                onFinish={handleOk}
                form={form}
                initialValues={data}
                key={JSON.stringify(data)}
            >
                <Form.Item
                    label="Логин"
                    name="login"
                    rules={[{ required: true, message: 'Пожалуйста введите логин!' }]}
                >
                    <Input />
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
                    label="Уровень"
                    name="grade"
                    rules={[{ required: true, message: 'Пожалуйста введите уровень!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Адрес"
                    name="address"
                    rules={[{ required: true, message: 'Пожалуйста введите адрес!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
})

export default ModalAddEditEmployee