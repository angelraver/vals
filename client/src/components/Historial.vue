<template>
  <div>
    <md-table v-model="turnos">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Fecha" md-sort-by="fecha">{{ item.fecha }}</md-table-cell>
        <md-table-cell md-label="Hora" md-sort-by="hora">{{ horaStr(item.hora) }}</md-table-cell>
        <md-table-cell md-label="Cliente" md-sort-by="firstName">{{ item.firstName }} {{ item.lastName }}</md-table-cell>
        <md-table-cell md-label="Tratamiento" md-sort-by="titulo">{{ item.titulo }}</md-table-cell>
        <md-table-cell md-label="Precio" md-sort-by="precio">$ {{ item.precio }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import TurnoService from '@/services/Turno'
import MT from '@/utils/miniTemplates.js'
import D from '@/utils/date'
import H from '@/utils/hora'
// import _ from 'lodash'

export default {
  name: 'Historial',
  data: () => ({
    turnos: [],
    showTurnoDetailDialog: false,
    turnoDetailText: '',
    turnoToCancel: {},
    idTurnoCancelled: null,
    showCancelDialog: false,
    cancelText: ''
  }),
  watch: {
    idTurnoCancelled: function () {
      this.getTurnos()
    }
  },
  mounted () {
    this.getTurnos()
    this.$emit('set-title', 'Historial')
  },
  methods: {
    async getTurnos () { // this returns the format [Dias [Turnos]]
      await TurnoService.fetch({ status: 'activo', next: '', get: true })
      .then((response) => {
        this.turnos = response.data
      })
    },
    turnoDetail (turno) {
      this.showTurnoDetailDialog = true
      this.turnoDetailText = MT.turnoDetails(turno)
      this.turnoToCancel = turno
    },
    goToCancelTurno () {
      this.showTurnoDetailDialog = false
      this.showCancelDialog = true
      this.cancelText = MT.turnoDetails(this.turnoToCancel)
    },
    async cancelTurno () {
      const turno = {
        id: this.turnoToCancel.id,
        status: 'eliminado'
      }
      await TurnoService.update(turno).then(() => {
        this.idTurnoCancelled = this.turnoToCancel.id
      })
    },
    initial (text) {
      return text ? text[0] : ''
    },
    dateLabel (date) {
      return D.label(date)
    },
    horaStr (hora) {
      return H.horaToStr(hora)
    }
  }
}
</script>
