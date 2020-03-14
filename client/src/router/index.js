import Vue from 'vue'
import Router from 'vue-router'
import Calendar from '@/components/Calendar'
import Clients from '@/components/Clients'
import ClientDetails from '@/components/ClientDetails'
import ClientForm from '@/components/ClientForm'
import TurnoForm from '@/components/TurnoForm'
import Tratamientos from '@/components/Tratamientos'
import TratamientoForm from '@/components/TratamientoForm'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/canlendar',
      component: Calendar,
      name: 'Calendar'
    },
    {
      path: '/clients',
      component: Clients,
      name: 'Clients'
    },
    {
      path: '/client/:id',
      component: ClientDetails,
      name: 'ClientDetails'
    },
    {
      path: '/clientform/:id',
      component: ClientForm,
      name: 'ClientForm'
    },
    {
      path: '/turnofrom/:idclient',
      component: TurnoForm,
      name: 'TurnoForm'
    },
    {
      path: '/tratamientos',
      component: Tratamientos,
      name: 'Tratamientos'
    },
    {
      path: '/tratamientoform/:id',
      component: TratamientoForm,
      name: 'TratamientoForm'
    }
  ]
})
