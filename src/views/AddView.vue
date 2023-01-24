<script>
import { useBiblioStore } from "../stores/data";
import { mapActions, mapState } from "pinia";
import axios from 'axios';
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from 'yup';

const SERVER = 'http://localhost:3000'
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const isbn = /[0-9]/;
    const mySchema = yup.object({
      nombre: yup.string().required('El campo es obligatorio').min(2, 'mínimo 2 caracteres').max(50, 'máximo 50 caracteres'),
      tema: yup.string().required('El campo es obligatorio'),
      autor: yup.string().required('El campo es obligatorio'),
      ISBN:yup.string().min(10,'mínimo 10 caracteres').max(10, 'máximo 10 caracteres').required('El campo es obligatorio').matches(isbn, 'obligatorio digitos de 0 a 9'),
    })
    return {
      libro: {},
      libros: [],
      mySchema
    };
  },
  props: {
    id: String
  },
  computed: {
    ...mapState(useBiblioStore, {
      temas: "temas",
      autores: "autores"
    }),
  },

  watch: {
    $route() {
      this.libro = {};
    }
  },
  methods: {
    async addLibro(libro) {
      try {
        var response = await axios.post(SERVER + "/libros", {
          nombre: libro.nombre,
          autor: libro.autor,
          ISBN: libro.ISBN,
          tema: libro.tema,
          img: libro.img,
          desc: libro.desc,
        })
        //this.libro.push(response.data)

      } catch (error) {
        alert('Error: no se ha añadido el registro. ' + response.message);
      }
    },

    async editLibro(libro) {
      try {
        var response = await axios.patch(SERVER + "/libros/" + libro.id, {
          nombre: libro.nombre,
          autor: libro.autor,
          ISBN: libro.ISBN,
          tema: libro.tema,
          img: libro.img,
          desc: libro.desc,
        })
        this.libro = response.data
      } catch (error) {
        this.addError('Error: no se ha editado el libro. ' + response.message);
      }
    },
    async getLibroById(id) {
      try {
            var response = await axios.get(SERVER + "/libros/" + id)
            this.libro = response.data
        } catch (error) {
            this.addError('Error: no se ha mostrado el registro. ' + error);
            return {}
        }
    },
    submitForm(values) {
      if (!this.id) {
        this.addLibro(values)
        this.libro = {}
        this.$router.push('/')
      } else {
        this.editLibro(values)
        this.libro = {}
        this.$router.push('/')
      }
    },

    resetForm() {
      this.libro = {};
    },
  },
  mounted() {
    if(this.id){
      this.getLibroById(this.id)
    }
    
  }
};
</script>
<template>
  <div class="row">
    <div class="col-sm-6 col-md-4 col-lg-4 addProduct">
      <div class="newProduct">
        <h1 id="añadirProducto">{{ this.id ? "Modificar " : "Añadir " }}libro</h1>
        <Form :initial-values="libro" @submit="submitForm" @reset="resetForm" :validation-schema="mySchema">
          <fieldset>
            <legend class="bg-dark text-white text-center" id="tabla_prod">
              {{ this.id ? "Modificar " : "Añadir " }}libro
            </legend>
            <!-- Aquí los inputs y botones del form -->
            <div class="form-group">
              <label for="id">ID:</label>
              <Field type="text" id="id" name="id" class="form-control" disabled />
              <ErrorMessage name="id" />

            </div>
            <div class="form-group">
              <label for="nombre">Nombre:
                <Field type="text" name="nombre" class="form-control" id="nombre"/>
                <ErrorMessage name="nombre" class="text-danger"/>
              </label>
            </div>
            <div class="form-group">
              <label for="tema">Tema:
                <Field as="select" class="form-control" name="tema" id="tema">
                  <option value="undefined">--- Selecciona categoría ---</option>
                  <option v-bind:value="tema.id" v-for="tema in temas" :key="tema.id">
                    {{ tema.nombre }}
                  </option>
                </Field>
                <ErrorMessage name="tema" class="text-danger" />             </label>
            </div>
            <div class="form-group">
              <label for="autor">Autor:
                <Field as="select" class="form-control" name="autor" id="autor">
                  <option value="undefined">--- Selecciona categoría ---</option>
                  <option v-bind:value="item.id" v-for="item in autores" :key="item.id">
                    {{ item.nombre }}{{ item.apellidos }}
                  </option>
                </Field>
                <ErrorMessage name="autor" class="text-danger" />              </label>
            </div>
            <div class="form-group">
              <label for="ISBN">ISBN:</label>
              <Field type="text" name="ISBN" id="ISBN" class="form-control" />
              <ErrorMessage name="ISBN" class="text-danger" />           </div>
            <div class="form-group">
              <label for="desc">Descripción:</label>
              <Field as="textarea" name="desc" id="desc" class="form-control" rows="5"></Field>
              <ErrorMessage name="desc" class="text-danger" />        </div>
            <div class="form-group">
              <label for="img">Imagen:</label>
              <Field type="text" name="img" id="img" class="form-control" />
              <ErrorMessage name="img" class="text-danger"/>           </div>
            <button type="submit" class="btn btn-default btn-dark">{{ this.id ? "Modificar " : "Añadir " }}</button>
            <button type="reset" class="btn btn-danger">Reset</button>
            <!-- <button type="cancel" class="btn btn-warning">Cancelar</button> -->
          </fieldset>
        </Form>
      </div>
    </div>
  </div>
</template>
<style>
.addProduct {
  margin-left: 35%;
  margin-right: 35%;
}

span {
  margin-left: 2px;
  margin-right: 10px;

}
</style>

