const db = require('../../db');

// Función para calcular el monto por intervalo basado en la frecuencia
const calculateAmountPerInterval = (goal) => {
  const { monto_objetivo, fecha_inicio, fecha_fin, frecuencia } = goal;

  const startDate = new Date(fecha_inicio);
  const endDate = new Date(fecha_fin);

  const diffTime = Math.abs(endDate - startDate);
  let intervals;

  switch (frecuencia.toLowerCase()) {
    case 'diario':
      intervals = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Días totales
      break;
    case 'semanal':
      intervals = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7)); // Semanas totales
      break;
    case 'mensual':
      intervals =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth()); // Meses totales
      break;
    case 'anual':
      intervals = endDate.getFullYear() - startDate.getFullYear(); // Años totales
      break;
    default:
      intervals = 1; // Para evitar divisiones por 0
  }

  return intervals > 0 ? monto_objetivo / intervals : monto_objetivo;
};

// Función para obtener todas las metas de ahorro de un usuario
const getSavingsGoalsByUser = async (userId) => {
  try {
    const query = 'SELECT * FROM savings_goals WHERE userid = $1;';
    const { rows } = await db.query(query, [userId]);

    // Añadir el cálculo del monto por intervalo a cada meta
    return rows.map((goal) => ({
      ...goal,
      monto_por_intervalo: calculateAmountPerInterval(goal).toFixed(2), // Redondear a 2 decimales
    }));
  } catch (error) {
    console.error('Error en el servicio getSavingsGoalsByUser:', error);
    throw new Error('Error al obtener las metas de ahorro');
  }
};

// Función para crear una meta de ahorro
const createSavingsGoal = async (goalData) => {
  try {
    const { nombre, monto_objetivo, fecha_inicio, fecha_fin, userid, frecuencia } = goalData;
    const query = `
      INSERT INTO savings_goals (nombre, monto_objetivo, fecha_inicio, fecha_fin, userid, frecuencia)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `;
    const { rows } = await db.query(query, [nombre, monto_objetivo, fecha_inicio, fecha_fin, userid, frecuencia]);
    return rows[0];
  } catch (error) {
    console.error('Error en el servicio createSavingsGoal:', error);
    throw new Error('Error al crear la meta de ahorro');
  }
};

module.exports = {
  getSavingsGoalsByUser,
  createSavingsGoal,
};
