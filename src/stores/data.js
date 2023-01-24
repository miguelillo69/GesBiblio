import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
const SERVER = 'http://localhost:3000'


export const useBiblioStore = defineStore('data', {
  state() {
    return {
      autores: [],
      temas: [],
    }
  },
  getters: {
    totalProducts: (state) => state.autores.length,
    getAutorGetById: (state) => (id) =>  state.autores.find(autor => autor.id === id) || {},
    getTemaGetById: (state) => (id) =>  state.temas.find(tema => tema.id === id) || {}
  },

  actions: {
    async loadData() {
      try {
          const [ responseAut, responseTemas ] = await Promise.all([
              axios.get(SERVER + '/autores'),
              axios.get(SERVER + '/temas')
            ])
            
          this.autores = responseAut.data
          this.temas = responseTemas.data
        
      } catch (error) {
        alert('Error: no se ha mostrado los registros. ');
      }
    },    
  }
})

