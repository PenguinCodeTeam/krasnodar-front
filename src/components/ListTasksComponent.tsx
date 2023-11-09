import React from "react";
import {Avatar, List, Typography} from "antd";
import {CheckOutlined} from "@ant-design/icons";
import {Link, useLocation} from "react-router-dom";
const { Text } = Typography;

const ListTasksComponent: React.FunctionComponent<any> = ({data}) => {
    let { state } = useLocation();
    return (
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item: any) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar style={{ backgroundColor: '#6deab7', verticalAlign: 'middle' }} >
                            <CheckOutlined />
                        </Avatar>}
                        title={<Link to={`/task/${item.id}`}><Text>{item.name}</Text></Link>}
                        description={item.point.address + " " +item.time + " " + (item.status ==='open'?"ОТКРЫТО":"ЗАВЕРШЕНО")}
                    />
                </List.Item>
            )}
        />
    )

}

export default ListTasksComponent
