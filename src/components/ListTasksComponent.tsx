import React from "react";
import {Avatar, List} from "antd";
import {CheckOutlined} from "@ant-design/icons";
import {createGetRequestService} from "../services/createRequestService";

const ListTasksComponent: React.FunctionComponent<any> = ({data}) => {
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
                        title={<a href="https://ant.design">{item.name}</a>}
                        description={item.point.address + " " +item.time + " " + (item.status ==='open'?"ОТКРЫТО":"ЗАВЕРШЕНО")}
                    />
                </List.Item>
            )}
        />
    )

}

export default ListTasksComponent
