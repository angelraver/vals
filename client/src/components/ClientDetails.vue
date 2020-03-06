<template>
  <div>
    <md-card>
      <md-card-header>
        <div class="md-title">{{ firstName }} {{ lastName }}</div>
        <div class="md-subhead" v-if="phone">
          <a :href="'tel:' + phone" >
          <img src="/static/wasap.png" />
          {{ phone }}
          </a>
        </div>
        <div class="md-subhead">{{ gender === 'M' ? 'Mujer' : 'Hombre' }}</div>
      </md-card-header>

      <md-card-content>
        {{ description }}
      </md-card-content>
    </md-card>
  
    <md-button class="md-fab md-primary button-top" v-on:click="newTurno()">
      <md-icon>add_alarm</md-icon>
      <md-tooltip md-direction="bottom">Agregar turno</md-tooltip>
    </md-button>

    <md-button class="md-primary md-raised button-bottom" v-on:click="goToEdit()">
      EDITAR
    </md-button>

    <dialog-confirm
      buttonText="Eliminar"
      title="Eliminar Cliente"
      content="Estás a punto de eliminar éste cliente. Estás seguro que quieres hacerlo?"
      confirmText="Eliminarlo"
      cancelText="Cancelar"
      v-bind:onConfirm="deleteClient"
      class="button-bottom"
    >
    </dialog-confirm>

    <md-snackbar :md-active.sync="this.$route.params.saved">Los datos se guardaron correctamente.</md-snackbar>

  </div>
</template>

<script>
  import ClientService from '@/services/ClientService'
  import DialogConfirm from './DialogConfirm'

  export default {
    name: 'ClientDetails',
    components: {
      DialogConfirm
    },
    mounted () {
      this.$emit('on-mounted-events', 'Detalle de cliente')
      if (this.$route.params.id) {
        this.getClient()
      }
    },
    data: () => ({
      firstName: '',
      lastName: '',
      phone: '',
      gender: '',
      email: '',
      description: ''
    }),
    methods: {
      getClient () {
        ClientService.getClient({ id: this.$route.params.id })
        .then((client) => {
          this.firstName = client.data.firstName
          this.lastName = client.data.lastName
          this.phone = client.data.phone
          this.gender = client.data.gender
          this.email = client.data.email
          this.description = client.data.description
        })
      },
      deleteClient () {
        ClientService.deleteClient(this.$route.params.id).then(() => {
          this.$router.push({ name: 'Clients', params: { saved: true } })
        })
      },
      goToEdit () {
        this.$router.push({ name: 'ClientForm', params: { id: this.$route.params.id } })
      },
      newTurno () {
        this.$router.push({ name: 'TurnoForm', params: { idclient: this.$route.params.id } })
      }
    }
  }
</script>
