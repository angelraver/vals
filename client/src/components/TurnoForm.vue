<template>
  <div>
    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-header>
        <div class="md-title">Nuevo turno para<br /> {{clientName}}</div>
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

      <div v-if="selectedDate">
        <md-list class="md-double-line md-dense">
          <div v-for="(item, index) in horas" v-bind:key="index" v-on:click="showTratamiento(item.text)">
            <md-list-item class="horas-item">
              <md-avatar>
                {{ item.text }}
              </md-avatar>

              <div class="md-list-item-text">
                <span></span>
                <p></p>
              </div>

              <md-button class="md-icon-button md-list-action">
                <md-icon class="md-primary">alarm</md-icon>
              </md-button>
            </md-list-item>
            <md-divider class="md-inset"></md-divider>
          </div>
        </md-list>
      </div>

    </md-card>

    <md-dialog :md-active.sync="showDialog">
      <turno-form-details />
    </md-dialog>

  </div>
</template>

<script>
  import ClientService from '@/services/ClientService'
  import TurnoFormDetails from './TurnoFormDetails'
  import format from 'date-fns/format'

  export default {
    name: 'TurnoForm',
    components: {
      TurnoFormDetails
    },
    mounted () {
      this.$emit('on-mounted-events', 'Crear turno')
      if (this.$route.params.idclient) this.getClient()
      this.$material.locale.dateFormat = this.dateFormat
    },
    data: () => ({
      showDialog: false,
      dateFormat: 'dd/MM/yyyy',
      clientName: '',
      selectedDate: null,
      disabledDates: date => {
        const day = date.getDay()
        return day === 0
      },
      horas: [
        { id: 9, text: '9:00' },
        { id: 10, text: '10:00' },
        { id: 11, text: '11:00' },
        { id: 12, text: '12:00' },
        { id: 13, text: '13:00' },
        { id: 14, text: '14:00' },
        { id: 15, text: '15:00' },
        { id: 16, text: '16:00' },
        { id: 17, text: '17:00' },
        { id: 18, text: '18:00' },
        { id: 19, text: '19:00' }
      ]
    }),
    methods: {
      getClient () {
        ClientService.getClient({ id: this.$route.params.idclient })
        .then((client) => {
          this.clientName = client.data.firstName + ' ' + client.data.lastName
        })
      },
      getFormat () {
        return this.selectedDate ? format(this.selectedDate, this.dateFormat) : 'NO DATE'
      },
      showTratamiento (hora) {
        this.showDialog = true
        console.log(hora)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .md-avatar {
    width: 3em !important;
  }

  .horas-item:hover {
    background: #03dac5;
  }
</style>
