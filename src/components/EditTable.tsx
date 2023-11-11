import React, {Props, useEffect, useState} from 'react';
import {Form, Input, InputNumber, Popconfirm, Table, Typography} from 'antd';

interface DataType {
    "key": string,
    "address": string,
    "connected_at": string,
    "is_delivered": boolean,
    "days_after_delivery": number,
    "accepted_requests": number,
    "completed_requests": number
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'text' | 'number' | 'checkbox';
    record: DataType;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
                                                       editing,
                                                       dataIndex,
                                                       title,
                                                       inputType,
                                                       record,
                                                       index,
                                                       children,
                                                       ...restProps
                                                   }) => {
    const InputFabric: any = {
        'number': <InputNumber />,
        'text':<Input />
    }
    const inputNode = InputFabric[inputType];

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const EditTable: React.FC<any> = ({originData, columns, change}) => {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');

    useEffect(() => {
        if (originData) {
            setData(originData);
        }
    }, [originData])

    const isEditing = (record: DataType) => record.key === editingKey;

    const deleteRow = (record: Partial<DataType> & { key: React.Key }) => {
        let newData: any = [...data];
        let index = newData.findIndex((el: DataType)=>el.key === record.key);
        newData.splice(index, 1)
        setData(newData);
        change(newData)
    }

    const edit = (record: Partial<DataType> & { key: React.Key }) => {
        form.setFieldsValue({
            "address": "",
            "connected_at": "",
            "is_delivered": "нет",
            "days_after_delivery": 0,
            "accepted_requests": 0,
            "completed_requests": 0, ...record });
        setEditingKey(record.key);
    };



    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as DataType;

            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
                change(newData)
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
                change(newData)
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const _columns = [
        ...columns,
        {
            title: 'Действия',
            dataIndex: 'operation',
            render: (_: any, record: DataType) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Сохранить
            </Typography.Link>
            <Popconfirm title="Отменить?" onConfirm={cancel}>
              <a>Отмена</a>
            </Popconfirm>
          </span>
                ) : (
                    <span>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)} style={{ marginRight: 8 }}>
                            Изменить
                        </Typography.Link>
                        <Popconfirm title="Удалить?" onConfirm={()=>deleteRow(record)}>
                            <a>Удалить</a>
                        </Popconfirm>
                    </span>
                );
            },
        },
    ];

    const mergedColumns = _columns.map((col: any) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                inputType: (col.dataIndex === "key" || col.dataIndex === "address" || col.dataIndex === "connected_at" || col.dataIndex === "is_delivered") ? 'text':'number',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};

export default EditTable;
