import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/signup',
      name: 'signup-page',
      component: require('@/components/SignupPage').default
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: require('@/components/Dashboard').default
    },
    {
      path: '/create',
      name: 'create-org',
      component: require('@/components/topmenu/create').default
    },
    {
      path: '/manage',
      name: 'manage-org',
      component: require('@/components/topmenu/manage').default
    },
    {
      path: '/join',
      name: 'join-org',
      component: require('@/components/topmenu/join').default
    }
  ]
})
