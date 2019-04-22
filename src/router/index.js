import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase';
import List from '@/components/List'
import Login from '@/components/Login'

Vue.use(Router)

let router = new Router({
  routes: [{
      path: '/List',
      name: 'List',
      component: List,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/',
      name: '',
      component: List,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
  ]
})

export default router;

const onAuthRequired = async (to, from, next) => {

  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('Login');
  else next();

  next();

};

router.beforeEach(onAuthRequired);