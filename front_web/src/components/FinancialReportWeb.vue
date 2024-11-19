<template>
  <div class="financial-report-container">
    <div class="financial-report">
      <h2>Informe Financiero Anual</h2>
      <h5>Rango de fechas: {{ fechaInicio }} - {{ fechaFin }}</h5>

      <div v-if="informe">
        <!-- Introducción al informe -->
        <h3>Introducción</h3>
        <p>
          Este informe tiene como objetivo analizar el estado financiero del usuario durante el periodo seleccionado.
          Incluye un desglose detallado de los ingresos, gastos y un balance general. Además, se presentan 
          recomendaciones para mejorar la estabilidad financiera.
        </p>

        <!-- Resumen Ejecutivo -->
        <h3>Resumen Ejecutivo</h3>
        <p>
          Durante el periodo evaluado, el total de ingresos ascendió a <strong>${{ formatearNumero(informe.totalIngresos) }}</strong>, mientras que los gastos 
          totalizaron <strong>${{ formatearNumero(informe.totalGastos) }}</strong>. Esto resultó en un balance de <strong>${{ formatearNumero(informe.balance) }}</strong>.
        </p>
        <p v-if="parseFloat(informe.balance) < 0" style="color: red">
          El balance es negativo, indicando que los gastos superaron los ingresos. Se recomienda priorizar la optimización de gastos.
        </p>
        <p v-else style="color: green">
          El balance es positivo, lo cual refleja un manejo financiero favorable. Se sugiere continuar monitoreando los gastos para mantener esta tendencia.
        </p>

        <!-- Desglose de Ingresos -->
        <h3>Desglose por Fuente de Ingreso</h3>
        <p>
          Los ingresos generados provienen de las siguientes fuentes. Este análisis permite identificar las áreas 
          más rentables y tomar decisiones estratégicas para diversificar los ingresos.
        </p>
        <table v-if="Object.keys(informe.ingresosPorFuente).length > 0" class="report-table">
          <thead>
            <tr>
              <th>Fuente de Ingreso</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(monto, fuente) in informe.ingresosPorFuente" :key="fuente">
              <td>{{ fuente }}</td>
              <td>${{ formatearNumero(monto) }}</td>
            </tr>
          </tbody>
        </table>
        <div v-else>No se encontraron ingresos registrados.</div>

        <!-- Desglose de Gastos -->
        <h3>Desglose por Categoría de Gasto</h3>
        <p>
          A continuación se detalla cómo se distribuyeron los gastos durante el periodo. Esto ayuda a identificar 
          áreas donde podrían reducirse costos para mejorar el balance.
        </p>
        <table v-if="Object.keys(informe.gastosPorCategoria).length > 0" class="report-table">
          <thead>
            <tr>
              <th>Categoría de Gasto</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(monto, categoria) in informe.gastosPorCategoria" :key="categoria">
              <td>{{ categoria }}</td>
              <td>${{ formatearNumero(monto) }}</td>
            </tr>
          </tbody>
        </table>
        <div v-else>No se encontraron gastos registrados.</div>

        <!-- Conclusión -->
        <h3>Conclusión</h3>
        <p>
          Este análisis financiero refleja la situación actual del usuario. Es importante mantener un balance 
          positivo, diversificar las fuentes de ingreso y reducir gastos innecesarios. Se recomienda realizar 
          un seguimiento periódico de los ingresos y gastos para tomar decisiones informadas.
        </p>
      </div>

      <div class="button-container">
        <button @click="goToDashboard">Regresar al Dashboard</button>
        <button @click="generarPDF" style="margin-left: 10px;">Descargar PDF</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getReceiptsByUser,
  getExpensesByUser,
} from "@/services/AuthService.js";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
        totalIngresos: totalIngresos.toFixed(0),
        totalGastos: totalGastos.toFixed(0),
        balance: balance.toFixed(0),
        ingresosPorFuente,
        gastosPorCategoria,
      };
    },
    formatearNumero(numero) {
      return new Intl.NumberFormat("es-ES").format(numero);
    },
    goToDashboard() {
      this.$router.push("/dashboard");
    },
    generarPDF() {
      const doc = new jsPDF();

      // Título principal
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Informe Financiero Anual", 105, 15, { align: "center" });

      // Fechas
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Rango de fechas: ${this.fechaInicio} - ${this.fechaFin}`, 105, 25, { align: "center" });

      // Introducción
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Introducción", 10, 40);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text(
        "Este informe tiene como objetivo analizar el estado financiero del usuario durante el periodo seleccionado. " +
        "Incluye un desglose detallado de los ingresos, gastos y un balance general. Además, se presentan recomendaciones para mejorar la estabilidad financiera.",
        10,
        45,
        { maxWidth: 190 }
      );

      // Resumen Ejecutivo
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Resumen Ejecutivo", 10, 75);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text(
        `Durante el periodo evaluado, el total de ingresos ascendió a $${this.formatearNumero(this.informe.totalIngresos)}, ` +
        `mientras que los gastos totalizaron $${this.formatearNumero(this.informe.totalGastos)}. ` +
        `Esto resultó en un balance de $${this.formatearNumero(this.informe.balance)}.`,
        10,
        80,
        { maxWidth: 190 }
      );

      // Indicador de balance
      const balanceTexto = parseFloat(this.informe.balance) < 0 
        ? "El balance es negativo, indicando que los gastos superaron los ingresos." 
        : " El balance es positivo, lo cual refleja un manejo financiero favorable.";

      const balanceColor = parseFloat(this.informe.balance) < 0 ? [255, 0, 0] : [0, 128, 0];
      doc.setTextColor(...balanceColor);
      doc.setFontSize(12);
      doc.text(balanceTexto, 10, 95);
      doc.setTextColor(0, 0, 0); // Reiniciar color

      // Desglose de Ingresos
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Desglose por Fuente de Ingreso", 10, 110);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text(
        "En esta sección se detalla cada fuente de ingreso registrada durante el periodo seleccionado, junto con el monto total asociado a cada una.",
        10,
        115,
        { maxWidth: 190 }
      );

      if (Object.keys(this.informe.ingresosPorFuente).length > 0) {
        doc.autoTable({
          startY: 125,
          head: [["Fuente de Ingreso", "Monto"]],
          body: Object.entries(this.informe.ingresosPorFuente).map(([fuente, monto]) => [
            fuente,
            `$${this.formatearNumero(monto)}`,
          ]),
        });
      } else {
        doc.text("No se encontraron ingresos registrados.", 10, 125);
      }

      // Desglose de Gastos
      const startY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 140;
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Desglose por Categoría de Gasto", 10, startY);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text(
        "A continuación, se muestran las categorías de gasto identificadas y el monto total asignado a cada una, permitiendo identificar patrones de consumo.",
        10,
        startY + 5,
        { maxWidth: 190 }
      );

      if (Object.keys(this.informe.gastosPorCategoria).length > 0) {
        doc.autoTable({
          startY: startY + 15,
          head: [["Categoría de Gasto", "Monto"]],
          body: Object.entries(this.informe.gastosPorCategoria).map(([categoria, monto]) => [
            categoria,
            `$${this.formatearNumero(monto)}`,
          ]),
        });
      } else {
        doc.text("No se encontraron gastos registrados.", 10, startY + 15);
      }

      // Conclusión
      const conclusionY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 15 : 200;
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Conclusión", 10, conclusionY);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text(
        "Este análisis financiero refleja la situación actual del usuario. Es importante mantener un balance positivo, " +
        "diversificar las fuentes de ingreso y reducir gastos innecesarios. Se recomienda realizar un seguimiento periódico " +
        "de los ingresos y gastos para tomar decisiones informadas.",
        10,
        conclusionY + 5,
        { maxWidth: 190 }
      );

      // Guardar PDF
      const nombreArchivo = prompt("Introduce el nombre para el archivo PDF:", "Informe_Financiero");
      const nombreFinal = nombreArchivo?.trim() ? `${nombreArchivo.trim()}.pdf` : "Informe_Financiero.pdf";
      doc.save(nombreFinal);
    }
  },
};
</script>

<style scoped>
.financial-report-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Corregido de "100hv" a "100vh" */
  padding: 20px;
}

.financial-report {
  width: 100%;
  max-width: 1000px;
  max-height: 95vh; 
  overflow-y: auto; /* Permite el scroll vertical */
  background-color: #fdfdfd;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased; /* Suaviza el texto */
}

.financial-report h2 {
  color: #2c3e50;
  font-size: 2em;
  margin-bottom: 10px;
  text-align: center;
}

.financial-report h5 {
  color: #2c3e50;
  margin-bottom: 10px;
  text-align: center; 
}

.financial-report h3 {
  color: #34495e;
  font-size: 1.5em;
  margin-top: 30px;
  border-bottom: 2px solid #ddd; /* Añade una línea divisoria */
  padding-bottom: 10px;
}

.financial-report p {
  font-size: 1.2em;
  color: #555;
  margin: 5px 0;
  text-align: justify;
}

.financial-report strong {
  color: #2c3e50;
}

.report-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.report-table th, .report-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.report-table th {
  background-color: #2980b9;
  color: white;
  font-weight: bold;
  transition: background-color 0.3s ease; /* Transición suave */
}

.report-table tbody tr:nth-child(odd) {
  background-color: #f2f2f2;
}

.report-table tbody tr:hover {
  background-color: #dceefb;
  transition: background-color 0.3s ease; /* Transición suave */
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.button-container button {
  padding: 10px 15px;
  font-size: 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease; /* Transición suave */
}

.button-container button:hover {
  background-color: #2980b9;
  transform: translateY(-2px); /* Efecto de elevación */
}

.button-container button:not(:last-child) {
  margin-right: 10px;
}

/* Estilo para scroll */
.financial-report::-webkit-scrollbar {
  width: 8px;
}

.financial-report::-webkit-scrollbar-track {
  background: #f2f2f2;
  border-radius: 4px;
}

.financial-report::-webkit-scrollbar-thumb {
  background-color: #3498db;
  border-radius: 4px;
  border: 2px solid #f2f2f2;
}

.financial-report::-webkit-scrollbar-thumb:hover {
  background-color: #2980b9;
}

@media (max-width: 600px) {
  .financial-report-container {
    padding: 15px;
  }

  .report-table th, .report-table td {
    font-size: 14px;
    padding: 6px;
  }

  .button-container button {
    font-size: 14px;
    padding: 8px 10px;
  }
}
</style>