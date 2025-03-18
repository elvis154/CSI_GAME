import React, { useEffect, useState } from 'react';

const CPUUsage = () => {
    const [usage, setUsage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setUsage(Math.floor(Math.random() * 100));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return <div className="cpu-usage">CPU Usage: {usage}%</div>;
};

export default CPUUsage;
