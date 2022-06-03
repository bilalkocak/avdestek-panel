import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Avatar, Button, List, message, Typography} from "antd";
import {CheckOutlined, SearchOutlined, StopOutlined, UserOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios, {banUser, unbanUser} from "../axios";

const {Title} = Typography;

const Banned = props => {

    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    dayjs.extend(relativeTime)
    const success = (text) => {
        message.success(text);
    };
    useEffect(() => {
            fetchUsers();
        }, []
    )

    const fetchUsers = () => {
        setLoading(true);
        axios.get('/help/banned')
            .then(response => {
                setLoading(false);
                setUsers(response.data.user);
            })
            .catch(error => {
                setLoading(false);
                console.log(error);
            })
    }
    return (
        <div>
            <div>
                <Title level={2}>Destek onayı bekleyenler</Title>
            </div>
            <List
                itemLayout="horizontal"
                dataSource={users}
                loading={loading}
                renderItem={(item) => (
                    <List.Item
                        key={item._id}
                        actions={[
                            <a key="list-loadmore-edit"
                               href={'https://www.barobirlik.org.tr/AvukatArama'}
                               target={'_blank'} rel="noreferrer">
                                <Button shape="circle" type="primary">
                                    <SearchOutlined/>
                                </Button>
                            </a>,
                            <Button shape="circle" type="primary" key={'ban'} onClick={
                                () => {
                                    unbanUser(item._id).then(() => {
                                        success('Kullanıcı engellendi.');
                                        fetchUsers();
                                    })
                                }
                            }>
                                <CheckOutlined/>
                            </Button>
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar size={64} icon={<UserOutlined/>}/>}
                            title={<a>{item.fullName} / {dayjs(item.createdAt).locale('tr').fromNow()}</a>}
                            description={<div>
                                <div>Baro: {item.city.label}</div>
                                <div>Baro No: {item.baroNumber}</div>
                                <div>Eposta: {item.email}</div>
                                <div>Tel.: {item.telephone}</div>
                            </div>}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

Banned.propTypes = {};

export default Banned;
