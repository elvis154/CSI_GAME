import serial
import requests
import time
import signal
import re

server_url = "http://localhost:3050/data"
baudrate = 9600  

running = True  

def signal_handler(sig, frame):
    global running
    running = False
    print("\nInterrupt received, stopping updates...")

def parse_arduino_data(data):
    """
    Parses the received Arduino data to extract only the digits (0–9).
    """
    match = re.search(r"\b(\d+)\b", data)  
    if match:
        return {"inp": int(match.group(1))}
    return {}

signal.signal(signal.SIGINT, signal_handler)

try:
    ser = serial.Serial('/dev/ttyUSB0', baudrate=baudrate, timeout=1)

    while running:
        try:
            data = ser.readline().decode('utf-8').strip()

            if data:
                ard_data = parse_arduino_data(data)

                if ard_data:
                    response = requests.post(server_url, json=ard_data)

                    if response.status_code == 200:
                        print(f"Data sent successfully! (Inp: {ard_data['inp']})")
                    else:
                        print(f"Failed to send data: HTTP {response.status_code}")
                else:
                    print(f"Received non-numeric data: '{data}'")
            
            time.sleep(0.5)  

        except Exception as e:
            print(f"Runtime error: {e}")

except serial.SerialException as e:
    print(f"Error opening serial port: {e}")

finally:
    if 'ser' in locals() and ser.is_open:
        ser.close()
        print("Serial port closed.")

print("Exiting...")
