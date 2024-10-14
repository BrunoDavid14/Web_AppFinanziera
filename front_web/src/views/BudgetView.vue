<template>
  <div>
    <BudgetListWeb
      v-if="view === 'list'"
      @view-budget="viewBudgetDetails"
      @create-budget="viewCreateBudgetForm"
    />
    <BudgetDetailsWeb
      v-if="view === 'details'"
      :budgetId="selectedBudgetId"
      @back="viewBudgetList"
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
import BudgetDetailsWeb from "../components/BudgetDetailsWeb.vue";
import CreateBudgetWeb from "../components/CreateBudgetWeb.vue";

export default {
  components: {
    BudgetListWeb,
    BudgetDetailsWeb,
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
    viewBudgetDetails(id) {
      this.view = "details";
      this.selectedBudgetId = id;
    },
    viewCreateBudgetForm() {
      this.view = "create";
    },
  },
};
</script>
