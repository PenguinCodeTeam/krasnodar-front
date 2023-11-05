import React, {memo} from "react";
import {Link} from "react-router-dom";
import {Avatar, Dropdown, MenuProps} from "antd";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {signOut} from "../store/redusers/userSlice";

const AccountMenu: React.FunctionComponent = () => {
    const {user} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    const handleOut = () => dispatch(signOut());
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link to="/account">
                    Редактировать профиль
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <div onClick={handleOut}>Выйти</div>
            ),
        },
    ]
    return (
        <div className="Menu">
            {
                user &&
                <Dropdown menu={{ items }} placement="bottomRight">
                    <Avatar style={{ backgroundColor: '#103a8c', verticalAlign: 'middle' }} size={40}>
                        {user.name[0]}
                    </Avatar>
                </Dropdown>
            }
        </div>
    )
}

export default memo(AccountMenu)