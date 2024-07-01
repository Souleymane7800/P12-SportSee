import axios from "axios";

export const getUserInfos = async (userId: number): Promise<any> => {
  try {
    const response = await axios.get(`http://localhost:3000/user/${userId}`);
    return response.data;
  } catch (error) {
    // console.error("Error fetching user data:", error);
    return { error: "Unable to fetch user data. Please try again later." };
  }
};

export const getUserActivities = async (userId: number): Promise<any> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/user/${userId}/activity`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserSessions = async (userId: number): Promise<any> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/user/${userId}/average-sessions`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserPerformance = async (userId: number): Promise<any> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/user/${userId}/performance`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCalorieCount = async (userId: number): Promise<any> => {
  try {
    const response = await fetch(`http://localhost:3000/user/${userId}`);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data.data.keyData.calorieCount;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error(`Error fetching data: ${error}`);
  }
};

export const getProteineCount = async (userId: number): Promise<any> => {
  try {
    const response = await fetch(`http://localhost:3000/user/${userId}`);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data.data.keyData.proteinCount;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error(`Error fetching data: ${error}`);
  }
};

export const getGlucideCount = async (userId: number): Promise<any> => {
  try {
    const response = await fetch(`http://localhost:3000/user/${userId}`);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data.data.keyData.carbohydrateCount;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error(`Error fetching data: ${error}`);
  }
};

export const getLipideCount = async (userId: number): Promise<any> => {
  try {
    const response = await fetch(`http://localhost:3000/user/${userId}`);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data.data.keyData.lipidCount;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error(`Error fetching data: ${error}`);
  }
};