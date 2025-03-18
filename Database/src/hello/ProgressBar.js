import React, { useState, useEffect } from 'react';

const ProgressBar = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => (prev < 100 ? prev + 0.5 : 0)); // Slower increment
        }, 200); // Increased interval time for slower updates

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="progress-bar" style={{ width: '100%', backgroundColor: '#222', borderRadius: '5px', padding: '2px' }}>
            <div
                style={{
                    width: `${progress}%`,
                    height: '20px',
                    backgroundColor: '#00ff00',
                    transition: 'width 0.2s ease-in-out' // Smooth transition
                }}
            />
        </div>
    );
};

export default ProgressBar;
