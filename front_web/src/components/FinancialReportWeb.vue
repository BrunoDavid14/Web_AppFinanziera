<template>
    <div class="financial-report-container">
      <div class="financial-report">
        <h2>Informe Financiero Anual</h2>
        <p>Rango de fechas: {{ fechaInicio }} - {{ fechaFin }}</p>
  
        <div v-if="informe">
          <!-- Introducción al informe -->
          <h3>Resumen Ejecutivo</h3>
          <p>
            Este informe presenta un análisis detallado de los ingresos y gastos
            generados por el usuario durante el periodo indicado. El objetivo es
            proporcionar una visión clara de la situación financiera, destacando
            las fuentes de ingreso más relevantes y las categorías de gasto que
            impactaron significativamente en el balance anual.
          </p>
          <p>
            <strong>Total de Ingresos:</strong> ${{
              formatearNumero(informe.totalIngresos)
            }}
            <br />
            <strong>Total de Gastos:</strong> ${{
              formatearNumero(informe.totalGastos)
            }}
            <br />
            <strong>Balance:</strong> ${{ formatearNumero(informe.balance) }}
            <br />
          </p>
  
          <!-- Análisis del balance -->
          <h3>Análisis del Balance</h3>
          <p>
            El balance general presenta un resultado de ${{
              formatearNumero(informe.balance)
            }}. Este resultado refleja la diferencia entre los ingresos y los
            gastos en el periodo evaluado. Un balance positivo indica que los
            ingresos superaron a los gastos, lo cual es favorable para la
            estabilidad financiera. En caso de un balance negativo, se recomienda
            realizar un análisis detallado para identificar áreas de mejora.
          </p>
          <p v-if="parseFloat(informe.balance) < 0" style="color: red">
            El balance es negativo, lo cual sugiere que los gastos han superado a
            los ingresos durante este periodo. Se recomienda revisar los gastos y
            explorar formas de aumentar los ingresos o reducir los gastos.
          </p>
          <p v-else style="color: green">
            El balance es positivo, lo que indica una gestión financiera
            favorable. Sin embargo, es importante mantener un control riguroso de
            los gastos y buscar oportunidades para incrementar aún más los
            ingresos.
          </p>
  
          <!-- Desglose de Ingresos por Fuente -->
          <h3>Desglose por Fuente de Ingreso</h3>
          <p>
            A continuación, se presenta un desglose detallado de las fuentes de
            ingreso más importantes durante el periodo. Este análisis ayuda a
            identificar las áreas más rentables y evaluar la dependencia de
            fuentes específicas de ingresos.
          </p>
          <table
            v-if="Object.keys(informe.ingresosPorFuente).length > 0"
            class="report-table"
          >
            <thead>
              <tr>
                <th>Fuente de Ingreso</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(monto, fuente) in informe.ingresosPorFuente"
                :key="fuente"
              >
                <td>{{ fuente }}</td>
                <td>${{ formatearNumero(monto) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else>No hay ingresos por fuente disponibles.</div>
  
          <!-- Desglose de Gastos por Categoría -->
          <h3>Desglose por Categoría de Gasto</h3>
          <p>
            El siguiente desglose muestra las categorías de gasto más relevantes,
            lo cual permite entender mejor en qué áreas se están destinando los
            recursos y cómo se pueden optimizar dichos gastos para mejorar el
            rendimiento financiero.
          </p>
          <table
            v-if="Object.keys(informe.gastosPorCategoria).length > 0"
            class="report-table"
          >
            <thead>
              <tr>
                <th>Categoría de Gasto</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(monto, categoria) in informe.gastosPorCategoria"
                :key="categoria"
              >
                <td>{{ categoria }}</td>
                <td>${{ formatearNumero(monto) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else>No hay gastos por categoría disponibles.</div>
        </div>
  
        <!-- Botón para regresar al Dashboard -->
        <div class="button-container">
          <button @click="goToDashboard">Regresar al Dashboard</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import {
    getReceiptsByUser,
    getExpensesByUser,
  } from "@/services/AuthService.js";
  
  export default {
    name: "FinancialReport",
    data() {
      return {
        informe: null,
        fechaInicio: "2024-01-01",
        fechaFin: "2024-12-31",
      };
    },
    async created() {
      try {
        const userID = localStorage.getItem("userID");
        if (!userID) {
          console.error("No se ha encontrado el ID de usuario.");
          return;
        }
  
        const [receipts, expenses] = await Promise.all([
          getReceiptsByUser(userID),
          getExpensesByUser(userID),
        ]);
  
        if (receipts.length > 0 || expenses.length > 0) {
          const allDates = [
            ...receipts.map((r) => new Date(r.fecha)),
            ...expenses.map((e) => new Date(e.fecha)),
          ];
          const minDate = new Date(Math.min(...allDates));
          const maxDate = new Date(Math.max(...allDates));
  
          this.fechaInicio = minDate.toISOString().split("T")[0];
          this.fechaFin = maxDate.toISOString().split("T")[0];
        }
  
        this.informe = this.procesarInforme(receipts, expenses);
      } catch (error) {
        console.error("Error al cargar el informe financiero:", error);
      }
    },
    methods: {
      procesarInforme(receipts, expenses) {
        const totalIngresos = receipts.reduce(
          (total, receipt) => total + parseFloat(receipt.monto),
          0
        );
        const totalGastos = expenses.reduce(
          (total, expense) => total + parseFloat(expense.monto),
          0
        );
        const balance = totalIngresos - totalGastos;
  
        const ingresosPorFuente = receipts.reduce((acc, receipt) => {
          const fuente = receipt.fuente_nombre || "Fuente desconocida";
          acc[fuente] = (acc[fuente] || 0) + parseFloat(receipt.monto);
          return acc;
        }, {});
  
        const gastosPorCategoria = expenses.reduce((acc, expense) => {
          const categoria = expense.categoria_nombre || "Categoría desconocida";
          acc[categoria] = (acc[categoria] || 0) + parseFloat(expense.monto);
          return acc;
        }, {});
  
        return {
          totalIngresos: totalIngresos.toFixed(0), // Elimina los decimales
          totalGastos: totalGastos.toFixed(0), // Elimina los decimales
          balance: balance.toFixed(0), // Elimina los decimales
          ingresosPorFuente,
          gastosPorCategoria,
        };
      },
      formatearNumero(numero) {
        return new Intl.NumberFormat("es-ES").format(numero); // Formato con puntos
      },
      goToDashboard() {
        this.$router.push("/dashboard");
      },
    },
  };
  </script>
  
  <style scoped>
  .financial-report-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 20px;
  }
  
  .financial-report {
    width: 100%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    background-color: #fdfdfd;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    color: #2c3e50;
    font-size: 1.8em;
    margin-bottom: 10px;
  }
  
  h3 {
    color: #34495e;
    font-size: 1.4em;
    margin-top: 20px;
  }
  
  p {
    font-size: 1.1em;
    color: #555;
    margin: 5px 0;
    text-align: justify; /* Justificar texto */
  }
  
  .report-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
  }
  
  .report-table th,
  .report-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.1em;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  </style>
  