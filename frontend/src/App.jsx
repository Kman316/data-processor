// src/App.js
import React, { useEffect, useState } from 'react';
import FileUpload from './components/FileUpload';
import PatternReplacement from './components/PatternReplacement';
import ProcessedData from './components/ProcessedData';
import axios from './axiosConfig';

function App() {
    const [fileId, setFileId] = useState(null);

    useEffect(() => {
        axios.get('/csrf_token/').then(response => {
            // CSRF token is set by the interceptor
        }).catch(error => {
            console.error('Error fetching CSRF token', error);
        });
    }, []);

    return (
        <div>
            <FileUpload setFileId={setFileId} />
            {fileId && <PatternReplacement fileId={fileId} />}
            {fileId && <ProcessedData fileId={fileId} />}
        </div>
    );
}

export default App;
