import React, { useEffect, useState, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { motion } from "framer-motion";
import "./Windows95Matrix.css";

const generateRecursiveCode = (depth = 1) => {
  return `
  function recursiveFunction(level) {
    if (level > ${depth}) return;
    console.log('Entering level:', level);
    recursiveFunction(level + 1);
    console.log('Exiting level:', level);
  }
    /* Windows95Matrix.css */

.terminal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #008080;
  overflow: hidden;
}

.terminal-box {
  background-color: black;
  color: lime;
  font-family: "Courier New", monospace;
  border: 3px solid gray;
  box-shadow: 4px 4px 0px #fff;
  padding: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
}

.terminal-header {
  background-color: #c0c0c0;
  padding: 5px;
  font-size: 14px;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid gray;
}

.terminal-content {
  flex-grow: 1;
  padding: 10px;
  white-space: pre-wrap;
  overflow-y: auto;
  font-size: 14px;
  line-height: 1.5;
  text-shadow: 0px 0px 5px lime;
  max-height: 65vh;
}

.terminal-content::-webkit-scrollbar {
  width: 5px;
}

.terminal-content::-webkit-scrollbar-thumb {
  background: lime;
}

.chart-container {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.status-bar {
  text-align: center;
  font-size: 14px;
  color: green;
  border-top: 1px solid green;
  padding: 5px;
}

  recursiveFunction(1);
  `;
};

const TerminalText = () => {
  const [code, setCode] = useState("");
  const [depth, setDepth] = useState(1);
  const terminalRef = useRef(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      const newCode = generateRecursiveCode(depth);
      setCode(newCode.slice(0, index));
      index += 5;
      if (index > newCode.length) {
        index = 0;
        setDepth((prevDepth) => prevDepth + 1);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [depth]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [code]);

  return (
    <motion.div 
      className="terminal-content"
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      ref={terminalRef}
    >
      {code}
    </motion.div>
  );
};

const Windows95Matrix = () => {
  const generateChartData = () => Array.from({ length: 15 }, () => ({
    name: Math.floor(Math.random() * 100),
    value: Math.floor(Math.random() * 50) + 10,
  }));

  const [data1, setData1] = useState(generateChartData());
  const [data2, setData2] = useState(generateChartData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData1(generateChartData());
      setData2(generateChartData());
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="terminal-container"
      animate={{ x: [-10, 10, -10], y: [-5, 5, -5] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
    >
      <div className="terminal-box" style={{ width: "90vw", height: "90vh" }}>
        <div className="terminal-header">
          <span>C:\\Windows\\System32\\cmd.exe</span>
          <span className="cursor-pointer">X</span>
        </div>
        <TerminalText />
        <div className="chart-container">
          <LineChart width={500} height={250} data={data1}>
            <CartesianGrid strokeDasharray="3 3" stroke="green" />
            <XAxis dataKey="name" stroke="green" />
            <YAxis stroke="green" />
            <Tooltip contentStyle={{ backgroundColor: "black", color: "green" }} />
            <Line type="monotone" dataKey="value" stroke="lime" strokeWidth={2} />
          </LineChart>
          <LineChart width={500} height={250} data={data2}>
            <CartesianGrid strokeDasharray="3 3" stroke="green" />
            <XAxis dataKey="name" stroke="green" />
            <YAxis stroke="green" />
            <Tooltip contentStyle={{ backgroundColor: "black", color: "green" }} />
            <Line type="monotone" dataKey="value" stroke="cyan" strokeWidth={2} />
          </LineChart>
        </div>
        <div className="status-bar">System Status: Online</div>
      </div>
    </motion.div>
  );
};

export default Windows95Matrix;
