<script>
import { useBiblioStore } from "./stores/data";
import { mapActions } from "pinia";
import { RouterView } from "vue-router";
import AppMenu from "./components/AppMenu.vue";


export default {
  components: {
    AppMenu
  },

  methods: {
    ...mapActions(useBiblioStore, {
      loadData: 'loadData'
    })
  },
  mounted() {
    this.loadData()
  }
}
</script>

<template>
  <div class="container">
    <AppMenu></AppMenu>
    <RouterView />
  </div>


</template>


<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css");
</style>
