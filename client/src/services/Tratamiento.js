import Api from '@/services/Api'

export default {
  fetch () {
    return Api().get('tratamiento')
  },

  add (params) {
    return Api().post('tratamiento', params)
  },

  update (params) {
    return Api().put('tratamiento/' + params.id, params)
  },

  get (id) {
    return Api().get('tratamiento/' + id)
  },

  delete (id) {
    return Api().delete('tratamiento/' + id)
  }
}
