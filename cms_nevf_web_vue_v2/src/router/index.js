import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '@/components/auth/register';
import Login from '@/components/auth/login';
import Home from '@/components/main/home';
import Contacts from '@/components/main/contacts/contacts';
import AddContact from '@/components/main/contacts/add-contact';
import EditContact from '@/components/main/contacts/edit-contact';
import Users from '@/components/main/users/users';
import AddUser from '@/components/main/users/add-user';
import EditUser from '@/components/main/users/edit-user';
import Profile from '@/components/main/profile/profile';
import ChangePassword from '@/components/main/profile/change-password';
import { firebaseAuth } from "@/firebase/firebase.utils";

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'Signup',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    alias: '/home',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/add-contact',
    name: 'AddContact',
    component: AddContact,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/edit-contact/:id',
    name: 'EditContact',
    component: EditContact,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/add-user',
    name: 'AddUser',
    component: AddUser,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/edit-user/:id',
    name: 'EditUser',
    component: EditUser,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/profile/change-password',
    name: 'ChangePassword',
    component: ChangePassword,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/about.vue'),
  },
  {
    path: '/error',
    name: 'Error',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/error-500.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '*',
    name: 'PageNotFound',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/error-404.vue'),
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router guards
router.beforeEach((to, from, next) => {
  // console.log('------------------------------------');
  // console.log(to);
  // console.log('------------------------------------');
  // check to see if route has auth guard
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // check auth state of user
    let user = firebaseAuth.currentUser
    if (user) {
      // User is signed in. Proceed to route
      next()
    } else {
      // No user is signed in. Redirect to login
      next({
        name: 'Login'
      })
    }
  } else {
    // if route is not guarded by auth, proceed
    next()
  }
})

export default router
