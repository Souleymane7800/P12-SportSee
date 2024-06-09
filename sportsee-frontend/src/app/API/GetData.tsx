import axios from "axios";

export const getUserInfos = async (userId: number): Promise<any> => {
  try {
    const response = await axios.get(`http://localhost:3000/user/${userId}`);
    console.log('User',response.data);
    return response.data;
  } catch (error) {
    // console.error(error);
    // return null;
    console.error("Error fetching user data:", error);
    return { error: "Unable to fetch user data. Please try again later." };
  }
};

export const getUserActivities = async (userId: number): Promise<any> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/user/${userId}/activity`,
    );
    console.log('Activity',response.data);
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
    console.log('Session',response.data);
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
    console.log('Performance',response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};


// export const getUserIds = async (): Promise<number[]> => {
//   try {
//     const response = await axios.get('http://localhost:3000');
//     console.log('IDUSERS',response.data);
    
//     return response.data; // Assume the API returns an array of IDs
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };