<script>
import { useBiblioStore } from "../stores/data";
import { mapActions, mapState } from "pinia";
import axios from "axios";
const SERVER = "http://localhost:3000";
export default {
  data() {
    return {
      autor: {},
      tema: {},
    };
  },
  props: {
    libro: Object,
  },
  methods: {
    async delLibroServer(id) {
      try {
        var response = await axios.delete(SERVER + "/libros/" + id);
      } catch (error) {
        alert("Error: no se ha borrado el libro. " + response.message);
      }

    },
    delLibro(id) {
      if (confirm('Quieres borrar el libro')) {
        this.delLibroServer(id)
        this.$router.go()
      }
    },
  },
  computed: {
    ...mapState(useBiblioStore, {
      getAutorGetById: "getAutorGetById",
      getTemaGetById: "getTemaGetById",
    }),
  },
  mounted() {
    this.autor = this.getAutorGetById(this.libro.autor),
      this.tema = this.getTemaGetById(this.libro.tema)
  },
};
</script>
<template>
  <div class="col-4">
    <div class="card mb-3" style="max-width: 540px">
      <div class="row g-0">
        <div class="col-md-4">
          <img :src="'../../img/' + libro.img" class="card-img-top foto" :alt="libro.nombre" />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ libro.nombre }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ autor.nombre }}</h6>
            <p class="card-text">
              <small class="text-muted">{{ tema.nombre }}</small>
            </p>
            <p class="card-text">{{ libro.desc }}</p>
            <button class="btn btn-secondary" @click="$router.push('/editar/' + autor.id)" title="Editar">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-secondary" @click="delLibro(libro.id)" title="Eliminar">
              <i class="bi bi-trash"></i>
            </button>
            <button class="btn btn-secondary" @click="$router.push('/autor/' + libro.autor)" title="Ver autor">
              <i class="bi bi-person"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>

</style>
