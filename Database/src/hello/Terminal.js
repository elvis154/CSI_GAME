import React, { useState, useEffect } from 'react';

const Terminal = () => {
    const [lines, setLines] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setLines(prev => [
                ...prev,
                `> ${new Date().toLocaleTimeString()} | Attempting to breach firewall...`
            ]);
            if (lines.length > 15) setLines(lines.slice(1));
        }, 1000);

        return () => clearInterval(interval);
    }, [lines]);

    return (
        <div className="terminal">
            {lines.map((line, index) => (
                <div key={index}>{line}</div>
            ))}
        </div>
    );
};

export default Terminal;
