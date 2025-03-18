import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const HackerChart = () => {
    const [data, setData] = useState([65, 59, 80, 81, 56, 55, 40]);

    useEffect(() => {
        const interval = setInterval(() => {
            setData((prevData) => [...prevData.slice(1), Math.floor(Math.random() * 100)]);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ width: '80%', margin: '20px auto' }}>
            <Line
                data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                    datasets: [
                        {
                            label: 'Hacking Progress',
                            data: data,
                            borderColor: '#00ff00',
                            backgroundColor: 'rgba(0, 255, 0, 0.1)',
                        },
                    ],
                }}
                options={{
                    responsive: true,
                    scales: {
                        x: { ticks: { color: '#00ff00' } },
                        y: { ticks: { color: '#00ff00' } },
                    },
                    plugins: {
                        legend: { labels: { color: '#00ff00' } },
                    },
                }}
            />
        </div>
    );
};

export default HackerChart;
