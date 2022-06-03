import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Menu, Layout} from "antd";
import {BlockOutlined, CheckOutlined, PieChartOutlined, StopOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";

const {Header, Content, Footer, Sider} = Layout;

const AppLayout = ({activePage, children}) => {
    const [collapsed, setCollapsed] = useState(false);
    const [current, setCurrent] = useState('1');

    const router = useRouter();

    useEffect(() => {
        localStorage.getItem("isAuth") !== "true" && router.push("/");
    }, [router.pathname]);

    function getItem(label, key, icon, children = null, url = '/') {
        return {
            key,
            icon,
            children,
            label,
            url
        };
    }

    const items = [
        getItem('Ana sayfa', '1', <PieChartOutlined/>, null, '/panel'),
        getItem('Yeni üye onay', '2', <CheckOutlined/>, null, '/kayit-onay'),
        getItem('Engelli hesaplar', '3', <StopOutlined/>, null, '/engelli-hesaplar'),
    ];
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="logo"/>
                <Menu theme="dark" defaultSelectedKeys={['1']} selectedKeys={activePage}
                      mode="inline" items={items}
                      onClick={({item, key, keyPath, domEvent}) => {

                          router.push(item.props.url).then(r => setCurrent(key))
                      }}/>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                        color: '#fff',
                        fontSize: '1.5em',
                        paddingLeft: '1em',
                    }}
                >
                    AvDestek Panel
                </Header>

                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    AvDestek ©2022 Created by Bilal Koçak
                </Footer>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
