<template>
  <div class="investment-create-container">
    <h2>Crear Nueva Inversión</h2>
    <div class="investment-create-box">
      <form @submit.prevent="submitInvestment">
        <!-- Cambié el método a submitInvestment -->
        <label for="PerfilInversor"
          >Perfil Inversor (Conservador, Moderado, Arriesgado):</label
        >
        <input type="text" v-model="perfilInversor" />

        <label for="HorizonteInversion"
          >Plazo inversion (Corto, Mediano, Largo):</label
        >
        <input type="text" v-model="horizonteInversion" />

        <label for="TipoActivo"
          >Tipo de Activo (Acciones, Fondos, Cripto):</label
        >
        <input type="text" v-model="tipoActivo" />

        <label for="NombreActivo">Nombre del Activo (BTC, AAPL, ETH):</label>
        <input type="text" v-model="nombreActivo" />

        <label for="Cantidad">Cantidad:</label>
        <input type="number" v-model="cantidad" />

        <label for="FechaCompra">Fecha de Compra:</label>
        <input type="date" v-model="fechaCompra" />

        <label for="PrecioCompra">Precio de Compra:</label>
        <input type="number" v-model="precioCompra" />

        <label for="Divisa">Divisa:</label>
        <input type="text" v-model="divisa" />

        <button type="submit" class="submit-button">Guardar Inversión</button>
      </form>
    </div>
    <button type="button" @click="goToDashboard" class="btn btn-secondary">
      Regresar al Dashboard
    </button>
  </div>
</template>

<script>
import { createInvestment } from "../../services/AuthService";

export default {
  data() {
    return {
      perfilInversor: "",
      horizonteInversion: "",
      tipoActivo: "",
      nombreActivo: "",
      cantidad: "",
      fechaCompra: "",
      precioCompra: "",
      divisa: "",
    };
  },
  methods: {
    async submitInvestment() {
      const investmentData = {
        profile: this.perfilInversor,
        horizon: this.horizonteInversion,
        assetType: this.tipoActivo,
        assetName: this.nombreActivo,
        quantity: parseFloat(this.cantidad),
        purchaseDate: this.fechaCompra,
        purchasePrice: parseFloat(this.precioCompra),
        currency: this.divisa,
        userid: localStorage.getItem("userID"),
      };

      try {
        if (!investmentData.userid) {
          console.error("No se encontró el userid");
          alert("Usuario no autenticado");
          return;
        }

        // Llamar a la función createInvestment
        const response = await createInvestment(investmentData);

        if (
          response.message === "Seguimiento de inversión creado exitosamente"
        ) {
          alert("Inversión creada exitosamente");

          // Emitir un evento para notificar la creación de una nueva inversión
          this.$emit("investment-created");
        } else {
          console.error("Error al crear la inversión:", response);
          alert("Error inesperado al crear la inversión");
        }
      } catch (error) {
        console.error("Error al crear la inversión:", error);
        alert(
          "Error al crear la inversión. Revisa la consola para más detalles."
        );
      }
    },
    goToDashboard() {
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style scoped>
.investment-create-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.investment-create-box {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  width: 80%;
  max-height: 625px; /* Establece una altura máxima */
  overflow-y: auto; /* Activa la barra de desplazamiento vertical */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  margin-bottom: 15px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.submit-button {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #45a049;
}

.btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #2980b9;
}
</style>
