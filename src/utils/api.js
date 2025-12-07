// Pokemon API utility functions
const BASE_URL = 'https://pokeapi.co/api/v2'

// Helper function for making API requests
const apiRequest = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}

/*****************************************************************************************************************/

// get pokemon list
export const getPokemonList = async (limit = 20, offset = 0) => {
  return await apiRequest(`/pokemon?limit=${limit}&offset=${offset}`)
}

// Get detailed Pokemon information
export const getPokemonDetails = async (idOrName) => {
  return await apiRequest(`/pokemon/${idOrName}`)
}

/*****************************************************************************************************************/

// Get Pokemon types
export const getPokemonTypes = async () => {
  return await apiRequest('/type')
}

/*****************************************************************************************************************/

// Get All abilities
export const getAbilities = async () => {
  return await apiRequest(`/ability`)
}

// Get ability details
export const getAbilityDetails = async (idOrName) => {
  return await apiRequest(`/ability/${idOrName}`)
}

