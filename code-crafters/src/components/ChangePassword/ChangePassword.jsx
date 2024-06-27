import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Fetch email from sessionStorage on component mount
    const storedEmail = sessionStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const requestData = {
        email: email,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword
      };

      const response = await axios.post('http://localhost:8000/profile-admin-change-password', requestData);
      message.success('Password changed successfully');
      console.log(response.data);
      navigate('/profileadmin/dashboard');
    } catch (error) {
      message.error('Failed to change password. Please try again.');
      console.error(error);
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
        <Title level={2} style={styles.title}>Change Password</Title>
        <Form
          name="change-password-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={styles.form}
        >
          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: 'Please enter your new password' },
              { min: 6, message: 'Password must be at least 6 characters' },
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="New Password"
              style={styles.input}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords do not match');
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm Password"
              style={styles.input}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={styles.button}
              block
            >
              {loading ? 'Changing Password...' : 'Change Password'}
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
    width: '25%',
    padding: '20px',
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
    height: '40px',
    backgroundColor: '#005758',
    borderColor: '#005758',
    color: '#fff',
  },
};

export default ChangePassword;
