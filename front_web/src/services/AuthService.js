import axios from "axios";

const API_URL = "http://localhost:4000/";

export const login = async (correo, password) => {
  const response = await axios.post(`${API_URL}login`, { correo, password });
  return response.data;
};

export const register = async (nombre, correo, password) => {
  const response = await axios.post(`${API_URL}register`, {
    nombre,
    correo,
    password,
  });
  return response.data; // Retorna la respuesta del servidor
};
