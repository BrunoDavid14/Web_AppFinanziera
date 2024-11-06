<template>
  <DashboardLayout>
    <DashboardComponent />
  </DashboardLayout>
</template>

<script>
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import DashboardComponent from "@/components/DashboardComponent.vue";

export default {
  components: {
    DashboardLayout,
    DashboardComponent
  }
};
</script>
