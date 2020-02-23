import Api from '@/services/Api'

export default {
  fetchClients () {
    return Api().get('clients')
  },

  addClient (params) {
    return Api().post('client_add', params)
  },

  updateClient (params) {
    return Api().put('client/' + params.id, params)
  },

  getClient (params) {
    return Api().get('client/' + params.id)
  },

  deleteClient (id) {
    return Api().delete('client/' + id)
  }
}
