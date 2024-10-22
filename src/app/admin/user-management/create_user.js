import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { format } from 'date-fns';
import userService from '../../service/user.service';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button, Input, Row, Col, Select, DatePicker } from 'antd';

import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons'

const CreateUser = () => {
    // toast.configure()
    const { id, type } = useParams();
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [user, setUser] = useState(null);
    const [countries] = useState([
        { code: 'ad', name: 'Việt Nam' },
        { code: 'am', name: 'Anh' }
    ]);

    // useEffect(() => {
    //     createForm();
    //     checkForm();
    //     // initProvinces();
    // }, []);

    const submit = () => {
        console.log(user);
    }

    // const createForm = () => {
    //     reset({
    //         username: '',
    //         password: '',
    //         email: '',
    //         phone: '',
    //         citizenNumber: '',
    //         givenName: '',
    //         familyName: '',
    //         gender: '',
    //         dob: new Date(),
    //         country: '',
    //         roleId: '',
    //         status: '',
    //         userRank: '',
    //         avatar: null,
    //         is2FA: false,
    //         description: '',
    //         confirmPassword: ''
    //     });
    // };


    // const initUser = async () => {
    //     try {
    //     const response = await userService.getById(id);
    //     if (response.status) {
    //         setUser(response.data);
    //         reset(transformData(response.data));
    //     }
    //     } catch (error) {
    //         toast.error('Có lỗi xảy ra');
    //     }
    // };

    // const initProvinces = async () => {
    //     try {
    //     const request = { name: '' };
    //     const response = await addressService.getProvinces(request);
    //     if (response.status) {
    //         setProvinces(response.data);
    //     }
    //     } catch (error) {
    //     console.error(error);
    //     }
    // };

    // const initDistricts = async (provinceId) => {
    //     try {
    //     const request = { provinceId };
    //     const response = await addressService.getDistricts(request);
    //     if (response.status) {
    //         setDistricts(response.data);
    //     }
    //     } catch (error) {
    //     console.error(error);
    //     }
    // };

    const save = async (data) => {
        try {
            if (type === 'add') {
                const response = await userService.create(data);
                if (response.status) {
                    toast.success(`Thêm mới người dùng ${response.data.username} thành công`);
                navigate('/admin/user');
                } else {
                    toast.error('Thêm mới người dùng thất bại', 'FAIL');
                }
            } else {
                const response = await userService.update(data);
                if (response.status) {
                    toast.success(`Cập nhật người dùng ${response.data.username} thành công`);
                navigate('/admin/user');
                } else {
                    toast.error('Cập nhật người dùng thất bại');
                }
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra');
        }
    };

    const transformData = (data) => ({
        id: user.id,
        username: user.username,
        password: '123456aA@',
        confirmPassword: user.password,
        email: data.email,
        phone: data.phone,
        givenName: data.givenName,
        familyName: data.familyName,
        citizenNumber: data.citizenNumber,
        gender: data.gender,
        dob: data.dob,
        country: data.country,
        userRank: data.userRank,
        avatar: data.avatar,
        roleId: user.roleId,
        status: 'ACTIVE'
    });

    const onSubmit = (data) => {
        if (data) {
            save(data);
        }
    };

    const back = () => {
        navigate("/admin/user")
    };

    return (
        <div>
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className='admin-title'>
                THÊM MỚI NGƯỜI DÙNG
            </div>
            <Row className='user-account'>
                <Col span={10}>
                    <p className='field-label'>Tên đăng nhập <span className='require-icon'>*</span></p>
                    <Input placeholder='Nhập tên đăng nhập'></Input>

                    <p className='field-label'>Mật khẩu <span className='require-icon'>*</span></p>
                    <Input placeholder='Nhập mật khẩu'></Input>

                    <p className='field-label'>Chức vụ <span className='require-icon'>*</span></p>
                    <Input placeholder='Nhập tên đăng nhập'></Input>
                </Col>
                <Col span={2}></Col>
                <Col span={10}>
                    <p className='field-label'>Cấp bậc <span className='require-icon'>*</span></p>
                    <Select
                        style={{ width: '100%' }}
                        options={[
                            { value: 'MEMBER', 'label': 'Thành viên'},
                            { value: 'PRIORITY', 'label': 'Ưu tiên'}
                        ]}
                        value={'MEMBER'}
                    />

                    <p className='field-label'>Nhập lại mật khẩu <span className='require-icon'>*</span></p>
                    <Input placeholder="Nhập lại mật khẩu"></Input>
                </Col>
            </Row>
            <hr/>
            <Row className='user-info'>
            <Col span={10}>
                    <p className='field-label'>Họ <span className='require-icon'>*</span></p>
                    <Input placeholder="Nhập họ"></Input>

                    <p className='field-label'>Email <span className='require-icon'>*</span></p>
                    <Input placeholder='Nhập email'></Input>

                    <p className='field-label'>Số CMND/CCCD <span className='require-icon'>*</span></p>
                    <Input placeholder='Nhập số CMND/CCCD'></Input>

                    <p className='field-label'>Ngày sinh <span className='require-icon'>*</span></p>
                    <DatePicker 
                        style={{ width: '100%' }}
                    />
                </Col>
                <Col span={2}></Col>
                <Col span={10}>
                    <p className='field-label'>Tên <span className='require-icon'>*</span></p>
                    <Input placeholder='Nhập tên'></Input>

                    <p className='field-label'>Số điện thoại <span className='require-icon'>*</span></p>
                    <Input placeholder="Nhập số điện thoại"></Input>

                    <p className='field-label'>Giới tính <span className='require-icon'>*</span></p>
                    <Select
                        style={{ width: '100%' }}
                        options={[
                            { value: 'MALE', 'label': 'Nam'},
                            { value: 'FEMALE', 'label': 'Nữ'}
                        ]}
                        value={'MALE'}
                    />

                    <p className='field-label'>Cấp bậc <span className='require-icon'>*</span></p>
                    <Select
                        style={{ width: '100%' }}
                        options={[
                            { value: 'VN', 'label': 'VietNam'},
                            { value: 'EN', 'label': 'England'}
                        ]}
                        value={'VN'}
                    />
                </Col>
            </Row>
            <Row className='admin-user-btn-container'>
                <Button onClick={back} className='btn-back' size='large' icon={<ArrowLeftOutlined />}>Quay lại</Button>
                <Button onClick={onSubmit} type='primary' size='large' icon={<CheckOutlined />}>Lưu</Button>
            </Row>
        </div>
    );
};

export default CreateUser;
