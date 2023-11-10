import React, {useMemo, useState} from "react";
import MapComponent from "../components/MapComponent";
import {Button, Col, Divider, Form, Row, Tabs, Tag, Typography} from "antd";
import { CheckCircleTwoTone } from '@ant-design/icons';
import {notifyRequestCreator} from "../api/notify";
import TextArea from "antd/es/input/TextArea";
import StaticPage from "../components/StaticPage";
import { useParams } from 'react-router-dom';
import RoutMapComponent from "../components/RoutMapComponent";
import useResize from "../hooks/useResize";
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
    // const task: any = createGetRequestService({url: 'task/'+id.id, method: 'get'})
    const task =
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
            message: 'Добавить примечание в параметре note'
    }

    const end = async (value: any) => {
            const response = await notifyRequestCreator(Object.assign({}, {
                data: Object.assign({}, value,{status: 'close'}),
                url: 'task/'+id.id,
                method: 'put'
            }))
            return response.data
    }
    return (
        task &&
        <StaticPage>
            {
                !isMobile &&
                <div className={'ViewTasks'}>
                    <div className={'ListTasks'}>
                        <Divider>{task.name}</Divider>
                        <Row>
                            <Col className="gutter-row" span={12}>
                                <div>Адрес:</div>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <div>{task.point.address}</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="gutter-row" span={12}>
                                <div>Время:</div>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <div>{task.time}</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="gutter-row" span={12}>
                                <div>Статус:</div>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <Tag color={task?.status === 'open'? 'blue' : 'green'}>
                                    {task?.status === 'open'? 'ОТКРЫТО' : 'ЗАВЕРШЕНО'}
                                </Tag>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="gutter-row" span={24}>
                                <Button icon={<CheckCircleTwoTone twoToneColor="#52c41a" />} onClick={form.submit} disabled={task.status !== 'open'}>Завершить</Button>
                            </Col>
                            <Col className="gutter-row" span={24}>
                                <Form
                                    layout="horizontal"
                                    onFinish={end}
                                    form={form}
                                    initialValues={{message: task.message}}
                                    key={'Task'}
                                >
                                    <Form.Item
                                        name="note"
                                        rules={[{ required: false, message: 'Комментарий' }]}
                                    >
                                        <TextArea rows={4} disabled={task.status !== 'open'}/>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                    <div className={'MapTasks'}>
                        <RoutMapComponent data={[task]}></RoutMapComponent>
                    </div>
                </div>
            }
            {
                isMobile &&
                <div className={'TableTasks'}>
                        <Divider>task.name</Divider>
                        <Row>
                            <Col className="gutter-row" span={12}>
                                <div>Адрес:</div>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <div>{task.point.address}</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="gutter-row" span={12}>
                                <div>Время (мин.):</div>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <div>{task.time}</div>
                            </Col>
                        </Row>
                    <Row>
                            <Col className="gutter-row" span={12}>
                                <div>Статус:</div>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <Tag color={task?.status === 'open'? 'blue' : 'green'}>
                                    {task?.status === 'open'? 'ОТКРЫТО' : 'ЗАВЕРШЕНО'}
                                </Tag>
                            </Col>
                    </Row>
                    <Row>
                            <Col className="gutter-row" span={24}>
                                <Button icon={<CheckCircleTwoTone twoToneColor="#52c41a" />} onClick={form.submit} disabled={task.status !== 'open'}>Завершить</Button>
                            </Col>
                            <Col className="gutter-row" span={24}>
                                <Form
                                    layout="horizontal"
                                    onFinish={end}
                                    form={form}
                                    initialValues={{note: task.message}}
                                    key={'Task'}
                                >
                                    <Form.Item
                                        name="note"
                                        rules={[{ required: false, message: 'Комментарий' }]}
                                    >
                                        <TextArea rows={4} disabled={task.status !== 'open'}/>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    <div style={{maxWidth: size[0], maxHeight: size[1]}}>
                        <RoutMapComponent data={[task]}></RoutMapComponent>
                    </div>
                </div>
            }
        </StaticPage>
    )
}

export default TaskPage
