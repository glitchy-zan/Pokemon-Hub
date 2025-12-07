<template>
  <div class="compare">
    <h1>Compare Pokemon</h1>
    <p>Select two Pokemon to compare their stats and abilities.</p>

    <div class="compare-container">
      <!-- Left Pokemon Selector -->
      <div class="pokemon-selector">
        <h3>Select First Pokemon</h3>
        <input v-model="searchQuery1" @keyup.enter="selectPokemon1" type="text" placeholder="Search Pokemon..."
          class="search-input" />
        <button @click="selectPokemon1" class="button"><img src="@/assets/search.svg" alt="filter"
            style="width: 40px; height: 40px; object-fit: fill;" /></button>

        <!-- Selected Pokemon 1 Display -->
        <div v-if="pokemon1" class="selected-pokemon" :class="`bg-${pokemon1.types[0]}`">
          <img :src="pokemon1.image" :alt="pokemon1.name" />
          <h4>{{ pokemon1.name }}</h4>
          <div class="types">
            <span v-for="type in pokemon1.types" :key="type" class="type-badge">
              {{ type }}
            </span>
          </div>
        </div>
        <div v-else class="placeholder-selector">
          No Pokemon Selected
        </div>
      </div>

      <!-- Middle Comparison Area -->
      <div class="comparison-area">
        <div v-if="pokemon1 && pokemon2" class="comparison-content">

          <!-- Images Comparison -->
          <div class="images-comparison">
            <img :src="pokemon1.image" :alt="pokemon1.name" />
            <span class="vs-text">VS</span>
            <img :src="pokemon2.image" :alt="pokemon2.name" />
          </div>

          <!-- Stats Comparison -->
          <div class="stats-comparison">
            <h3>Stats Comparison</h3>

            <!-- HP -->
            <div class="stat-row">
              <span class="stat-value" :class="{ 'stat-higher': pokemon1.stats.hp > pokemon2.stats.hp }">
                {{ pokemon1.stats.hp }}
              </span>
              <span class="stat-name">HP</span>
              <div class="stat-bars">
                <div class="stat-bar-left" :style="{ width: `${(pokemon1.stats.hp / 255) * 100}%` }"></div>
                <div class="stat-bar-right" :style="{ width: `${(pokemon2.stats.hp / 255) * 100}%` }"></div>
              </div>
              <span class="stat-value" :class="{ 'stat-higher': pokemon2.stats.hp > pokemon1.stats.hp }">
                {{ pokemon2.stats.hp }}
              </span>
            </div>

            <!-- Attack -->
            <div class="stat-row">
              <span class="stat-value" :class="{ 'stat-higher': pokemon1.stats.attack > pokemon2.stats.attack }">
                {{ pokemon1.stats.attack }}
              </span>
              <span class="stat-name">Attack</span>
              <div class="stat-bars">
                <div class="stat-bar-left" :style="{ width: `${(pokemon1.stats.attack / 255) * 100}%` }"></div>
                <div class="stat-bar-right" :style="{ width: `${(pokemon2.stats.attack / 255) * 100}%` }"></div>
              </div>
              <span class="stat-value" :class="{ 'stat-higher': pokemon2.stats.attack > pokemon1.stats.attack }">
                {{ pokemon2.stats.attack }}
              </span>
            </div>

            <!-- Defense -->
            <div class="stat-row">
              <span class="stat-value" :class="{ 'stat-higher': pokemon1.stats.defense > pokemon2.stats.defense }">
                {{ pokemon1.stats.defense }}
              </span>
              <span class="stat-name">Defense</span>
              <div class="stat-bars">
                <div class="stat-bar-left" :style="{ width: `${(pokemon1.stats.defense / 255) * 100}%` }"></div>
                <div class="stat-bar-right" :style="{ width: `${(pokemon2.stats.defense / 255) * 100}%` }"></div>
              </div>
              <span class="stat-value" :class="{ 'stat-higher': pokemon2.stats.defense > pokemon1.stats.defense }">
                {{ pokemon2.stats.defense }}
              </span>
            </div>

            <!-- Special Attack -->
            <div class="stat-row">
              <span class="stat-value"
                :class="{ 'stat-higher': pokemon1.stats.specialAttack > pokemon2.stats.specialAttack }">
                {{ pokemon1.stats.specialAttack }}
              </span>
              <span class="stat-name">Sp. Attack</span>
              <div class="stat-bars">
                <div class="stat-bar-left" :style="{ width: `${(pokemon1.stats.specialAttack / 255) * 100}%` }"></div>
                <div class="stat-bar-right" :style="{ width: `${(pokemon2.stats.specialAttack / 255) * 100}%` }"></div>
              </div>
              <span class="stat-value"
                :class="{ 'stat-higher': pokemon2.stats.specialAttack > pokemon1.stats.specialAttack }">
                {{ pokemon2.stats.specialAttack }}
              </span>
            </div>

            <!-- Special Defense -->
            <div class="stat-row">
              <span class="stat-value"
                :class="{ 'stat-higher': pokemon1.stats.specialDefense > pokemon2.stats.specialDefense }">
                {{ pokemon1.stats.specialDefense }}
              </span>
              <span class="stat-name">Sp. Defense</span>
              <div class="stat-bars">
                <div class="stat-bar-left" :style="{ width: `${(pokemon1.stats.specialDefense / 255) * 100}%` }">
                </div>
                <div class="stat-bar-right" :style="{ width: `${(pokemon2.stats.specialDefense / 255) * 100}%` }">
                </div>
              </div>
              <span class="stat-value"
                :class="{ 'stat-higher': pokemon2.stats.specialDefense > pokemon1.stats.specialDefense }">
                {{ pokemon2.stats.specialDefense }}
              </span>
            </div>

            <!-- Speed -->
            <div class="stat-row">
              <span class="stat-value" :class="{ 'stat-higher': pokemon1.stats.speed > pokemon2.stats.speed }">
                {{ pokemon1.stats.speed }}
              </span>
              <span class="stat-name">Speed</span>
              <div class="stat-bars">
                <div class="stat-bar-left" :style="{ width: `${(pokemon1.stats.speed / 255) * 100}%` }"></div>
                <div class="stat-bar-right" :style="{ width: `${(pokemon2.stats.speed / 255) * 100}%` }"></div>
              </div>
              <span class="stat-value" :class="{ 'stat-higher': pokemon2.stats.speed > pokemon1.stats.speed }">
                {{ pokemon2.stats.speed }}
              </span>
            </div>
          </div>

          <!-- Abilities Comparison -->
          <div class="abilities-comparison">
            <h3>Abilities</h3>
            <div class="abilities-row">
              <div class="abilities-col">
                <h4>{{ pokemon1.name }}</h4>
                <span v-for="ability in pokemon1.abilities" :key="ability" class="ability-badge">
                  {{ ability }}
                </span>
              </div>
              <div class="abilities-col">
                <h4>{{ pokemon2.name }}</h4>
                <span v-for="ability in pokemon2.abilities" :key="ability" class="ability-badge">
                  {{ ability }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="placeholder-comparison">
          Select two Pokemon to compare
        </div>
      </div>

      <!-- Right Pokemon Selector -->
      <div class="pokemon-selector">
        <h3>Select Second Pokemon</h3>
        <input v-model="searchQuery2" @keyup.enter="selectPokemon2" type="text" placeholder="Search Pokemon..."
          class="search-input" />
        <button @click="selectPokemon2" class="button"><img src="@/assets/search.svg" alt="filter"
            style="width: 40px; height: 40px; object-fit: fill;" /></button>

        <!-- Selected Pokemon 2 Display -->
        <div v-if="pokemon2" class="selected-pokemon" :class="`bg-${pokemon2.types[0]}`">
          <img :src="pokemon2.image" :alt="pokemon2.name" />
          <h4>{{ pokemon2.name }}</h4>
          <div class="types">
            <span v-for="type in pokemon2.types" :key="type" class="type-badge">
              {{ type }}
            </span>
          </div>
        </div>
        <div v-else class="placeholder-selector">
          No Pokemon Selected
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery1: '',
      searchQuery2: '',
      pokemon1: null,
      pokemon2: null
    };
  },
  methods: {
    async selectPokemon1() {
      const pokemonName = this.searchQuery1.toLowerCase().trim();

      if (!pokemonName) {
        alert('Please enter a Pokemon name');
        return;
      }
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (response.ok) {
          const data = await response.json();
          this.pokemon1 = {
            name: data.name,
            image: data.sprites.front_default,
            types: data.types.map(t => t.type.name),
            stats: {
              hp: data.stats[0].base_stat,
              attack: data.stats[1].base_stat,
              defense: data.stats[2].base_stat,
              specialAttack: data.stats[3].base_stat,
              specialDefense: data.stats[4].base_stat,
              speed: data.stats[5].base_stat
            },
            abilities: data.abilities.map(a => a.ability.name)
          };
        } else {
          alert(`Pokemon "${pokemonName}" not found!`);
        }
      } catch (error) {
        alert(`Pokemon "${pokemonName}" not found!`);
      }
    },

    async selectPokemon2() {
      const pokemonName = this.searchQuery2.toLowerCase().trim();

      if (!pokemonName) {
        alert('Please enter a Pokemon name');
        return;
      }
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (response.ok) {
          const data = await response.json();
          this.pokemon2 = {
            name: data.name,
            image: data.sprites.front_default,
            types: data.types.map(t => t.type.name),
            stats: {
              hp: data.stats[0].base_stat,
              attack: data.stats[1].base_stat,
              defense: data.stats[2].base_stat,
              specialAttack: data.stats[3].base_stat,
              specialDefense: data.stats[4].base_stat,
              speed: data.stats[5].base_stat
            },
            abilities: data.abilities.map(a => a.ability.name)
          };
        } else {
          alert(`Pokemon "${pokemonName}" not found!`);
        }
      } catch (error) {
        alert(`Pokemon "${pokemonName}" not found!`);
      }
    }
  }
};
</script>

