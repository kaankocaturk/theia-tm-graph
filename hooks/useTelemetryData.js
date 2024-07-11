// hooks/useTelemetryData.js
import { useState, useEffect } from 'react';
import { fetchData } from './api';

const useTelemetryData = (url, method = 'GET', body = null) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await fetchData(url, method, body);
        const formattedData = result.data.map((item, index) => ({
          ...item,
          key: index,
        }));
        setData(formattedData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [url, method, body]);

  
  return { data, loading, error };
};

export default useTelemetryData;
