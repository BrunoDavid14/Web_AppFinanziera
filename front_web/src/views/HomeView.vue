<template>
  <div class="home">
    <LoginWeb msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginWeb from "@/components/LoginWeb";

export default {
  name: "HomeView",
  components: {
    LoginWeb,
  },
};
</script>
