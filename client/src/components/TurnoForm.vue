<template>
  <div>
    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-header>
        <div class="md-title">Nuevo turno para {{clientName}}</div>
      </md-card-header>
      <md-card-content>
        <div class="md-layout md-gutter">
          <md-datepicker
            v-model="selectedDate" 
            :md-disabled-dates="disabledDates"
            md-immediately
          >
            <label>Elige la fecha</label>
          </md-datepicker>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
  import ClientService from '@/services/ClientService'

  export default {
    name: 'TurnoForm',
    mounted () {
      this.$emit('on-mounted-events', 'Crear turno')
      if (this.$route.params.idclient) {
        this.getClient()
      }
      this.$material.locale.dateFormat = 'dd/MM/yyyy'
    },
    data: () => ({
      clientName: '',
      selectedDate: null,
      disabledDates: date => {
        const day = date.getDay()
        return day === 0
      }
    }),
    methods: {
      getClient () {
        ClientService.getClient({ id: this.$route.params.idclient })
        .then((client) => {
          this.clientName = client.data.firstName + ' ' + client.data.lastName
        })
      }
    }
  }
</script>
