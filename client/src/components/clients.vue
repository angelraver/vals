<template>
  <div class="clients">
    <md-autocomplete
      v-model="selectedClient"
      :md-options="getSanitizedClients"
      :md-open-on-focus="false"
      md-layout="box"
      @md-selected="onSelect"
    >
      <label>Buscar...</label>
      <template slot="md-autocomplete-item" slot-scope="{ item, term }">
        <md-highlight-text :md-term="term">{{ item.name }}</md-highlight-text>
      </template>
    </md-autocomplete>

    <md-button class="md-fab md-primary button-top" v-on:click="goToNew()">
      <md-icon>person_add</md-icon>
      <md-tooltip md-direction="bottom">Agregar cliente</md-tooltip>
    </md-button>

    <md-list class="md-double-line" v-if="clients.length > 0" >

      <md-list-item v-for="(item, index) in clients" v-bind:key="index" v-on:click="goToDetails(item._id)">
        <md-icon class="md-primary">person</md-icon>
        <div class="md-list-item-text">
          <span>{{ item.firstName }} {{ item.lastName }}</span>
          <span>{{ item.phone }}</span>
        </div>
      </md-list-item>

    </md-list>

    <div v-else>
      <h2>No hay clientes para listar.</h2>
    </div>

    <md-snackbar :md-active.sync="this.$route.params.saved">Los datos se guardaron correctamente.</md-snackbar>

  </div>
</template>

<script>
import ClientService from '@/services/ClientService'
export default {
  name: 'Clients',
  computed: {
    getSanitizedClients () {
      return this.clients.map(client => ({
        'id': client._id,
        'name': client.firstName + ' ' + client.lastName,
        'toLowerCase': () => client.firstName.toLowerCase(),
        'toString': () => client.fistName
      }))
    }
  },
  data: () => ({
    clients: [],
    selectedClient: null
  }),
  mounted () {
    this.$emit('on-mounted-events', 'Clientes')
    this.getClients()
  },
  methods: {
    getClients () {
      ClientService.fetchClients()
      .then((response) => {
        this.clients = response.data.clients
      })
    },
    onSelect (val) {
      this.goToDetails(val.id)
    },
    goToDetails (id) {
      this.$router.push({ name: 'ClientDetails', params: { id } })
    },
    goToNew () {
      this.$router.push({ name: 'ClientForm', params: { id: null } })
    }
  }
}
</script>
