import axios from "axios";

// Base URL for the API
const BASE_API_URL = "http://localhost:5000/";

/**
 * Function to fetch items of a specified type from the API.
 * @param {string} type - The type of items to fetch.
 * @returns {Promise<any>} - A promise resolving to the fetched data.
 */
export async function getItems(type) {
  try {
    const { data } = await axios.get(BASE_API_URL + type);
    return data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error; // Re-throwing the error for potential handling by caller
  }
}

/**
 * Function to add an item of a specified type to the API.
 * @param {object} item - The item to add.
 * @param {string} type - The type of item to add.
 * @returns {Promise<{ message: string }>} - A promise resolving to an object with a success message.
 */
export async function addItem(item, type) {
  try {
    await axios.post(BASE_API_URL + type, item);
    return {
      message: "Successfully added"
    };
  } catch (error) {
    console.error("Error adding item:", error);
    throw error; // Re-throwing the error for potential handling by caller
  }
}