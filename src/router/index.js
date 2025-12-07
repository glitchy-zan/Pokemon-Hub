/**
 * Router configuration for the Pokemon Hub application.
 * Defines routes for Home, Compare, Team Builder, and Pokemon Details views.
 */

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Compare from '../views/Compare.vue'
import PokemonDetails from '../views/PokemonDetails.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Pokemon Hub - Home'
    }
  },
  {
    path: '/compare',
    name: 'Compare',
    component: Compare,
    meta: {
      title: 'Pokemon Hub - Compare'
    }
  },
  {
    path: '/pokemon/:name',
    name: 'PokemonDetails',
    component: PokemonDetails,
    props: true,
    meta: {
      title: 'Pokemon Hub - Pokemon Details'
    }
  },
  // Catch all route - redirect to home
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router


