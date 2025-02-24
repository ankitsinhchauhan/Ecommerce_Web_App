import axios from "axios";
const backendURL = `http://localhost:8000`;

// POST
export const postData = async (url, formData) => {
  try {
    const res = await fetch(backendURL + url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      const errorData = await res.json();
      return errorData;
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

// GET
export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(backendURL + url, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
