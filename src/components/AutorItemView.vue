<script>
import { useBiblioStore } from "../stores/data";
import { mapActions, mapState } from "pinia";

export default {
    props: {
        autor: Object
    },
    methods: {
        ...mapActions(useBiblioStore, {
            mostrarAutor:'mostrarAutor'
        })
    }
}

</script>
<template>
    <tr class="text-center align-middle">
        <td>{{ autor.id }}</td>
        <td>{{ autor.nombre }}</td>
        <td>{{ autor.apellidos }}</td>
        <td>{{ autor.nacionalidad }}</td>
        <td><img :src="'../../img/' + autor.img"/></td>
        <td><button @click="$router.push('/autor/' + autor.id)"><a class="bi bi-binoculars"></a></button>
            <button @click="$router.push('/libros_autor/' + autor.id)"><a class="bi bi-book"></a></button></td>
    </tr>
</template>
<style>

img {
height: 100px;
}
a {
    text-decoration: none;
    color:black
}
</style>
