import React, { useEffect, useState } from 'react';

const IPScanner = () => {
    const [ip, setIp] = useState('Scanning...');

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIp = `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
            setIp(randomIp);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return <div className="ip-scanner">Scanning IP: {ip}</div>;
};

export default IPScanner;
