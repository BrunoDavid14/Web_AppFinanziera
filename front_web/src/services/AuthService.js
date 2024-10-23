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

export const createBudget = async (budgetData) => {
  try {
    const response = await axios.post(`${API_URL}budgetscreate`, budgetData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el presupuesto:", error);
    throw error;
  }
};

export const getAllBudgets = async () => {
  try {
    const response = await axios.get(`${API_URL}budgets`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los presupuestos:", error);
    throw error;
  }
};

export const getBudgetById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}budgets/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el presupuesto:", error);
    throw error;
  }
};

export const createInvestment = async (investmentData) => {
  try {
    const response = await axios.post(`${API_URL}investments`, investmentData);
    return response.data;
  } catch (error) {
    console.error("Error al crear la inversión:", error);
    throw new Error("Error al registrar la inversión");
  }
};

export const getInvestmentsByUser = async () => {
  const token = localStorage.getItem("token");
  const userid = localStorage.getItem("userID");
  if (!userid) {
    throw new Error("User ID no encontrado en el localStorage");
  }
  try {
    const response = await axios.get(`${API_URL}investments/${userid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener las inversiones:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Error al obtener las inversiones");
  }
};
