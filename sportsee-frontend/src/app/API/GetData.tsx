import axios from "axios";

export const getUserInfos = async (userId: number): Promise<any> => {
  try {
    const response = await axios.get(`http://localhost:3000/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new Error("Unable to fetch user data. Please try again later.");
  }
};

export const getUserActivities = async (userId: number): Promise<any> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/user/${userId}/activity`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user activities:", error);
    throw new Error("Unable to fetch user activities. Please try again later.");
  }
};

export const getUserSessions = async (userId: number): Promise<any> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/user/${userId}/average-sessions`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user sessions:", error);
    throw new Error("Unable to fetch user sessions. Please try again later.");
  }
};

export const getUserPerformance = async (userId: number): Promise<any> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/user/${userId}/performance`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user performance:", error);
    throw new Error(
      "Unable to fetch user performance. Please try again later.",
    );
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
    console.error("Error fetching calorie count:", error);
    throw new Error("Unable to fetch calorie count. Please try again later.");
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
    console.error("Error fetching protein count:", error);
    throw new Error("Unable to fetch protein count. Please try again later.");
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
    console.error("Error fetching carbohydrate count:", error);
    throw new Error(
      "Unable to fetch carbohydrate count. Please try again later.",
    );
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
    console.error("Error fetching lipid count:", error);
    throw new Error("Unable to fetch lipid count. Please try again later.");
  }
};
