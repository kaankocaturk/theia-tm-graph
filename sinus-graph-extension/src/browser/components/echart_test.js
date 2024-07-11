import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import useTelemetryData from '../../../../hooks/useTelemetryData';
import { Spin, Alert } from 'antd';

const EchartExample = () => {
  const [chartOptions, setChartOptions] = useState(null);
  const { data, loading, error } = useTelemetryData('/assets/sinusoidal_telemetry_dataset.json');

  useEffect(() => {
    if (!loading && data.length > 0) {
      const series = data.map(sensor => ({
        name: sensor.name,
        type: 'line',
        data: sensor.time_series.map(point => [point.time, point.value]), 
      }));

      const options = {
        title: {
          text: 'Telemetry Data'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: data.map(sensor => sensor.name),
          textStyle : {
            color : "white"
          }
        },
        xAxis: {
          type: 'category',
          data: data[0].time_series.map(point => point.time),
          name: 'Time',

        },
        yAxis: {
          type: 'value',
          name: 'Amplitude',

        },
        series: series
      };

      setChartOptions(options);
    }
  }, [loading, data]);

  if (loading) return <Spin tip="Loading..." />;
  if (error) return <Alert message="Error" description={error.message} type="error" showIcon />;

  return chartOptions ? (
    <ReactEcharts option={chartOptions} />
  ) : (
    <div>No data available</div>
  );
};

export default EchartExample;
