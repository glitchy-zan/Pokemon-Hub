import { defineStore } from 'pinia'
import * as api from '@/utils/api.js'
import { ref } from 'vue';

export const pokemonStore = defineStore('pokemonStore', {
  state: () => ({
    pokemons: [],
    isLoading: false,
    currentPage: 1,
    totalPages: -1,
    detailedPokemon: ref(null),
    filteredPokemons: [],
    selectedType: "null"
  }),

  actions: {
    fetchPokemons() {
      // Set loading to true so UI can show "Loading..."
      this.isLoading = true;
      /* First: Get 20 pokemon names and urls */
      api.getPokemonList(20, (this.currentPage - 1) * 20)
        .then(data => {
          this.totalPages = Math.ceil(data.count / 20);
          return data.results;
        })
        /* Second: Get detailed info for each pokemon */
        .then(results => {
          // Loop through all 20 pokemon
          const detailPromises = results.map(pokemon => {
            return api.getPokemonDetails(pokemon.name);
          });
          return Promise.all(detailPromises);
        })
        /* Third: Format the data we got back */
        .then(pokemonDetails => {
          this.pokemons = pokemonDetails.map(p => ({
            name: p.name,                       // Pokemon name ("bulbasaur")
            image: p.sprites.front_default,     // Image URL
            types: p.types.map(t => t.type.name) // Array of type names ["grass", "poison"]
          }));
        })
        .catch(err => {
          console.error('Error:', err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    nextPage() {
      this.currentPage++;
      this.fetchPokemons();
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
      this.fetchPokemons();
    },
    getDetailedPokemon(name) {
      api.getPokemonDetails(name)
        .then(pokemonDetail => {
          // pokemonDetail is a SINGLE pokemon object, not an array
          // So NO .map() needed!
          this.detailedPokemon = {
            id: pokemonDetail.id,
            name: pokemonDetail.name,
            image: pokemonDetail.sprites.front_default,
            types: pokemonDetail.types.map(t => t.type.name),
            stats: {
              hp: pokemonDetail.stats[0].base_stat,
              attack: pokemonDetail.stats[1].base_stat,
              defense: pokemonDetail.stats[2].base_stat,
              specialAttack: pokemonDetail.stats[3].base_stat,
              specialDefense: pokemonDetail.stats[4].base_stat,
              speed: pokemonDetail.stats[5].base_stat
            },
            abilities: pokemonDetail.abilities.map(a => a.ability.name)
          };
        })
        .catch(err => {
          console.error('Error:', err);
        });
    }
  }
})