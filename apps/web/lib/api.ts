const API_URL = process.env.API_URL || "http://localhost:3001";

export const getEmissionBalance = async (address: string) => {
  const response = await fetch(`${API_URL}/emissions/balance/${address}`);
  return response.json();
};

export const getFactoryStats = async (address: string) => {
  const response = await fetch(`${API_URL}/emissions/stats/${address}`);
  return response.json();
};
