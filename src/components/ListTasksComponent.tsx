import React from "react";
import {Avatar, List, Tag, Typography} from "antd";
import {CheckOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
const { Text } = Typography;

const ListTasksComponent: React.FunctionComponent<any> = ({data}) => {
    return (
        <List
            itemLayout="vertical"
            dataSource={data}
            renderItem={(item: any) => (
                <List.Item
                    actions={[
                        <Tag color={item?.status === 'open'? 'blue' : item?.status === 'appointed'?'yellow': 'green'}>
                            {item?.status === 'open'? 'ОТКРЫТО' : item?.status === 'appointed'?'РАСПРЕДЕЛЕНО':'ЗАВЕРШЕНО'}
                        </Tag>,
                        `${item?.started_at || ''} - ${item?.finished_at || ''}`
                    ]}
                >
                    <List.Item.Meta
                        avatar={<Avatar style={{ backgroundColor: '#6deab7', verticalAlign: 'middle' }} >
                            <CheckOutlined />
                        </Avatar>}
                        title={<Link to={`/task/${item.id}`}><Text>{item.name}</Text></Link>}
                        description={item?.point?.address + " " +item?.time + " "}
                    />
                </List.Item>
            )}
        />
    )

}

export default ListTasksComponent
