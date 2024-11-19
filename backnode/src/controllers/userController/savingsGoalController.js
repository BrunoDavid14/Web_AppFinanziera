const SavingsGoalService = require("../../services/savingsGoalService"); // Asegúrate de ajustar la ruta correctamente

// Crear una nueva meta de ahorro
const createSavingsGoal = async (req, res) => {
  const { nombre, monto_objetivo, fecha_inicio, fecha_fin, frecuencia, userId } = req.body;

  // Validación básica
  if (!nombre || !monto_objetivo || !fecha_inicio || !fecha_fin || !frecuencia || !userId) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // Llama al servicio para crear la meta de ahorro en la base de datos
    const newGoal = await SavingsGoalService.createSavingsGoal({
      nombre,
      monto_objetivo,
      fecha_inicio,
      fecha_fin,
      userid: userId, // Asegúrate de usar "userid" para coincidir con la base de datos
      frecuencia,
    });

    // Responde con la meta creada
    res.status(201).json(newGoal);
  } catch (error) {
    console.error("Error al crear la meta de ahorro:", error);
    res.status(500).json({ error: "Error interno del servidor al crear la meta" });
  }
};

// Obtener metas de ahorro por usuario
const getSavingsGoalsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const goals = await SavingsGoalService.getSavingsGoalsByUser(userId);

    // Responde con las metas de ahorro incluyendo los cálculos
    res.status(200).json(goals);
  } catch (error) {
    console.error("Error al obtener las metas de ahorro:", error);
    res.status(500).json({ error: "Error interno del servidor al obtener metas" });
  }
};

// Exportar controladores
module.exports = {
  createSavingsGoal,
  getSavingsGoalsByUser,
};
