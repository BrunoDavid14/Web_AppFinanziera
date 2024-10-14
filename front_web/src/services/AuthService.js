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

export const receipts = async (monto, fuenteid, fecha, descripcion, userid) => {
  try {
    const response = await axios.post(`${API_URL}ingresos`, {
      monto,
      fuenteid,
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

export const getSources = async () => {
  try {
    const response = await axios.get(`${API_URL}fuentes`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener las fuentes:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Error al obtener las fuentes de ingreso");
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

export const expenses = async (
  monto,
  categoriaid,
  fecha,
  descripcion,
  userid
) => {
  try {
    const response = await axios.post(`${API_URL}gastos`, {
      monto,
      categoriaid,
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
    throw new Error("Error al registrar el gasto");
  }
};

export const GetSources = async () => {
  try {
    const response = await axios.get(`${API_URL}categorias`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener las categorias:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Error al obtener las categorias de gasto");
  }
};

export const getExpensesByUser = async (userid) => {
  try {
    const response = await axios.get(`${API_URL}gastos/${userid}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener los gastos:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Error al obtener los gastos");
  }
};
