<template>
  <div>
    <InvestmentListWeb
      v-if="view === 'list'"
      @create-investment="viewCreateInvestmentForm"
      ref="investmentList"
    />
    <CreateInvestmentWeb
      v-if="view === 'create'"
      @investment-created="viewInvestmentList"
      @back="viewInvestmentList"
    />
  </div>
</template>

<script>
import InvestmentListWeb from "../components/Inversiones/InvestmentListWeb.vue";
import CreateInvestmentWeb from "../components/Inversiones/CreateInvestmentWeb.vue";

export default {
  components: {
    InvestmentListWeb,
    CreateInvestmentWeb,
  },
  data() {
    return {
      view: "list",
    };
  },
  methods: {
    // Volver a la vista de lista y recargar inversiones
    viewInvestmentList() {
      this.view = "list";

      // Verificamos si existe el método loadInvestments en el componente
      if (
        this.$refs.investmentList &&
        typeof this.$refs.investmentList.loadInvestments === "function"
      ) {
        this.$refs.investmentList.loadInvestments(); // Recargar las inversiones
      }
    },
    // Cambiar la vista al formulario de creación de inversiones
    viewCreateInvestmentForm() {
      this.view = "create";
    },
  },
};
</script>
