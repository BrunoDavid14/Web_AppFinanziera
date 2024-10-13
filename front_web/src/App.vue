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
  background-image: url("@/assets/fondo.jpg"); /* Fondo de imagen */
  background-size: cover; /* Cubrir todo el fondo */
  background-repeat: no-repeat; /* No repetir la imagen */
  background-position: center; /* Centrar la imagen */
  height: 120vh; /* Asegurarse de que el fondo cubra toda la altura */
}

#app {
  height: 100%;
}
</style>
