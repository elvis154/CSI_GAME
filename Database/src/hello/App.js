import React, { useEffect } from 'react';
import MatrixEffect from './MatrixEffect';
import Terminal from './Terminal';
import IPScanner from './IPScanner';
import ProgressBar from './ProgressBar';
import CPUUsage from './CPUUsage';
import AccessStatus from './AccessStatus';

const App = () => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            // Example: Ctrl + Alt + G to open Google
            if (event.ctrlKey && event.altKey && event.key === 'x') {
                window.open('/hacking');
            }
        };

        // Add event listener for keydown
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup event listener when component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="app-container">
            {/* Matrix effect will stay in the background */}
            <MatrixEffect />

            {/* All other components are layered on top */}
            <div className="content">
                <Terminal />
                <IPScanner />
                <ProgressBar />
                <CPUUsage />
                <AccessStatus />
                <button className="button">START HACK</button>
            </div>
        </div>
    );
};

export default App;
