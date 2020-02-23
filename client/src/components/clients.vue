<template>
  <div class="clients">
    <div v-if="clients.length > 0" class="table-wrap">
      <table>
        <tr>
          <td>Nombre</td>
          <td>Apellido</td>
          <td></td>
        </tr>
        <tr v-for="(item, index) in clients" v-bind:key="index" >
          <td>{{ item.firstName }}</td>
          <td>{{ item.lastName }}</td>
          <td align="center">
            <router-link v-bind:to="{ name: 'editClient', params: { id: item._id } }">Editar</router-link> |
            <a href="#" @click="deleteClient(post._id)">Borrar</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      No hay clientes para listar.
    </div>

    <router-link v-bind:to="{ name: 'clientForm' }" >
      <md-button class="md-fab md-primary">
        <md-icon>add</md-icon>
      </md-button>
    </router-link>

  </div>
</template>

<script>
import ClientsService from '@/services/ClientsService'
export default {
  name: 'clients',
  data () {
    return {
      clients: []
    }
  },
  mounted () {
    this.$emit('on-mounted-events', 'Clientes')
    this.getClients()
  },
  methods: {
    async getClients () {
      const response = await ClientsService.fetchClients()
      this.clients = response.data.clients
    },
    async deleteClient (id) {
      const $this = this
      $this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function () {
        ClientsService.deleteClient(id)
        $this.$router.go({
          path: '/'
        })
      })
    }
  }
}
</script>
