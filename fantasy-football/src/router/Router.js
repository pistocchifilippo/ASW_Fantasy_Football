import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/landing/Home.vue';
import Login from '@/views/access/Login.vue';
import Register from '@/views/access/Register.vue';
import Lineups from '@/views/lineup/Lineups.vue';
import Stats from '@/views/stats/Stats.vue';
import NotFound from '@/views/error/404.vue';
import Unauthorized from '@/views/error/Unauthorized.vue';
import Main from '@/views/landing/Main.vue';
import Profile from '@/views/user/Profile.vue';
import Team from '@/views/user/Team.vue';
import Leagues from '@/views/leagues/Leagues.vue';
import AdminLogin from '@/views/admin/AdminLogin.vue';
import AdminPage from '@/views/admin/AdminPage.vue';

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
      path: '/private/main',
      name: 'adminPage',
      component: AdminPage
    },
    {
      path: '/private/login',
      name: 'adminLogin',
      component: AdminLogin
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
      path: '/leagues',
      name: 'leagues',
      component: Leagues
    },
    {
      path: '/stats',
      name: 'stats',
      component: Stats
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