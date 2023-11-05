import React, {memo} from "react";
import {Link} from "react-router-dom";
import { Typography } from 'antd';
const { Text } = Typography;

const AppMenu: React.FunctionComponent = () => {
    return (
        <div className="Menu">
            <Link to="/load_info"><Text>Загрузка информации</Text></Link>
            <Link to="/tasks"><Text>Задачи</Text></Link>
            <Link to="/employee"><Text>Работники</Text></Link>
        </div>
    )
}

export default memo(AppMenu)