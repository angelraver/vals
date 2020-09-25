<template>
  <div>
    <md-card>
      <md-card-header>
        <div class="md-title">{{ firstName }} {{ lastName }}</div>
        <div class="md-subhead" v-if="phone">
          <a :href="'tel:' + phone" >
            <img src="/static/images/wasap.png" />
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

    <md-button class="md-secondary md-raised button-bottom" @click="goToEdit()">Editar</md-button>

    <md-button class="md-secondary md-raised  button-bottom" @click="showDeleteDialog = true">Eliminar</md-button>

    <md-dialog-confirm
      :md-active.sync="showDeleteDialog"
      md-title="Eliminar Cliente"
      md-content="Estás a punto de eliminar éste cliente."
      md-confirm-text="Aceptar"
      md-cancel-text="Cancelar"
      @md-confirm="deleteCliente"
    />

    <md-snackbar :md-active.sync="this.$route.params.saved">Los datos se guardaron correctamente.</md-snackbar>

  </div>
</template>

<script>
  import ClienteService from '@/services/Cliente'

  export default {
    name: 'ClienteDetails',
    mounted () {
      this.$emit('set-title', 'Detalle de cliente')
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
      description: '',
      showDeleteDialog: false
    }),
    methods: {
      async getCliente () {
        await ClienteService.get({ id: this.$route.params.id })
        .then((response) => {
          let c = response.data
          this.firstName = c.firstName
          this.lastName = c.lastName
          this.phone = c.phone
          this.gender = c.gender
          this.email = c.email
          this.description = c.description
        })
      },
      async deleteCliente () {
        await ClienteService.delete(this.$route.params.id).then(() => {
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
