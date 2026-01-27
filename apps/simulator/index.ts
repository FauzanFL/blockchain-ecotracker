import axios from "axios";

const NEST_API_URL = "http://localhost:3001/emissions/log";
const FACTORY_WALLET = "0x70997970C51812dc3A010C7d01b50e0d17dc79ee";

const simulateIoT = async () => {
  const emissionValue = Math.floor(Math.random() * (80 - 30 + 1) + 30);

  console.log(`[IoT Sensor] Emission detected: ${emissionValue} kg CO2`);

  try {
    const response = await axios.post(NEST_API_URL, {
      factoryAddress: FACTORY_WALLET,
      amount: emissionValue,
      timestamp: new Date().toISOString(),
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
setInterval(simulateIoT, 10000);
