import { Button, Table, Row } from 'antd';
import React, {useState, useEffect} from 'react';
import { createStyles } from 'antd-style';

import { PlusOutlined, ReloadOutlined } from '@ant-design/icons'

import './admin_product.css';
import { useNavigate } from 'react-router-dom';

export default function BrandManagement()
{

    const useStyle = createStyles(({ css, token }) => {
        const { antCls } = token;
        return {
          customTable: css`
            ${antCls}-table {
              ${antCls}-table-container {
                ${antCls}-table-body,
                ${antCls}-table-content {
                  scrollbar-width: thin;
                  scrollbar-color: #eaeaea transparent;
                  scrollbar-gutter: stable;
                }
              }
            }
          `,
        };
    });

    const navigate = useNavigate();

    const { styles } = useStyle();

    const column = [
        {
            title: 'STT',
            dataIndex: 'stt'
        },
        {
            title: 'Ký hiệu',
            dataIndex: 'code',
        },
        {
            title: 'Tên',
            dataIndex: 'name',
        },
        {
            title: 'Quốc gia',
            dataIndex: 'country',
        },
        {
            title: 'Slogan',
            dataIndex: 'slogan',
        },
        {
            title: '',
            dataIndex: 'edit',
        },
    ]

    const dataInit = [
        {
            'stt': 1,
            'code': "Manh Do",
        },
        {
            'stt': 1,
            'code': "Manh Do",
        },
        {
            'stt': 1,
            'code': "Manh Do",
        },
        {
            'stt': 1,
            'code': "Manh Do",
        },
        {
            'stt': 1,
            'code': "Manh Do",
        },
    ]

    const [data, setData] = useState(dataInit)

    return (
        <div className=''>
            <div className='admin-title'>
                QUẢN LÝ THƯƠNG HIỆU SẢN PHẨM 
            </div>
            <Row>
                <Button onClick={() => navigate("/admin/brand/0/add")} className='btn-admin-add' type='primary' icon={<PlusOutlined />}>Thêm mới</Button>
                <Button icon={<ReloadOutlined />}>Tải lại</Button>
            </Row>
            <Table 
                className={styles.customTable}
                columns={column}
                dataSource={data}
                pagination={{
                    defaultPageSize: 5
                }}
            />
        </div>
    );
}