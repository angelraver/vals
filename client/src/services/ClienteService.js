import Api from '@/services/Api'

export default {
  fetchClientes () {
    return Api().get('clients')
  },

  addCliente (params) {
    return Api().post('client_add', params)
  },

  updateCliente (params) {
    return Api().put('client/' + params.id, params)
  },

  getCliente (params) {
    return Api().get('client/' + params.id)
  },

  deleteCliente (id) {
    return Api().delete('client/' + id)
  }
}
