import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const API_URL = process.env.API_URL || "http://localhost:3000";
const FACTORY_WALLET = process.env.FACTORY_ADDRESS;
const INTERVAL = parseInt(process.env.INTERVAL || "10000");

const simulateIoT = async () => {
  const emissionValue = Math.floor(Math.random() * (80 - 30 + 1) + 30);

  console.log(`[IoT Sensor] Emission detected: ${emissionValue} kg CO2`);

  try {
    const response = await axios.post(`${API_URL}/emissions/log`, {
      factoryAddress: FACTORY_WALLET,
      amount: emissionValue,
    });

    console.log(`[Backend] Response: ${response.data.message}`);
    if (response.data.txHash) {
      console.log(
        `[Blockchain] Transaction success! Hash: ${response.data.txHash}`,
      );
    }
  } catch (error) {
    console.error(`[Error] Failed to send data: ${error}`);
  }
};

console.log("Starting IoT Simulator...");
simulateIoT();
setInterval(simulateIoT, INTERVAL);
