import Vue from 'vue';
import Router from 'vue-router';
import Users from '@/views/Users.vue';
import New from '@/views/New.vue';
import Show from '@/views/Show.vue';
import Edit from '@/views/Edit.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import NotFound from '@/views/404.vue';
import Unauthorized from '@/views/Unauthorized.vue';
import Main from '@/views/Main.vue';
import Profile from '@/views/Profile.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/users'
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/auth',
      name: 'auth',
      component: Login
    },
    {
      path: '/signon',
      name: 'register',
      component: Register
    },    
    {
      path: '/main',
      name: 'main',
      component: Main
    },
    {
      path: '/users/new',
      name: 'new-user',
      component: New
    },
    {
      path: '/users/:id',
      name: 'show',
      component: Show
    },
    {
      path: '/users/:id/edit',
      name: 'edit',
      component: Edit
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: Unauthorized
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
   
  ]
});