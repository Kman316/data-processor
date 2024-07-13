// src/components/PatternReplacement.js
import React, { useState } from 'react';
import axios from '../axiosConfig';
import { getCSRFToken } from '../utils/csrf';

function PatternReplacement({ fileId }) {
    const [patternDesc, setPatternDesc] = useState(''); // This field will be for email regex description
    const [replacement, setReplacement] = useState('REDACTED');

    const handlePatternChange = (e) => {
        setPatternDesc(e.target.value);
    };

    const handleReplacementChange = (e) => {
        setReplacement(e.target.value);
    };

    const handlePatternMatch = () => {
        axios.post(`match_and_replace/${fileId}/`, {
            pattern_desc: patternDesc,
            replacement: replacement
        }, {
            headers: {
                'X-CSRFToken': getCSRFToken()
            }
        })
        .then(response => {
            console.log('Pattern matched and replaced', response.data);
        })
        .catch(error => {
            console.error('Error matching and replacing pattern', error);
        });
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Pattern description (e.g., email addresses)" 
                value={patternDesc} 
                onChange={handlePatternChange} 
            />
            <input 
                type="text" 
                placeholder="Replacement value" 
                value={replacement} 
                onChange={handleReplacementChange} 
            />
            <button onClick={handlePatternMatch}>Match and Replace</button>
        </div>
    );
}

export default PatternReplacement;
