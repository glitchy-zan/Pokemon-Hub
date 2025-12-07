<template>
  <div class="pokemon-details">
    <div class="details-header">
      <button @click="$router.go(-1)" class="button">← Back</button>
      <h1>{{ detailedPokemon?.name || 'Pokemon Details' }}</h1>
    </div>

    <div v-if="detailedPokemon" class="details-content" :class="`bg-${primaryType}`">
      <div class="pokemon-image">
        <img :src="detailedPokemon.image" :alt="detailedPokemon.name" />
      </div>

      <div class="pokemon-info">
        <div class="basic-info">
          <h2>{{ detailedPokemon.name }}</h2>
          <div class="types">
            <span v-for="type in detailedPokemon.types" :key="type" class="type-badge">
              {{ type }}
            </span>
          </div>
        </div>

        <div class="stats-section">
          <h3>Stats</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-name">HP</span>
              <span class="stat-value">{{ detailedPokemon.stats.hp }}</span>
              <div class="stat-bar">
                <div class="stat-fill" :style="{ width: `${(detailedPokemon.stats.hp / 255) * 100}%` }"></div>
              </div>
            </div>
            <div class="stat-item">
              <span class="stat-name">Attack</span>
              <span class="stat-value">{{ detailedPokemon.stats.attack }}</span>
              <div class="stat-bar">
                <div class="stat-fill" :style="{ width: `${(detailedPokemon.stats.attack / 255) * 100}%` }"></div>
              </div>
            </div>
            <div class="stat-item">
              <span class="stat-name">Defense</span>
              <span class="stat-value">{{ detailedPokemon.stats.defense }}</span>
              <div class="stat-bar">
                <div class="stat-fill" :style="{ width: `${(detailedPokemon.stats.defense / 255) * 100}%` }"></div>
              </div>
            </div>
            <div class="stat-item">
              <span class="stat-name">Sp. Attack</span>
              <span class="stat-value">{{ detailedPokemon.stats.specialAttack }}</span>
              <div class="stat-bar">
                <div class="stat-fill" :style="{ width: `${(detailedPokemon.stats.specialAttack / 255) * 100}%` }">
                </div>
              </div>
            </div>
            <div class="stat-item">
              <span class="stat-name">Sp. Defense</span>
              <span class="stat-value">{{ detailedPokemon.stats.specialDefense }}</span>
              <div class="stat-bar">
                <div class="stat-fill" :style="{ width: `${(detailedPokemon.stats.specialDefense / 255) * 100}%` }">
                </div>
              </div>
            </div>
            <div class="stat-item">
              <span class="stat-name">Speed</span>
              <span class="stat-value">{{ detailedPokemon.stats.speed }}</span>
              <div class="stat-bar">
                <div class="stat-fill" :style="{ width: `${(detailedPokemon.stats.speed / 255) * 100}%` }"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="abilities-section">
          <h3>Abilities</h3>
          <div class="abilities-list">
            <span v-for="ability in detailedPokemon.abilities" :key="ability" class="ability-badge">
              {{ ability }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="loading">
      Loading Pokemon details...
    </div>
  </div>
</template>

<script>
import { pokemonStore } from '@/stores/pokemon';

export default {
  data() {
    return {
      store: pokemonStore()
    };
  },

  computed: {
    detailedPokemon() {
      return this.store.detailedPokemon;
    },

    primaryType() {
      return this.detailedPokemon?.types?.[0] || 'normal';
    }
  },

  mounted() {
    const pokemonName = this.$route.params.name;
    this.store.getDetailedPokemon(pokemonName);
  }
}
</script>

<style scoped>
.pokemon-details {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.details-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.details-header h1 {
  text-transform: capitalize;
  color: #333;
}

.details-content {
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 40px;
}

.pokemon-image {
  text-align: center;
}

.pokemon-image img {
  width: 220px;
  height: 220px;
  object-fit: contain;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  padding: 20px;
}

.pokemon-info h2 {
  margin-top: 0;
  color: white;
  font-size: 32px;
  text-transform: capitalize;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.pokemon-info h3 {
  color: white;
  font-size: 20px;
  margin-bottom: 15px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.basic-info {
  margin-bottom: 30px;
}

.types {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.type-badge {
  padding: 8px 20px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  background: rgba(255, 255, 255, 0.25);
  border: 2px solid rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stats-section,
.abilities-section {
  background: rgba(255, 255, 255, 0.15);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 25px;
  backdrop-filter: blur(10px);
}

.stats-grid {
  display: grid;
}

.stat-item {
  display: grid;
  grid-template-columns: 120px 60px 1fr;
  align-items: center;
  gap: 15px;
}

.stat-name {
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.stat-value {
  text-align: right;
  font-weight: bold;
  color: white;
  font-size: 18px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.stat-bar {
  height: 12px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.stat-fill {
  height: 100%;
  background: linear-gradient(90deg, #4CAF50 0%, #8BC34A 100%);
  transition: width 0.3s ease;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
}

.abilities-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.ability-badge {
  background: rgba(255, 255, 255, 0.25);
  border: 2px solid rgba(255, 255, 255, 0.4);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  text-transform: capitalize;
}

.loading {
  text-align: center;
  padding: 50px;
  font-size: 18px;
  color: #666;
}

/* Background colors matching your card style */
.bg-normal {
  background: linear-gradient(135deg, #A8A878 0%, #8A8A59 100%);
}

.bg-fighting {
  background: linear-gradient(135deg, #C03028 0%, #A02820 100%);
}

.bg-flying {
  background: linear-gradient(135deg, #A890F0 0%, #8870D0 100%);
}

.bg-poison {
  background: linear-gradient(135deg, #A040A0 0%, #803080 100%);
}

.bg-ground {
  background: linear-gradient(135deg, #E0C068 0%, #C0A050 100%);
}

.bg-rock {
  background: linear-gradient(135deg, #B8A038 0%, #988030 100%);
}

.bg-bug {
  background: linear-gradient(135deg, #A8B820 0%, #889810 100%);
}

.bg-ghost {
  background: linear-gradient(135deg, #705898 0%, #584070 100%);
}

.bg-steel {
  background: linear-gradient(135deg, #B8B8D0 0%, #9898B0 100%);
}

.bg-fire {
  background: linear-gradient(135deg, #F08030 0%, #D06020 100%);
}

.bg-water {
  background: linear-gradient(135deg, #6890F0 0%, #4070D0 100%);
}

.bg-grass {
  background: linear-gradient(135deg, #78C850 0%, #58A830 100%);
}

.bg-electric {
  background: linear-gradient(135deg, #F8D030 0%, #D8B010 100%);
}

.bg-psychic {
  background: linear-gradient(135deg, #F85888 0%, #D83868 100%);
}

.bg-ice {
  background: linear-gradient(135deg, #98D8D8 0%, #78B8B8 100%);
}

.bg-dragon {
  background: linear-gradient(135deg, #7038F8 0%, #5020D0 100%);
}

.bg-dark {
  background: linear-gradient(135deg, #705848 0%, #584030 100%);
}

.bg-fairy {
  background: linear-gradient(135deg, #EE99AC 0%, #CE7990 100%);
}
</style>