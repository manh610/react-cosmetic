import React, {useState, useEffect} from 'react';
import Header from './admin-layout/header';
import {Routes, Route} from 'react-router-dom';
import './admin.css'

import AdminDashboard from './dashboard/dashboard';
import Sidebar from './admin-layout/sidenav';
import UserManagement from './user-management/admin_user';

import { Col, Row } from 'antd';
import CreateUser from './user-management/create_user';
import BrandManagement from './product-management/admin_brand';
import BrandItem from './product-management/admin_brand_item';
import CategoryManagement from './product-management/admin_category';
import CategoryItem from './product-management/admin_category_item';

export default function Admin(){

    const [tab, setTab] = useState('/admin');

    return (
        <div>
            <div className='header-admin'>
                <Header/>
            </div>
            <Row className='admin-content'>
                <Col span={5} className='menu-admin'>
                    <Sidebar tab={tab} setTab={setTab}/>
                </Col>
                <Col span={17} className='admin-content-container'>
                    <Routes>
                        <Route path="/" element={<AdminDashboard/>}></Route>
                        <Route path="/user" element={<UserManagement/>}></Route>
                        <Route path='/user/:id/:type' element={<CreateUser/>}></Route>
                        <Route path='/brand' element={<BrandManagement/>}></Route>
                        <Route path='/brand/:id/:type' element={<BrandItem/>}></Route>
                        <Route path='/category' element={<CategoryManagement/>}></Route>
                        <Route path='/category/:id/:type' element={<CategoryItem/>}></Route>
                    </Routes>
                </Col>
            </Row>
        </div>
    );
}