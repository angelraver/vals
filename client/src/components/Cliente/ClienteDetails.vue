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
      v-bind:onConfirm="deleteCliente"
      class="button-bottom"
    >
    </dialog-confirm>

    <md-snackbar :md-active.sync="this.$route.params.saved">Los datos se guardaron correctamente.</md-snackbar>

  </div>
</template>

<script>
  import ClienteService from '@/services/ClienteService'
  import DialogConfirm from '@/components/components/DialogConfirm'

  export default {
    name: 'ClienteDetails',
    components: { DialogConfirm },
    mounted () {
      this.$emit('on-mounted-events', 'Detalle de cliente')
      if (this.$route.params.id) {
        this.getCliente()
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
      getCliente () {
        ClienteService.getCliente({ id: this.$route.params.id })
        .then((cliente) => {
          this.firstName = cliente.data.firstName
          this.lastName = cliente.data.lastName
          this.phone = cliente.data.phone
          this.gender = cliente.data.gender
          this.email = cliente.data.email
          this.description = cliente.data.description
        })
      },
      deleteCliente () {
        ClienteService.deleteCliente(this.$route.params.id).then(() => {
          this.$router.push({ name: 'Clientes', params: { saved: true } })
        })
      },
      goToEdit () {
        this.$router.push({ name: 'ClienteForm', params: { id: this.$route.params.id } })
      },
      newTurno () {
        this.$router.push({ name: 'TurnoForm', params: { idCliente: this.$route.params.id } })
      }
    }
  }
</script>
