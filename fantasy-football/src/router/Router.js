import Vue from 'vue';
import Router from 'vue-router';
import Users from '@/views/Users.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Lineups from '@/views/Lineups.vue';
import NotFound from '@/views/404.vue';
import Unauthorized from '@/views/Unauthorized.vue';
import Main from '@/views/Main.vue';
import Profile from '@/views/Profile.vue';
import Team from '@/views/Team.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
      path: '/team',
      name: 'team',
      component: Team
    },
    {
      path: '/lineups',
      name: 'lineups',
      component: Lineups
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