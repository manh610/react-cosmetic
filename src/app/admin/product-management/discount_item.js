import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { format } from 'date-fns';
import discountService from '../../service/discount.service';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button, Input, Row, Col, Upload, Checkbox, Tooltip, Select, DatePicker } from 'antd';

import { ArrowLeftOutlined, CheckOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

const { TextArea } = Input;

const DiscountItem = () => {
    // toast.configure()
    const { id, type } = useParams();
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(true);
    const [submitted, setSubmitted] = useState(false);


    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [slogan, setSlogan] = useState('');
    const [country, setCountry] = useState('');
    const [mall, setMall] = useState(false);
    const [description, setDes] = useState('');

    const processData = (data) => {
        setCode(data.code);
        setName(data.name);
        setSlogan(data.slogan);
        setCountry(data.country);
        setMall(data.mall);
        setDes(data.description);
    }

    const initDiscount = async () => {
        if ( type == 'add' )
            return;
        try {
            const response = await discountService.getById(id);
            if (response.status) {
                processData(response.data);
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra');
        }
    };

    
    // useEffect(() => {
    //     initDiscount();
    // }, []);

    const save = async (data) => {
        try {
            if (type === 'add') {
                const response = await discountService.create(data);
                if (response.status) {
                    toast.success(`Thêm mới mã giảm giá ${response.data.name} thành công`);
                    navigate('/admin/discount');
                } else {
                    toast.error('Thêm mới mã giảm giá thất bại', 'FAIL');
                }
            } else {
                const response = await discountService.update(id, data);
                if (response.status) {
                    toast.success(`Cập nhật mã giảm giá ${response.data.name} thành công`);
                    navigate('/admin/discount');
                } else {
                    toast.error('Cập nhật mã giảm giá thất bại');
                }
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra');
        }
    };

    const onSubmit = () => {
        var data = {
            code: code,
            name: name,
            logo: null,
            country: country,
            mall: mall,
            slogan: slogan,
            description: description,
            status: 'ACTIVE'
        }
        save(data);
    };

    const back = () => {
        navigate("/admin/discount")
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
                {type == 'add' ? 'THÊM MỚI MÃ GIẢM GIÁ' : 'CẬP NHẬT MÃ GIẢM GIÁ'}
            </div>
            <Row className='product-account'>
                <Col span={10}>
                    <p className='field-label'>Ký hiệu <span className='require-icon'>*</span></p>
                    <Input value={code} onChange={((e) => setCode(e.target.value))} placeholder='Nhập ký hiệu'></Input>

                    <p className='field-label'>Thời gian bắt đầu</p>
                    <DatePicker 
                        placeholder='Chọn thời gian bắt đầu'
                        style={{ width: '100%' }}
                    />

                    <p className='field-label'>Loại mã <span className='require-icon'>*</span></p>
                    <Select
                        style={{ width: '100%' }}
                        options={[
                            { value: 'VOUCHER', 'label': 'Phiếu giảm giá'},
                            { value: 'PROMOTION', 'label': 'Quảng cáo'}
                        ]}
                        placeholder='Chọn loại mã giảm giá'
                    />

                    <p className='field-label'>Mô tả</p>
                    <TextArea rows={2} placeholder='...'/>
                </Col>
                <Col span={2}></Col>
                <Col span={10}>
                    <p className='field-label'>Tên <span className='require-icon'>*</span></p>
                    <Input value={name} onChange={((e) => setName(e.target.value))} placeholder='Nhập tên'></Input>
                    
                    <p className='field-label'>Thời gian kết thúc</p>
                    <DatePicker 
                        placeholder='Chọn thời gian kết thúc'
                        style={{ width: '100%' }}
                    />
                    
                    <ImgCrop rotationSlider className='upload-img mg-t-20'>
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

export default DiscountItem;