<style scoped>
.compare {
  padding: 20px;
}

.compare h1 {
  text-align: center;
  margin-bottom: 10px;
}

.compare p {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
}

.compare-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

.pokemon-selector {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.pokemon-selector h3 {
  margin-top: 0;
  margin-bottom: 15px;
}

.search-input {
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
}

.selected-pokemon {
  margin-top: 20px;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  color: white;
}

.selected-pokemon img {
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  padding: 10px;
}

.selected-pokemon h4 {
  margin: 10px 0;
  text-transform: capitalize;
  font-size: 20px;
}

.types {
  display: flex;
  gap: 5px;
  justify-content: center;
  flex-wrap: wrap;
}

.type-badge {
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
}

.placeholder-selector {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e9e9e9;
  border-radius: 4px;
  color: #999;
  margin-top: 20px;
}

.comparison-area {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.comparison-content {
  text-align: center;
}

.comparison-content h2 {
  margin-top: 0;
  color: #333;
  font-size: 32px;
}

.images-comparison {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 30px 0;
}

.images-comparison img {
  width: 150px;
  height: 150px;
}

.vs-text {
  font-size: 48px;
  font-weight: bold;
  color: #ff6b6b;
}

.stats-comparison {
  margin: 30px 0;
  text-align: left;
}

.stats-comparison h3 {
  text-align: center;
  margin-bottom: 20px;
}

.stat-row {
  display: grid;
  grid-template-columns: 60px 120px 1fr 60px;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.stat-name {
  font-weight: bold;
  text-align: center;
}

.stat-value {
  font-weight: bold;
  font-size: 18px;
  text-align: center;
}

.stat-higher {
  color: #4CAF50;
}

.stat-bars {
  display: flex;
  gap: 10px;
  align-items: center;
}

.stat-bar-left {
  height: 12px;
  background: linear-gradient(90deg, #4CAF50 0%, #8BC34A 100%);
  border-radius: 6px;
  transition: width 0.3s ease;
}

.stat-bar-right {
  height: 12px;
  background: linear-gradient(90deg, #2196F3 0%, #64B5F6 100%);
  border-radius: 6px;
  transition: width 0.3s ease;
}

.abilities-comparison {
  margin: 30px 0;
}

.abilities-comparison h3 {
  margin-bottom: 15px;
}

.abilities-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.abilities-col {
  text-align: center;
}

.abilities-col h4 {
  text-transform: capitalize;
  margin-bottom: 10px;
}

.ability-badge {
  display: inline-block;
  background: #667eea;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  text-transform: capitalize;
  margin: 5px;
}

.clear-btn {
  margin-top: 20px;
  background-color: #ff6b6b;
}

.placeholder-comparison {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e9e9e9;
  border-radius: 4px;
  font-size: 18px;
  color: #999;
}

/* Background colors for Pokemon types */
.bg-normal {
  background: linear-gradient(135deg, #A8A878 0%, #8A8A59 100%);
}

.bg-fire {
  background: linear-gradient(135deg, #F08030 0%, #D06020 100%);
}

.bg-water {
  background: linear-gradient(135deg, #6890F0 0%, #4070D0 100%);
}

.bg-electric {
  background: linear-gradient(135deg, #F8D030 0%, #D8B010 100%);
}

.bg-grass {
  background: linear-gradient(135deg, #78C850 0%, #58A830 100%);
}

.bg-ice {
  background: linear-gradient(135deg, #98D8D8 0%, #78B8B8 100%);
}

.bg-fighting {
  background: linear-gradient(135deg, #C03028 0%, #A02820 100%);
}

.bg-poison {
  background: linear-gradient(135deg, #A040A0 0%, #803080 100%);
}

.bg-ground {
  background: linear-gradient(135deg, #E0C068 0%, #C0A050 100%);
}

.bg-flying {
  background: linear-gradient(135deg, #A890F0 0%, #8870D0 100%);
}

.bg-psychic {
  background: linear-gradient(135deg, #F85888 0%, #D83868 100%);
}

.bg-bug {
  background: linear-gradient(135deg, #A8B820 0%, #889810 100%);
}

.bg-rock {
  background: linear-gradient(135deg, #B8A038 0%, #988030 100%);
}

.bg-ghost {
  background: linear-gradient(135deg, #705898 0%, #584070 100%);
}

.bg-dragon {
  background: linear-gradient(135deg, #7038F8 0%, #5020D0 100%);
}

.bg-dark {
  background: linear-gradient(135deg, #705848 0%, #584030 100%);
}

.bg-steel {
  background: linear-gradient(135deg, #B8B8D0 0%, #9898B0 100%);
}

.bg-fairy {
  background: linear-gradient(135deg, #EE99AC 0%, #CE7990 100%);
}
</style>