<script>
import { useBiblioStore } from "../stores/data";
import { mapActions, mapState } from "pinia";

export default {
    data() {
        return {
            autor: {}
        }
    },
    props: {
        id: String
    },
    methods: {
        ...mapActions(useBiblioStore, {
        })
    },
    computed: {
        ...mapState(useBiblioStore, {
            getAutorGetById: "getAutorGetById",
        }),
    },
    mounted() {
        this.autor = this.getAutorGetById(Number(this.id))
    }
}

</script>
<template>
    <div class="col-4">
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img :src="'../../img/' + autor.img" class="card-img-top foto" :alt="autor.nombre" />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{{ autor.nombre + autor.apellidos }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ autor.nacionalidad }}</h6>
                        <button class="btn btn-secondary" @click="$router.push('/libros_autor/' + autor.id)" title="Ver libros">
                            <i class="bi bi-book-fill"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>