import React from "react";
import {Avatar, List} from "antd";
import {CheckOutlined} from "@ant-design/icons";

const ListTasksComponent: React.FunctionComponent = () => {
    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];
    return (
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar style={{ backgroundColor: '#6deab7', verticalAlign: 'middle' }} >
                            <CheckOutlined />
                        </Avatar>}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                </List.Item>
            )}
        />
    )

}

export default ListTasksComponent