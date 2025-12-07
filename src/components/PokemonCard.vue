<template>
  <div class="pokemon-card" @click="goToDetails" :class="`bg-${primaryType}`">
    <img :src="pokemon.image" :alt="pokemon.name" />
    <h3>{{ pokemon.name }}</h3>
    <div class="types">
      <span v-for="type in pokemon.types" :key="type" class="type-badge">
        {{ type }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PokemonCard',
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },
  computed: {
    // Get the first type for background color
    primaryType() {
      return this.pokemon.types[0] || 'normal';
    }
  },
  methods: {
    goToDetails() {
      this.$router.push(`/pokemon/${this.pokemon.name.toLowerCase()}`)
    }
  }
}
</script>

<style>
.pokemon-card {
  border-radius: 12px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
}

.pokemon-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.pokemon-card h3 {
  color: white;
  text-transform: uppercase;
  margin: 5px 0;
  font-size: 18px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.pokemon-card img {
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  padding: 10px;
}

.types {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.type-badge {
  padding: 4px 6px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: bold;
  color: white;
  background: rgba(255, 255, 255, 0.25);
  border: 2px solid rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
}

/* Background colors for each type */
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