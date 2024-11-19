<template>
  <div>
    <!-- Contenido dinámico según la vista -->
    <SavingsGoalsListWeb
      v-if="view === 'list'"
      @create-goal="viewCreateGoalForm"
    />
    <CreateSavingsGoalWeb
      v-if="view === 'create'"
      @goal-created="viewSavingsGoalsList"
      @back="viewSavingsGoalsList"
    />
  </div>
</template>

<script>
import SavingsGoalsListWeb from "@/components/MetasAhorro/SavingsGoalsListWeb.vue";
import CreateSavingsGoalWeb from "@/components/MetasAhorro/CreateSavingsGoalWeb.vue";

export default {
  components: {
    SavingsGoalsListWeb,
    CreateSavingsGoalWeb,
  },
  data() {
    return {
      view: "list", // Controlamos la vista: 'list' o 'create'
    };
  },
  methods: {
    // Cambiar la vista a la lista de metas
    viewSavingsGoalsList() {
      this.view = "list";
    },

    // Cambiar la vista al formulario de creación de metas
    viewCreateGoalForm() {
      this.view = "create";
    },
  },
};
</script>
