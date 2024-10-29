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

export const editReceipt = async (idingreso, monto, fecha, descripcion) => {
  try {
    const response = await axios.put(`${API_URL}ingresos/${idingreso}`, {
      monto,
      fecha,
      descripcion,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al editar el ingreso:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Error al editar el ingreso");
  }
};

export const getReceiptHistory = async (idingreso) => {
  try {
    const response = await axios.get(
      `${API_URL}ingresos/${idingreso}/historial`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener el historial del ingreso:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Error al obtener el historial del ingreso");
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

export const createCategory = async (nombre) => {
  try {
    const response = await axios.post(`${API_URL}categorias`, { nombre });
    return response.data;
  } catch (error) {
    console.error(
      "Error al crear la categoría:",
      error.response ? error.response.data : error.message,
      "Status:",
      error.response ? error.response.status : "No hay status"
    );
    throw new Error("Error al crear la categoría de gasto");
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

export const editExpenses = async (idgasto, monto, fecha, descripcion) => {
  try {
    const response = await axios.put(`${API_URL}gastos/${idgasto}`, {
      monto,
      fecha,
      descripcion,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al editar el gasto:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Error al editar el gasto");
  }
};

export const getExpensesHistory = async (idgasto) => {
  try {
    const response = await axios.get(`${API_URL}gastos/${idgasto}/historial`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener el historial del gasto:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Error al obtener el historial del gasto");
  }
};

export const createBudget = async (
  name,
  totalAmount,
  startDate,
  endDate,
  userid
) => {
  try {
    const response = await axios.post(`${API_URL}budgetscreate`, {
      name,
      totalAmount,
      startDate,
      endDate,
      userid,
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el presupuesto:", error);
    throw error;
  }
};

export const getBudgetsByUser = async (userid) => {
  try {
    const response = await axios.get(`${API_URL}budgets/${userid}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener los presupuestos:",
      error.response ? error.response.data : error.message
    );
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
