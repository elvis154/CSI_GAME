import React, { useEffect, useRef } from 'react';

const MatrixEffect = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()';
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = Array.from({ length: columns }).fill(1);

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00ff00';
            ctx.font = `${fontSize}px Courier`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // **Reset with lower probability for slower refresh**
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) {
                    drops[i] = 0;
                }

                // **Slower falling speed by decreasing increment**
                drops[i] += 0.5; // Change from `1` to `0.5`
            }
        };

        // **Slower interval time**
        const interval = setInterval(draw, 90); // Increased from 33ms to 100ms

        return () => clearInterval(interval);
    }, []);

    return <canvas ref={canvasRef} className="matrix-effect" />;
};

export default MatrixEffect;
