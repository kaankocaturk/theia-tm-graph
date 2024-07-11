import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert } from 'antd';
import useTelemetryData from '../../../../hooks/useTelemetryData';

const expandedRowRender = (record) => {
  const columns = [
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Amplitude',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={record.time_series}
      pagination={false}
      scroll={{ y: 240 }}
    />
  );
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Color',
    dataIndex: 'color',
    key: 'color',
  },
  {
    title: 'Unit',
    dataIndex: 'unit',
    key: 'unit',
  },
];

const TableChart = () => {
  const [tableData, setTableData] = useState([]);
  const { data, loading, error } = useTelemetryData('/assets/sinusoidal_telemetry_dataset.json');

  useEffect(() => {
    if (!loading && tableData.length === 0 && data.length > 0) {
      setTableData(data);
    }
  }, [loading, data, tableData.length]);

  if (loading) return <Spin tip="Loading..." />;
  if (error) return <Alert message="Error" description={error.message} type="error" showIcon />;

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      pagination={{ pageSize: 10 }}
      rowKey="key"
      expandable={{
        expandedRowRender,
        defaultExpandedRowKeys: ['0'],
      }}
    />
  );
};

export default TableChart;
