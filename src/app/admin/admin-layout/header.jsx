// Header.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';

import { Row } from 'antd';
import { BellOutlined, QuestionCircleOutlined } from '@ant-design/icons';

export default function Header() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUser(currentUser);
      setIsLogin(true);
    }
  }, []);

  const routerProfile = () => {
    navigate('/profile');
  };

  const routerDiscount = () => {
    navigate('/discount');
  };

  const routerOrder = () => {
    navigate('/order-me');
  };

  const logout = () => {
    localStorage.clear();
    setIsLogin(false);
    setUser(null);
    alert('Đăng xuất thành công');
    navigate('/');
  };

  return (
    <div className='header'>
        <Row className='content'>
            <div className='noti'>
                <BellOutlined />
                <span>Thông báo</span>
            </div>
            <div>
                <QuestionCircleOutlined />
                <span>Hỗ trợ</span>
            </div>
        </Row>
    </div>
  );
}
