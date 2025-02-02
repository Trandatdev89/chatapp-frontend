// const API_DOMAIN = "http://localhost:8080/";
const API_DOMAIN="https://chatapp-backend-kr6t.onrender.com/";


export const getAttachToken = async (path,token) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const postAttachToken = async (path, dataObj,token) => {
  const result = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dataObj),
  });
  const data = await result.json();
  return data;
};

export const DeleteAttachToken = async (path, id,token) => {
  const res = await fetch(`${API_DOMAIN}${path}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = res.json();
  return data;
};

export const patchAttachToken = async (path, id, dataObj,token) => {
  const result = await fetch(`${API_DOMAIN}${path}/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataObj),
  });
  const data = await result.json();
  return data;
};

export const postFormDataAttachToken = async (path, dataObj,token) => {
  const formData = new FormData();
  Object.keys(dataObj).forEach((key) => {
    if (dataObj[key] !== undefined) {
      formData.append(key, dataObj[key]);
    }
  });
  const result = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  const data = await result.json();
  return data;
};

export const putFormDataAttachToken = async (path, id, dataObj,token) => {
  const formData = new FormData();
  Object.keys(dataObj).forEach((key) => {
    if (dataObj[key] !== undefined) {
      formData.append(key, dataObj[key]);
    }
  });
  const result = await fetch(`${API_DOMAIN}${path}/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  const data = await result.json();
  return data;
};