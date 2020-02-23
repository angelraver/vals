import Vue from 'vue'
import Router from 'vue-router'
import Posts from '@/components/Posts'
import addpost from '@/components/AddPost'
import editpost from '@/components/EditPost'
import calendar from '@/components/calendar'
import clients from '@/components/clients'
import clientForm from '@/components/clientForm'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Posts,
      name: 'Posts'
    },
    {
      path: '/posts/add',
      component: addpost,
      name: 'addpost'
    },
    {
      path: '/posts/:id/edit',
      component: editpost,
      name: 'editpost'
    },
    {
      path: '/canlendar',
      component: calendar,
      name: 'calendar'
    },
    {
      path: '/clients',
      component: clients,
      name: 'clients'
    },
    {
      path: '/clientform',
      component: clientForm,
      name: 'clientForm'
    }
  ]
})
