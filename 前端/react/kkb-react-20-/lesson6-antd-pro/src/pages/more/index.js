import React from 'react';
import styles from './index.css';
import ProTable from '@ant-design/pro-table';
import { Input, Button } from 'antd';
import { getChannelData } from './service';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'city',
    key: 'city',
  },
];
export default () => {
  return (
    <div>
      <h1 className={styles.title}>暗号：中非</h1>

      <ProTable
        rowKey="id"
        columns={columns}
        pagination={{
          current: 1,
          pageSize: 20,
        }}
        request={params => {
          return getChannelData(params);
        }}
        // toolBarRender={action => [
        //   <Input.Search
        //     style={{
        //       width: 200,
        //     }}
        //     onSearch={value => getChannelData(value)}
        //   />,
        // ]}
      ></ProTable>
    </div>
  );
};
