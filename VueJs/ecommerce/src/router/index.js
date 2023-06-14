import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PageNotFound from '../views/page-not-found.vue'

// import FacesList from '../views/faces/FacesListView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:'/faces',
    name:'faces',
    component: () => import(/* webpackChunkName: "faces" */ '../views/FacesView.vue'),
    // children:[
    //   {
    //     path: 'list',
    //     name: 'List',
    //     component: () => import(/* webpackChunkName: "list" */ '../views/faces/FacesListView.vue')
    //     component: FacesList
    //   },
    // ],
  },
  {
    path:'/faces-list',
    name:'faces-list',
    component: () => import(/* webpackChunkName: "faces" */ '../views/faces/FacesListView.vue'),
  },
  {
    path: "/:catchAll(.*)",
    name:"NotFound",
    component: PageNotFound,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
