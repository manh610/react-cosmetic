import { Button, Table, Row } from 'antd';
import React, {useState, useEffect} from 'react';
import { createStyles } from 'antd-style';

import { PlusOutlined, ReloadOutlined } from '@ant-design/icons'

import './admin_user.css';
import { useNavigate } from 'react-router-dom';

export default function UserManagement()
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
            title: 'Tài khoản',
            dataIndex: 'username',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'imageUrl',
        },
        {
            title: 'Cấp bậc',
            dataIndex: 'cost',
        },
        {
            title: 'Email',
            dataIndex: 'price',
        },
        {
            title: 'Số điện thọai',
            dataIndex: 'quantity',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'delete',
        },
        {
            title: '',
            dataIndex: 'edit',
        },
    ]

    const dataInit = [
        {
            'stt': 1,
            'username': "Manh Do",
        },
        {
            'stt': 1,
            'username': "Manh Do",
        },
        {
            'stt': 1,
            'username': "Manh Do",
        },
        {
            'stt': 1,
            'username': "Manh Do",
        },
        {
            'stt': 1,
            'username': "Manh Do",
        }
    ]

    const [data, setData] = useState(dataInit)

    return (
        <div className=''>
            <div className='admin-title'>
                QUẢN LÝ NGƯỜI DÙNG
            </div>
            <Row>
                <Button onClick={() => navigate("/admin/user/0/add")} className='btn-add-user' type='primary' icon={<PlusOutlined />}>Thêm mới</Button>
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