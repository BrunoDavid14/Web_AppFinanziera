<template>
  <div class="auth-layout">
    <slot></slot>
  </div>
</template>

<style>
.auth-layout {
  height: 100vh;
  background: url("https://cdn.pixabay.com/photo/2022/10/23/15/20/online-banking-7541521_1280.jpg")
    no-repeat center center fixed;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
