import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Button, Row, Col, message, Typography, Card } from 'antd';
import { UserOutlined, MailOutlined, SaveOutlined } from '@ant-design/icons';
import axios from 'axios';
import AppHeader from '../../components/AppHeader/AppHeader';
import SideBar from '../../components/SideBar/SideBar';

const { Content, Sider } = Layout;
const { Title } = Typography;

const UserProfile = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch user data when the component mounts
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/userProfile');
                form.setFieldsValue(response.data);
            } catch (error) {
                message.error('Failed to fetch user data');
            }
        };

        fetchUserData();
    }, [form]);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.put(`http://localhost:8000/update-profile/${values.adminId}`, values);
            if (response.status === 200) {
                message.success('Profile updated successfully');
            } else {
                message.error('Failed to update profile');
            }
        } catch (error) {
            message.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppHeader />
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <SideBar />
                </Sider>
                <Layout style={{ padding: '24px' }}>
                    <Content style={{ margin: 0, minHeight: 280 }}>
                        <Card style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
                            <Title level={2}>User Profile</Title>
                            <Form
                                form={form}
                                name="profile"
                                layout="vertical"
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    name="firstName"
                                    label="First Name"
                                    rules={[{ required: true, message: 'Please input your first name!' }]}
                                >
                                    <Input prefix={<UserOutlined />} placeholder="First Name" />
                                </Form.Item>
                                <Form.Item
                                    name="lastName"
                                    label="Last Name"
                                    rules={[{ required: true, message: 'Please input your last name!' }]}
                                >
                                    <Input prefix={<UserOutlined />} placeholder="Last Name" />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                                >
                                    <Input prefix={<MailOutlined />} placeholder="Email" />
                                </Form.Item>
                                {/* Hidden input for adminId */}
                                <Form.Item name="adminId" hidden>
                                    <Input />
                                </Form.Item>
                                <Form.Item>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading} block>
                                                Save Changes
                                            </Button>
                                        </Col>
                                        <Col span={12}>
                                            <Button htmlType="button" onClick={() => form.resetFields()} block>
                                                Reset
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default UserProfile;
