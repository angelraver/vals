import Api from '@/services/Api'

export default {
  fetchTratamientos () {
    return Api().get('tratamientos')
  },

  addTratamiento (params) {
    return Api().post('tratamiento_add', params)
  },

  updateTratamiento (params) {
    return Api().put('tratamiento/' + params.id, params)
  },

  getTratamiento (params) {
    return Api().get('tratamiento/' + params.id)
  },

  deleteTratamiento (id) {
    return Api().delete('tratamiento/' + id)
  }
}
