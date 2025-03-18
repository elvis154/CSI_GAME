import React, { useState, useEffect } from 'react';

const AccessStatus = () => {
    const [status, setStatus] = useState('Access Denied');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setStatus('ACCESS GRANTED');
        }, 5000);

        return () => clearTimeout(timeout);
    }, []);

    return <div className={`glitch ${status === 'ACCESS GRANTED' ? 'granted' : 'denied'}`}>{status}</div>;
};

export default AccessStatus;
