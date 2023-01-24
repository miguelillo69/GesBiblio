<script>
import { useBiblioStore } from "../stores/data";
import { mapActions, mapState } from "pinia";
import LibroItem from "../components/LibroItem.vue";
import axios from "axios";
const SERVER = "http://localhost:3000";
export default {
  data() {
    return {
      libros: [],
      autor: {},
      //tema: {},
    };
  },
  props: {
    id: String,
  },
  components: {
    LibroItem,
  },
  methods: {
    async mostrarLibrosAutor(id) {
      try {
        var response = await axios.get(SERVER + "/libros", {
          params: {
            autor: Number(id),
          },
        });
        this.libros = response.data;
      } catch (error) {
        alert("Error: no se ha mostrado el registro. " + response.message);
      }
    },
    async mostrarLibros() {
      try {
        var response = await axios.get(SERVER + "/libros/");
        this.libros = response.data;
      } catch (error) {
        alert("Error: no se ha mostrado el registro. " + response.message);
      }
    },
  },
  watch: {
    $route() {
      this.mostrarLibros();
    },
  },
  computed: {
    ...mapState(useBiblioStore, {
      getAutorGetById: "getAutorGetById",
      //getTemaGetById: "getTemaGetById",
    }),
  },
  mounted() {
    if (!this.id) {
      this.mostrarLibros();
    } else {
      this.autor = this.getAutorGetById(this.id)
      this.mostrarLibrosAutor(Number(this.id));
      ;
    }

    //this.tema = this.getTemaGetById(this.libro.tema);
  }
};
</script>
<template>
  <h1 id="listarLibros">LISTAR LIBROS{{ this.id ? " DE "+ autor.nombre: "" }}</h1>
  <div class="container-fluid">
    <div class="row fila">
      <libro-item v-for="item in libros" :key="item.id" :libro="item"> </libro-item>
    </div>
  </div>
</template>
