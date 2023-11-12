import React, {useMemo, useState} from "react";
import {Button, Col, Divider, Form, Row, Tag } from "antd";
import {CheckCircleTwoTone, DownOutlined, MenuOutlined, UpOutlined} from '@ant-design/icons';
import {notifyRequestCreator} from "../api/notify";
import TextArea from "antd/es/input/TextArea";
import StaticPage from "../components/StaticPage";
import { useParams } from 'react-router-dom';
import RoutMapComponent from "../components/RoutMapComponent";
import useResize from "../hooks/useResize";
import {createGetRequestService} from "../services/createRequestService";
type Param = {
    id: string
}
const TaskPage: React.FunctionComponent<any> = () => {
    const size: any[] = useResize();
    const isMobile: any = useMemo(()=> {
        if (size[0] >= 900) return false
        else if (size[0] < 900) return true
    }, [size])
    const id: Param = useParams();
    const [form] = Form.useForm();
   // const {data} = createGetRequestService({url: 'task/appointed/'+id.id, method: 'get'})
const data = {
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
    };
    const end = async (value: any) => {
            const response = await notifyRequestCreator(Object.assign({}, {
                data: Object.assign({}, value,{status: 'close'}),
                url: 'task/appointed/'+id.id,
                method: 'put'
            }))
            return response.data
    }
    return (
        data ?
        <StaticPage>
            {
                !isMobile &&
                <div className={'ViewTasks'}>
                    <div className={'ListTasks'}>
                        <Divider>{data?.name}</Divider>
                        <Row>
                            <Col className="gutter-row" span={12}>
                                <div>Адрес:</div>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <div>{data?.point?.full_address}</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="gutter-row" span={12}>
                                <div>Время:</div>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <div>{data?.time}</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="gutter-row" span={12}>
                                <div>Приоритет:</div>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                {
                                    data?.priority == 'high' &&
                                    <Tag icon={<UpOutlined twoToneColor='#cf1322' />} color="error">
                                        Высокий
                                    </Tag>
                                }
                                {
                                    data?.priority == 'medium' &&
                                    <Tag icon={<MenuOutlined twoToneColor='#d48806' />} color="gold">
                                        Средний
                                    </Tag>
                                }
                                {
                                    data?.priority == 'low' &&

                                    <Tag icon={<DownOutlined />} color="success">
                                        Низкий
                                    </Tag>
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col className="gutter-row" span={12}>
                                <div>Статус:</div>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <Tag color={data?.status === 'open'? 'blue' : data?.status === 'appointed'?'yellow': 'green'}>
                                    {data?.status === 'open'? 'ОТКРЫТО' : data?.status === 'appointed'?'РАСПРЕДЕЛЕНО':'ЗАВЕРШЕНО'}
                                </Tag>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="gutter-row" span={24}>
                                <Button icon={<CheckCircleTwoTone twoToneColor="#52c41a" />} onClick={form.submit} disabled={data?.status !== 'open'}>Завершить</Button>
                            </Col>
                            <Col className="gutter-row" span={24}>
                                <Form
                                    layout="horizontal"
                                    onFinish={end}
                                    form={form}
                                    initialValues={{message: data?.message}}
                                    key={'Task'}
                                >
                                    <Form.Item
                                        name="note"
                                        rules={[{ required: false, message: 'Комментарий' }]}
                                    >
                                        <TextArea rows={4} disabled={data?.status !== 'open'}/>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                    <div className={'MapTasks'}>
                        <RoutMapComponent data={[data]}></RoutMapComponent>
                    </div>
                </div>
            }
            {
                isMobile &&
                <div>
                        <Divider>{data?.name}</Divider>
                        <Row>
                            <Col className="gutter-row" span={12}>
                                <div>Адрес:</div>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <div>{data?.point?.full_address}</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="gutter-row" span={12}>
                                <div>Время (мин.):</div>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <div>{data?.time}</div>
                            </Col>
                        </Row>
                    <Row>
                            <Col className="gutter-row" span={12}>
                                <div>Статус:</div>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <Tag color={data?.status === 'open'? 'blue' : data?.status === 'appointed'?'yellow': 'green'}>
                                    {data?.status === 'open'? 'ОТКРЫТО' : data?.status === 'appointed'?'РАСПРЕДЕЛЕНО':'ЗАВЕРШЕНО'}
                                </Tag>
                            </Col>
                    </Row>
                    <Row>
                            <Col className="gutter-row" span={24}>
                                <Button icon={<CheckCircleTwoTone twoToneColor="#52c41a" />} onClick={form.submit} disabled={data.status !== 'open'}>Завершить</Button>
                            </Col>
                            <Col className="gutter-row" span={24}>
                                <Form
                                    layout="horizontal"
                                    onFinish={end}
                                    form={form}
                                    initialValues={{note: data?.message}}
                                    key={'Task'}
                                >
                                    <Form.Item
                                        name="note"
                                        rules={[{ required: false, message: 'Комментарий' }]}
                                    >
                                        <TextArea rows={4} disabled={data?.status !== 'open'}/>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                </div>
            }
        </StaticPage>: <></>
    )
}

export default TaskPage
