import React from 'react';
import {Button, Form, Input, message, Typography} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import styles from './Login.module.css'
import {useRouter} from "next/router";
import {login} from "../../axios";

const {Title} = Typography;

const Login = props => {
    const router = useRouter();

    const [formData, setFormData] = React.useState({
        username: '',
        password: ''
    });
    const error = (text) => {
        message.error(text);
    };

    const handleSubmit = e => {
        e.preventDefault();
        login(formData.username, formData.password).then(res => {
            localStorage.setItem('isAuth', "true");
            router.push('/panel');
        }).catch(err => {
            error("Hatalı deneme");
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <Title>Destek Paneli</Title>
            </div>

            <Form
                name="normal_login"
                className={styles.form}
            >
                <Form.Item
                    name="username"
                    rules={[{required: true, message: 'Lütfen kullanıcı adı girin'}]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Kullanıcı adı"
                           onChange={e => setFormData({...formData, username: e.target.value})}
                           value={formData.username}/>

                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: 'Lütfen şifre girin!'}]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        onChange={e => setFormData({...formData, password: e.target.value})}
                        value={formData.password}
                        placeholder="Parola"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" onClick={handleSubmit} className={styles.button}>
                        Giriş
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

Login.propTypes = {};

export default Login;
