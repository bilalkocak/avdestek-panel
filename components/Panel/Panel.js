import React, {useEffect, useState} from 'react';
import {Statistic, Row, Col, Button} from 'antd';
import {dashboard} from "../../axios";


const Panel = props => {
    const [data, setData] = useState({});

    useEffect(() => {
        dashboard().then(res => {
            setData(res.data);
        });
    }, []);

    return (

        <div>
            <Row gutter={16} style={{marginBottom: 50}}>
                <Col span={12}>
                    <Statistic title="Aktif Üye" value={data.activeCount}/>
                </Col>
                <Col span={12}>
                    <Statistic title="Onay bekleyen üye" value={data.waitingCount}/>
                </Col>

            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="Engelli üye" value={data.bannedCount}/>
                </Col>
                <Col span={12}>
                    <Statistic title="Toplam üye" value={data.confirmedCount}/>
                </Col>
            </Row>
        </div>

    );
};

Panel.propTypes = {};

export default Panel;
