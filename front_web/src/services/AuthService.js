import axios from "axios";

const API_URL = "http://localhost:4000/";

export const login = async (correo, password) => {
  const response = await axios.post(`${API_URL}login`, { correo, password });
  return response.data;
};

export const register = async (nombre, correo, password, acceptpolicies) => {
  const response = await axios.post(`${API_URL}register`, {
    nombre,
    correo,
    password,
    acceptpolicies,
  });
  return response.data; // Retorna la respuesta del servidor
};

export const receipts = async (monto, fuente, fecha, descripcion, userid) => {
  try {
    const response = await axios.post(`${API_URL}ingresos`, {
      monto,
      fuente,
      fecha,
      descripcion,
      userid,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al hacer la solicitud:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Error al registrar el ingreso");
  }
};

export const getReceiptsByUser = async (userid) => {
  try {
    const response = await axios.get(`${API_URL}ingresos/${userid}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener los ingresos:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Error al obtener los ingresos");
  }
};
