import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  //login admin
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admins',
    name: 'admins',
    component: () => import('../views/Admin.vue'),
    meta: {
      requiresAuth: true
    }
  },
  //messages
  {
    path: '/sorry',
    name: 'sorry',
    component: () => import('../views/Sorry.vue')
  },

  //taxis
  {
    path: '/taxis',
    name: 'taxis',
    component: () => import('../views/taxis/Taxis.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/taxis/create',
    name: 'taxis-create',
    component: () => import('../views/taxis/TaxiCreate.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/taxis/edit',
    name: 'taxis-edit',
    component: () => import('../views/taxis/TaxiEdit.vue'),
    meta: {
      requiresAuth: true
    },
    props: false
  },
  {
    path: '/taxis/e/:taxiId',
    name: 'taxi-detail',
    component: () => import('../views/taxis/TaxiDetail.vue'),
    meta: {
      requiresAuth: true
    },
    props: false
  },

  //courses
  {
    path: '/courses',
    name: 'courses',
    component: () => import('../views/Courses.vue'),
    meta: {
      requiresAuth: false
    }
  },

  //véhicules
  {
    path: '/vehicules',
    name: 'vehicules',
    component: () => import('../views/Vehicules.vue'),
    meta: {
      requiresAuth: false
    }
  },

  //villes
  {
    path: '/villes',
    name: 'villes',
    component: () => import('../views/Villes.vue'),
    meta: {
      requiresAuth: false
    }
  },

  //socket
  {
    path: '/socket',
    name: 'socket',
    component: () => import('../views/Socket.vue'),
    meta: {
      requiresAuth: false
    }
  },

  //options
  {
    path: '/options',
    name: 'options',
    component: () => import('../views/Options.vue'),
    meta: {
      requiresAuth: false
    }
  },

  //admins
  {
    path: '/admins/active',
    name: 'admins-active',
    component: () => import('../views/admins/AdminActif.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admins/inactive',
    name: 'admins-inactive',
    component: () => import('../views/admins/AdminInactif.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admins/create',
    name: 'admins-create',
    component: () => import('../views/admins/AdminCreate.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admins/edit',
    name: 'admins-edit',
    component: () => import('../views/admins/AdminEdit.vue'),
    meta: {
      requiresAuth: true
    },
    props: false
  },
  {
    path: '/admins/detail',
    name: 'admins-detail',
    component: () => import('../views/admins/AdminDetail.vue'),
    meta: {
      requiresAuth: true
    },
    props: false
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({ path: '/login' })
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
