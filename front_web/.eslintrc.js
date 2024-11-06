// .eslintrc.js
module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'plugin:vue/vue3-essential',  // Asegura que Vue 3 esté reconocido
      'eslint:recommended',
    ],
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'off',        // Desactiva advertencias de variables no usadas
      'no-undef': 'off',               // Evita errores sobre defineProps y defineEmits
    },
  };
  