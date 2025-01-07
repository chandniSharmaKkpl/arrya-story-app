import AsyncStorage from '@react-native-async-storage/async-storage';
import { WordConstants } from '../constants/WordConstants';

const setUserData = async (data: any): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(WordConstants.userData, JSON.stringify(data));
    return true; // Successfully set data
  } catch (error) {
    console.error("Error saving user data:", error);
    return false; // Error occurred while setting data
  }
};

const getUserData = async (): Promise<any> => {
  try {
    const temp = await AsyncStorage.getItem(WordConstants.userData);
    if (temp) {
      return JSON.parse(temp); // Data found, return parsed object
    } else {
      return {}; // No data found, return empty object
    }
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return {}; // Return empty object in case of an error
  }
};

export default {
  setUserData,
  getUserData,
};
