<template>
  <nav class="navigation">
    <div class="nav-container">
      <div class="nav-logo">
        <router-link to="/" class="logo-link">
          <h2>Pokémon Hub</h2>
        </router-link>
      </div>

      <ul class="nav-links">
        <li>
          <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">
            Home
          </router-link>
        </li>
        <li>
          <router-link to="/compare" class="nav-link" :class="{ active: $route.path === '/compare' }">
            Compare
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
</script>

<style scoped>
.navigation {
  background-color: rgb(25, 118, 210);
  color: white;
  padding: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
.nav-container {
  display: flex;
  justify-content: space-between; 
  align-items: center;
  margin: 0px 50px;
  height: 60px;
}

.logo-link {
  text-decoration: none;
  color: white;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0px 30px;
}

.nav-link {
  color: rgb(255, 255, 255);
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 4px;
  margin-left: 10px;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-link.active {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}

</style>


