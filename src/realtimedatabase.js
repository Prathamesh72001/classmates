// src/firebaseUtils.js
import { database } from "./firebase"; // Import your initialized Firebase app
import { ref, get, set, query, orderByChild, equalTo,remove } from "firebase/database";

// **Fetch Data by Path**: Fetch data from a specific path (e.g., users, posts)
export const fetchDataByPath = async (path) => {
  const dbRef = ref(database, path);
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      return snapshot.val(); // Return data at the specified path
    } else {
      console.log("No data found at path:", path);
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const addDataByPath = async (path, data) => {
  const dbRef = ref(database, path);
  try {
    await set(dbRef, data)
      .then(() => {
        console.log("Success");
        return true;
      })
      .catch((error) => {
        console.error("Error adding data:", error);
        return false;
      });
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const removeDataByPath = async (path, data) => {
  const dbRef = ref(database, path);
  try {
    await remove(dbRef, data)
      .then(() => {
        console.log("Success");
        return true;
      })
      .catch((error) => {
        console.error("Error adding data:", error);
        return false;
      });
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// **Fetch Data with Field Filter**: Query and filter data by a field name and value
export const fetchDataByField = async (path, fieldName, fieldValue) => {
  const dbRef = ref(database, path);
  const filteredQuery = query(
    dbRef,
    orderByChild(fieldName),
    equalTo(fieldValue)
  ); // Query based on field and value
  try {
    const snapshot = await get(filteredQuery);
    if (snapshot.exists()) {
      return snapshot.val(); // Return filtered data
    } else {
      console.log(`No data found for ${fieldName} = ${fieldValue}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching filtered data:", error);
    throw error;
  }
};
