<script>
import Navigation from './components/Navigation.vue'

export default {
  name: 'App',
  components: {
    Navigation
  }
}
</script>

<template>
  <div id="app">
    <Navigation />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
}

::-webkit-scrollbar {
  width: 0px;
}

button {
  width: 100px;
  height: 60px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.25s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18);
  background: rgba(25, 118, 210, 0.8);
}

button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
</style>
