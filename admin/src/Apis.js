import axios from "axios";

const backendURL = `http://localhost:8000`;

// const FIREBASE_APP_API_KEY = "AIzaSyCB3ZP1e7Wf2Pi8QFO6yy9eKIaIWTlRcSs";
// const FIREBASE_APP_AUTH_DOMAIN = "ecommerce-shopnest-d968b.firebaseapp.com";
// const FIREBASE_APP_PROJECT_ID = "ecommerce-shopnest-d968b";
// const FIREBASE_APP_STORAGE_BUCKET =
//   "ecommerce-shopnest-d968b.firebasestorage.app";
// const FIREBASE_APP_MESSAGE_IN_SENDER_ID = "752055173273";
// const FIREBASE_APP_APP_ID = "1:752055173273:web:039003a4de4c4bcdc2f808";

// POST Method
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

// GET Method
export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(backendURL + url, {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      "Content-Type": "application/json",
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Put Method
export const uploadImage = async (url, updateImg) => {
  try {
    const { res } = await axios.put(backendURL + url, updateImg, {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      "Content-Type": "multipart/form-data",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

// Put Method
export const editData = async (url, updateData) => {
  try {
    const { res } = await axios.put(backendURL + url, updateData, {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      "Content-Type": "application/json",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

// post Method
export const uploadImages = async (url, formData) => {
  try {
    const { res } = await axios.post(backendURL + url, formData, {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      "Content-Type": "multipart/form-data",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

// post Method
export const uploadBannerImages = async (url, formData) => {
  try {
    const { res } = await axios.post(backendURL + url, formData, {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      "Content-Type": "multipart/form-data",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

// DELETE Image

export const deleteImages = async (url, image) => {
  try {
    const { res } = await axios.delete(backendURL + url, image, {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      "Content-Type": "application/json",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

// POST Method
export const addData = async (url, formData) => {
  try {
    const { res } = await axios.post(backendURL + url, formData, {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      "Content-Type": "application/json",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteData = async (url) => {
  try {
    const { res } = await axios.delete(backendURL + url, {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      "Content-Type": "application/json",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMultipleData = async (url) => {
  try {
    const { res } = await axios.delete(backendURL + url, {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      "Content-Type": "application/json",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
