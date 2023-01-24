import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Autores from '../views/AutoresView.vue'
import Libros from '../views/LibrosView.vue'
import AddLibro from '../views/AddView.vue'
import About from '../views/AboutView.vue'
import Autor from '../views/AutorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/autores',
      name: 'Autores',
      component: Autores
    },
    {
      path: '/libros',
      name: 'Libros',
      component: Libros
    },
    {
      path: '/añadir',
      name: 'AddLibro',
      component: AddLibro
    },
    {
      path: '/nosotros',
      name: 'About',
      component: About
    },
    {
      path: '/autor/:id',
      name: 'Autor',
      component: Autor,
      props: true
    },
    {
      path: '/libros_autor/:id',
      name: 'LibrosAutor',
      component: Libros,
      props: true
    },
    {
      path: '/editar/:id',
      name: 'Editar',
      component: AddLibro,
      props: true
    },
  ]
})

export default router
