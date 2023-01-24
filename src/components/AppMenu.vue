<script>

export default {
    props: {
    },
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>
<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container-fluid">
            <div class="navbar-nav">
            <h4>GesBiblio</h4>
                <router-link class="nav-link" to="/">Home</router-link>
                <router-link class="nav-link" to="/autores">Autores</router-link>
                <router-link class="nav-link" to="/libros">Libros</router-link>
                <router-link class="nav-link" to="/añadir">Añadir libro</router-link>
                <router-link class="nav-link" to="/nosotros">Sobre nosotros</router-link>
            </div>
        </div>
    </nav>
</template>
<style>
h4 {
    color: white;
    margin-right: 30px;
}

.navbar {
    margin-bottom: 20px;
}
</style>
