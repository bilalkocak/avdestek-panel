import React, {useEffect} from 'react';
import {List, Avatar, Button, message, Typography} from 'antd';
import axios, {banUser} from "../../axios";
import dayjs from "dayjs";
import {CheckOutlined, SearchOutlined, StopOutlined, UserOutlined} from "@ant-design/icons";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/tr'

const {Title} = Typography;

const RegisterList = props => {
    const [users, setUsers] = React.useState([]);
    const [confirmedUsers, setConfirmedUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    dayjs.extend(relativeTime)
    const success = (text) => {
        message.success(text);
    };
    useEffect(() => {
            fetchAll()
        }, []
    )

    const fetchAll = () => {
        fetchUsers();
        fetchConfirmed();
    }

    const fetchUsers = () => {
        setLoading(true);
        axios.get('/help')
            .then(response => {
                setLoading(false);
                setUsers(response.data.user);
            })
            .catch(error => {
                setLoading(false);
                console.log(error);
            })
    }

    const fetchConfirmed = () => {
        setLoading(true);
        axios.get('/help/confirmed')
            .then(response => {
                setLoading(false);
                setConfirmedUsers(response.data.user);
            })
            .catch(error => {
                setLoading(false);
                console.log(error);
            })
    }

    const confirm = (id) => {
        axios.post('/help/confirm', {
            user_id: id
        })
            .then(() => {
                success('Onay maili gönderildi.');
                fetchUsers();
            })
            .catch(error => {
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
                            <Button key={'confirm'} shape="circle" type="primary" onClick={() => confirm(item._id)}>
                                <CheckOutlined/>
                            </Button>,
                            <Button key={'ban'} danger shape="circle" type="primary" onClick={() => {
                                banUser(item._id).then(() => {
                                    success('Kullanıcı engellendi.');
                                    fetchAll();
                                })
                            }}>
                                <StopOutlined/>
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

            <div>
                <Title level={2}>Mail onayı bekleyenler</Title>
            </div>
            <List
                itemLayout="horizontal"
                dataSource={confirmedUsers}
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
                            <Button key={"2"} shape="circle" type="primary" onClick={() => confirm(item._id)}>
                                <CheckOutlined/>
                            </Button>,
                            <Button key={"3"} danger shape="circle" type="primary" onClick={() => banUser(item._id)}>
                                <StopOutlined/>
                            </Button>
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar size={64} icon={<UserOutlined/>}/>}
                            title={
                                <a
                                    href={'https://www.barobirlik.org.tr/AvukatArama'}
                                    target={'_blank'}
                                    rel="noreferrer">{item.fullName} / {dayjs(item.createdAt).locale('tr').fromNow()}</a>}
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

RegisterList.propTypes = {};

export default RegisterList;
