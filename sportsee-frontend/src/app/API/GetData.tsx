import axios from "axios";

/**
 * Fetches user information from the API.
 * @async
 * @function
 * @param {number} userId - The ID of the user to fetch information for
 * @returns {Promise<any>} The user information
 * @throws {Error} If unable to fetch user data
 */
export const getUserInfos = async (userId: number): Promise<any> => {
  try {
    const response = await axios.get(`http://localhost:3000/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new Error("Unable to fetch user data. Please try again later.");
  }
};

/**
 * Fetches user activities from the API.
 * @async
 * @function
 * @param {number} userId - The ID of the user to fetch activities for
 * @returns {Promise<any>} The user activities
 * @throws {Error} If unable to fetch user activities
 */
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

/**
 * Fetches user average sessions from the API.
 * @async
 * @function
 * @param {number} userId - The ID of the user to fetch sessions for
 * @returns {Promise<any>} The user average sessions
 * @throws {Error} If unable to fetch user sessions
 */
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

/**
 * Fetches user performance data from the API.
 * @async
 * @function
 * @param {number} userId - The ID of the user to fetch performance for
 * @returns {Promise<any>} The user performance data
 * @throws {Error} If unable to fetch user performance
 */
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

/**
 * Fetches user calorie count from the API.
 * @async
 * @function
 * @param {number} userId - The ID of the user to fetch calorie count for
 * @returns {Promise<number>} The user's calorie count
 * @throws {Error} If unable to fetch calorie count
 */
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

/**
 * Fetches user protein count from the API.
 * @async
 * @function
 * @param {number} userId - The ID of the user to fetch protein count for
 * @returns {Promise<number>} The user's protein count
 * @throws {Error} If unable to fetch protein count
 */
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

/**
 * Fetches user carbohydrate count from the API.
 * @async
 * @function
 * @param {number} userId - The ID of the user to fetch carbohydrate count for
 * @returns {Promise<number>} The user's carbohydrate count
 * @throws {Error} If unable to fetch carbohydrate count
 */
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

/**
 * Fetches user lipid count from the API.
 * @async
 * @function
 * @param {number} userId - The ID of the user to fetch lipid count for
 * @returns {Promise<number>} The user's lipid count
 * @throws {Error} If unable to fetch lipid count
 */
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
