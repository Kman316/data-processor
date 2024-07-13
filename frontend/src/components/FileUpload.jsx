// src/components/FileUpload.js

import React, { useState } from 'react';
import axios from '../axiosConfig';
import { getCSRFToken } from '../utils/csrf';

function FileUpload({ setFileId }) {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = () => {
        const formData = new FormData();
        formData.append('file', file);

        axios.post('/upload/', formData, {
            headers: {
                'X-CSRFToken': getCSRFToken()
            }
        })
        .then(response => {
            setFileId(response.data.file_id);
        })
        .catch(error => {
            console.error('Error uploading file', error);
        });
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload</button>
        </div>
    );
}

export default FileUpload;
