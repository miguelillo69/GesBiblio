
<script>
import AutorItem from "../components/AutorItemView.vue"
import { useBiblioStore } from "../stores/data";
import { mapState } from "pinia";

export default {
  computed: {
    ...mapState(useBiblioStore, {
      autores: "autores",
      totalProducts: "totalProducts"
    }),
  },
  components: {
    AutorItem
  }
};
</script>

  <template>
  <div class="container">
    <div class="tablaProduct">
      <header>
        <h3 style="text-align:left">Listado de productos</h3>
      </header>

      <!-- Zona para mostrar mensajes al usuario -->
      <div class="row" id="messages">

      </div>

      <!-- Almacén de productos -->
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12" id="almacen">

          <table class="table table-striped table-hover table-responsive">
            <thead class="bg-dark">
              <tr class="text-center text-white">
                <th>Id</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Nacionalidad.</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="tbody">
              <autor-item v-for="item in autores" :key="item.id" :autor="item">
              </autor-item>
            </tbody>
            <tfoot id="tfoot">
              <th colspan="4">Autores listados: {{ totalProducts }}</th>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
