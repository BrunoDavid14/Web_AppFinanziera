<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-image: url("@/assets/fondo.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 120vh;
}

#app {
  height: 100%;
}

html,
body {
  overflow: hidden;
}
</style>
