import Api from '@/services/Api'

export default {
  fetch () {
    return Api().get('clients')
  },

  add (params) {
    return Api().post('client_add', params)
  },

  update (params) {
    return Api().put('client/' + params.id, params)
  },

  get (params) {
    return Api().get('client/' + params.id)
  },

  delete (id) {
    return Api().delete('client/' + id)
  }
}
