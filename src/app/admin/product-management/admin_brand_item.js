import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { format } from 'date-fns';
import brandService from '../../service/brand.service';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button, Input, Row, Col, Upload, Checkbox } from 'antd';

import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

const { TextArea } = Input;

const BrandItem = () => {
    // toast.configure()
    const { id, type } = useParams();
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [brand, setUser] = useState(null);
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
        console.log(brand);
    }

    // const createForm = () => {
    //     reset({
    //         brandname: '',
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
    //         brandRank: '',
    //         avatar: null,
    //         is2FA: false,
    //         description: '',
    //         confirmPassword: ''
    //     });
    // };


    // const initUser = async () => {
    //     try {
    //     const response = await brandService.getById(id);
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
                const response = await brandService.create(data);
                if (response.status) {
                    toast.success(`Thêm mới thương hiệu ${response.data.name} thành công`);
                    navigate('/admin/brand');
                } else {
                    toast.error('Thêm mới thương hiệu thất bại', 'FAIL');
                }
            } else {
                const response = await brandService.update(data);
                if (response.status) {
                    toast.success(`Cập nhật thương hiệu ${response.data.name} thành công`);
                    navigate('/admin/brand');
                } else {
                    toast.error('Cập nhật thương hiệu thất bại');
                }
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra');
        }
    };

    const onCheckMall = (e) => {
        console.log(e.target.checked);
    }

    const transformData = (data) => ({
        id: brand.id,
        brandname: brand.brandname,
        password: '123456aA@',
        confirmPassword: brand.password,
        email: data.email,
        phone: data.phone,
        givenName: data.givenName,
        familyName: data.familyName,
        citizenNumber: data.citizenNumber,
        gender: data.gender,
        dob: data.dob,
        country: data.country,
        brandRank: data.brandRank,
        avatar: data.avatar,
        roleId: brand.roleId,
        status: 'ACTIVE'
    });

    const onSubmit = (data) => {
        if (data) {
            save(data);
        }
    };

    const back = () => {
        navigate("/admin/brand")
    };

    const [fileList, setFileList] = useState([]);
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
        src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
        });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
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
                THÊM MỚI THƯƠNG HIỆU SẢN PHẨM
            </div>
            <Row className='brand-account'>
                <Col span={10}>
                    <p className='field-label'>Ký hiệu <span className='require-icon'>*</span></p>
                    <Input placeholder='Nhập ký hiệu'></Input>

                    <p className='field-label'>Quốc gia</p>
                    <Input placeholder='Nhập Quốc gia'></Input>

                    <p className='field-label'>Mô tả</p>
                    <TextArea rows={3} placeholder='...'></TextArea>

                    <Checkbox className='mg-t-15' onChange={onCheckMall}>Brand Mall</Checkbox>
                </Col>
                <Col span={2}></Col>
                <Col span={10}>
                    <p className='field-label'>Tên <span className='require-icon'>*</span></p>
                    <Input placeholder='Nhập tên'></Input>

                    <p className='field-label'>Slogan</p>
                    <Input placeholder="Nhập slogan"></Input>

                    <ImgCrop rotationSlider className='upload-img'>
                        <Upload
                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            listType="picture-card"
                            fileList={fileList}
                            onChange={onChange}
                            onPreview={onPreview}
                        >
                            {fileList.length < 1 && '+ Upload'}
                        </Upload>
                    </ImgCrop>
                </Col>
            </Row>
            
            <Row className='admin-btn-container'>
                <Button onClick={back} className='btn-back' size='large' icon={<ArrowLeftOutlined />}>Quay lại</Button>
                <Button onClick={onSubmit} type='primary' size='large' icon={<CheckOutlined />}>Lưu</Button>
            </Row>
        </div>
    );
};

export default BrandItem;
