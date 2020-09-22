import Api from '@/services/Api'

export default {
  fetch () {
    return Api().get('tratamientos')
  },

  add (params) {
    return Api().post('tratamiento_add', params)
  },

  update (params) {
    return Api().put('tratamiento/' + params.id, params)
  },

  get (params) {
    return Api().get('tratamiento/' + params.id)
  },

  delete (id) {
    return Api().delete('tratamiento/' + id)
  }
}
