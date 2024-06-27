import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const ProfileAdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { email } = values; 
      const response = await axios.post('http://localhost:8000/profile-admin-login', values);
      message.success('Login successful');
      sessionStorage.setItem('email', email); 
      navigate('/profileadmin/dashboard');
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.status === 309) {
        const { email } = values; 
        message.warning('Your password should change');
        sessionStorage.setItem('email', email); 
        navigate('/changepassword');
      } else {
        message.error('Login failed. Please check your email and password.');
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={styles.container}>
      <div style={styles.embossedContainer}>
        <Title level={2} style={styles.title}>Profile Admin Login</Title>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={styles.form}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              placeholder="Email"
              style={styles.input}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              placeholder="Password"
              style={styles.input}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={styles.button}
            >
              Login
            </Button>
          </Form.Item>

          <Form.Item>
          <Button
              type="link"
              style={styles.forgotPassword}
              onClick={() => navigate('/forgotpassword')}
            >
              Forgot Password?
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  embossedContainer: {
    backgroundColor: '#ffffff',
    width:'25%',
    padding: '40px 20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    border: '1px solid #e8e8e8',
    textAlign: 'center',
  },
  title: {
    marginBottom: '24px',
  },
  form: {
    maxWidth: '300px',
    margin: '0 auto',
  },
  input: {
    height: '40px',
  },
  button: {
    width: '100%',
    height: '40px',
    backgroundColor: 'rgb(0, 87, 88)',
    borderColor: 'rgb(0, 87, 88)',
  },
  forgotPassword: {
    padding: 0,
    height: '40px',
  },
};

export default ProfileAdminLogin;
