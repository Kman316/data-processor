// src/components/ProcessedData.js
import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

function ProcessedData({ fileId }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/process/${fileId}/`);
                console.log('Raw data:', response.data); // Log raw data
                if (response.data && typeof response.data === 'object') {
                    const processedArray = Object.keys(response.data).map(key => ({
                        key,
                        value: response.data[key]
                    }));
                    setData(processedArray);
                } else {
                    console.error('Processed data is not in a usable format:', response.data);
                    setData([]);
                }
            } catch (error) {
                console.error('Error fetching processed data:', error);
                setData([]);
            }
        };

        fetchData();
    }, [fileId]);

    if (!data.length) {
        return <div>No data to display</div>;
    }

    return (
        <div>
            <h2>Processed Data</h2>
            {data.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            {Object.keys(data[0].value).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {Object.entries(row.value).map(([key, value], idx) => (
                                <td key={idx}>{typeof value === 'string' && value.includes('@') ? 'REDACTED' : value}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
}

export default ProcessedData;
