<template>
  <div>
    <BudgetListWeb
      v-if="view === 'list'"
      @create-budget="viewCreateBudgetForm"
    />
    <CreateBudgetWeb
      v-if="view === 'create'"
      @budget-created="viewBudgetList"
      @back="viewBudgetList"
    />
  </div>
</template>

<script>
import BudgetListWeb from "../components/BudgetListWeb.vue";
import CreateBudgetWeb from "../components/CreateBudgetWeb.vue";

export default {
  components: {
    BudgetListWeb,
    CreateBudgetWeb,
  },
  data() {
    return {
      view: "list",
      selectedBudgetId: null,
    };
  },
  methods: {
    viewBudgetList() {
      this.view = "list";
      this.selectedBudgetId = null;
    },
    viewCreateBudgetForm() {
      this.view = "create";
    },
  },
};
</script>
