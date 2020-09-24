import Api from '@/services/Api'

export default {
  fetch (params) {
    return Api().post('turnos', params)
  },

  add (params) {
    return Api().post('turno_add', params)
  },

  delete (id) {
    return Api().delete('turno/' + id)
  }
}
