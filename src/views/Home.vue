<template>
  <div class="home">
    <!-- Loading view -->
    <div v-if="store.isLoading" class="loading">
      <span class="loader"></span>
    </div>
    <div v-else>
      <!-- Search Bar -->
      <div class="search-container">
        <div class="search-container">
          <div>
            <input v-model="searchQuery" @keyup.enter="handleSearch" type="text" placeholder="Search Pokemon by name..."
              class="search-input" />
          </div>
          <button @click="handleSearch" style="background: #f9f9f9;">
            <img src="@/assets/search.svg" alt="search" style="width: 40px; height: 40px; object-fit: fill;" />
          </button>
        </div>
        <button @click="toggleFilter" style="background: #f9f9f9;">
          <img src="@/assets/filter.svg" alt="filter" style="width: 40px; height: 40px; object-fit: fill;" />
        </button>
      </div>
      <!-- Filter Popup -->
      <div v-if="showFilterPopup" class="popup-overlay" @click="toggleFilter">
        <div class="popup-content" @click.stop>
          <h3>Select Pokemon Type</h3>
          <div class="types-grid">
            <button v-for="type in pokemonTypes" :key="type" @click="selectType(type)" :class="['type-button', type]">
              {{ type }}
            </button>
          </div>
        </div>
      </div>
      <!-- Pokemon Grid -->
      <div class="pokemon-grid">
        <PokemonCard v-for="item in store.pokemons" :key="item.name" :pokemon="item" />
      </div>
      <div class="pagination">
        <button @click="togglePrevPage">
          Previous
        </button>
        <div>Page {{ store.currentPage }}/{{ store.totalPages }}</div>
        <button @click="toggleNextPage">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PokemonCard from '@/components/PokemonCard.vue'
import { pokemonStore } from '@/stores/pokemon.js'
import FilterIcon from '@/assets/filter.svg'
import SearchIcon from '@/assets/search.svg'

export default {
  components: { PokemonCard, FilterIcon, SearchIcon },

  data() {
    return {
      store: pokemonStore(),
      searchQuery: '',
      showFilterPopup: false,
      pokemonTypes: [
        'normal', 'fire', 'water', 'electric', 'grass', 'ice',
        'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
        'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
      ],
      isTypeSelected: false
    }
  },

  mounted() {
    this.store.fetchPokemons();
  },

  methods: {
    toggleFilter() {
      this.showFilterPopup = !this.showFilterPopup;
    },

    async toggleNextPage() {
      await this.store.nextPage();
      if (this.isTypeSelected) {
        await this.selectType(this.store.selectedType);
      }
    },

    async togglePrevPage() {
      await this.store.prevPage();
      if (this.isTypeSelected) {
        await this.selectType(this.store.selectedType);
      }
    },

    async selectType(type) {
      this.store.selectedType = type;
      this.showFilterPopup = false;
      this.isTypeSelected = true;
      this.store.isLoading = true;

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const data = await response.json();

        const pokemonList = data.pokemon.map(item => item.pokemon);
        const start = (this.store.currentPage - 1) * 20;
        const end = ((this.store.currentPage - 1) * 20) + 20;

        const detailedPokemons = await Promise.all(
          pokemonList.slice(start, end).map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const p = await res.json();
            return {
              name: p.name,
              image: p.sprites.front_default,
              types: p.types.map(t => t.type.name)
            };
          })
        );

        this.store.pokemons = detailedPokemons;
      } catch (error) {
        console.error('Error fetching pokemon by type:', error);
        alert('Failed to fetch pokemon by type');
      } finally {
        this.store.isLoading = false;
      }
    },

    async handleSearch() {
      const pokemonName = this.searchQuery.toLowerCase().trim();

      if (!pokemonName) {
        alert('Please enter a Pokemon name');
        return;
      }
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (response.ok) {
          this.$router.push(`/pokemon/${pokemonName}`);
        } else {
          alert(`Pokemon "${this.searchQuery}" not found!`);
        }
      } catch (error) {
        alert(`Pokemon "${this.searchQuery}" not found!`);
      }
    }
  }
}
</script>

<style>
.home {
  padding: 20px 50px;
}

.search-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-input {
  width: 70%;
  padding: 15px 45px 15px 20px;
  margin-right: 30px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 25px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 20px;
  margin: 20px 0;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 3rem;
}

.loader {
  width: 48px;
  height: 48px;
  border: 5px solid black;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* Popup styles */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.popup-content h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  text-align: center;
}

.types-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.type-button {
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  text-transform: capitalize;
  transition: all 0.2s;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.type-button:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}

/* Pokemon type colors */
.type-button.normal {
  background-color: #A8A878;
}

.type-button.fire {
  background-color: #F08030;
}

.type-button.water {
  background-color: #6890F0;
}

.type-button.electric {
  background-color: #F8D030;
  color: #333;
}

.type-button.grass {
  background-color: #78C850;
}

.type-button.ice {
  background-color: #98D8D8;
}

.type-button.fighting {
  background-color: #C03028;
}

.type-button.poison {
  background-color: #A040A0;
}

.type-button.ground {
  background-color: #E0C068;
  color: #333;
}

.type-button.flying {
  background-color: #A890F0;
}

.type-button.psychic {
  background-color: #F85888;
}

.type-button.bug {
  background-color: #A8B820;
}

.type-button.rock {
  background-color: #B8A038;
}

.type-button.ghost {
  background-color: #705898;
}

.type-button.dragon {
  background-color: #7038F8;
}

.type-button.dark {
  background-color: #705848;
}

.type-button.steel {
  background-color: #B8B8D0;
  color: #333;
}

.type-button.fairy {
  background-color: #EE99AC;
}
</style>
