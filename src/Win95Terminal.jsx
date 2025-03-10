import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./terminal.css";

const generateRandomPosition = () => ({
  top: `${Math.random() * 60 + 10}%`,
  left: `${Math.random() * 60 + 10}%`,
});

const generateRandomLine = () => {
  const commands = [
    "C:\\WINDOWS\\SYSTEM32> Loading Kernel...",
    "C:\\WINDOWS\\SYSTEM32> Verifying files...",
    "C:\\WINDOWS\\SYSTEM32> Executing DOS command...",
    "C:\\WINDOWS\\SYSTEM32> Memory check: OK",
    "C:\\WINDOWS\\SYSTEM32> Running program.exe",
    "C:\\WINDOWS\\SYSTEM32> Error: Bad command or file name",
    "C:\\WINDOWS\\SYSTEM32> Initializing network...",
    "C:\\WINDOWS\\SYSTEM32> Checking disk integrity...",
    "C:\\WINDOWS\\SYSTEM32> Running CHKDSK...",
  ];
  return commands[Math.floor(Math.random() * commands.length)];
};

const TerminalWindow = ({ onClose }) => {
  const [logs, setLogs] = useState([]);
  const [position, setPosition] = useState(generateRandomPosition());

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prevLogs) => [...prevLogs, generateRandomLine()].slice(-20));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="terminal-container" style={position}>
      <div className="terminal-header">
        <span className="terminal-title">MS-DOS Prompt</span>
        <button className="exit-button" onClick={onClose}>X</button>
      </div>
      <div className="terminal-body">
        {logs.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
};

const Win95Terminal = () => {
  const navigate = useNavigate();
  const [terminals, setTerminals] = useState([{ id: Date.now() }]);

  const addTerminal = () => {
    setTerminals((prev) => [...prev, { id: Date.now() }]);
  };

  const removeTerminal = (id) => {
    setTerminals((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        addTerminal(); // Add a new terminal randomly
      } else if (terminals.length > 1) {
        removeTerminal(terminals[0].id); // Remove a terminal randomly
      }
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [terminals]);

  return (
    <>
      {terminals.map((term) => (
        <TerminalWindow key={term.id} onClose={() => removeTerminal(term.id)} />
      ))}
      <button className="return-button" onClick={() => navigate("/")}>
        Return to Login
      </button>
    </>
  );
};

export default Win95Terminal;
