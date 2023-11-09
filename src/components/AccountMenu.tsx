import React, {memo} from "react";
import {Link} from "react-router-dom";
import {Avatar} from "antd";
import {useAppSelector} from "../hooks/redux";


const AccountMenu: React.FunctionComponent = () => {
    const {user} = useAppSelector(state => state.userReducer)

    return (
        <div className="Menu">
            {
                user &&
                <Link to={`/account/${user.role}/${user.id}`}>
                    <Avatar style={{ backgroundColor: '#103a8c', verticalAlign: 'middle' }} size={40}>
                        {user.name[0]}
                    </Avatar>
                </Link>
            }
        </div>
    )
}

export default memo(AccountMenu)