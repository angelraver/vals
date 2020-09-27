<template>
  <form>
    <h2>Nuevo turno para {{nuevoTurno.cliente.nombre}}</h2>
    <div class="md-layout md-gutter">
      <md-datepicker
        v-model="selectedDate" 
        :md-disabled-dates="disabledDates"
        md-immediately
      >
        <label>Elige la fecha</label>
      </md-datepicker>
    </div>
    <turnos-horas
      v-if="selectedDate"
      :fecha="dateFormated"
      :id-turno-cancelled="idTurnoCancelled"
      @hora-selected="horaSelected"
      @turno-to-cancel="turnoToCancel"
    />

    <tratamiento-pick v-if="showTratamientos" @tratamiento-selected="tratamientoSelected" />

    <md-dialog-confirm
      :md-active.sync="showCancelDialog"
      md-title="Cancelar Turno"
      :md-content="cancelText"
      md-confirm-text="Aceptar"
      md-cancel-text="Cancelar"
      @md-confirm="cancelTurno"
    />

  </form>
</template>

<script>
import ClienteService from '@/services/Cliente'
import TurnoService from '@/services/Turno'
import TratamientoPick from '@/components/Tratamiento/TratamientoPick'
import TurnosHoras from '@/components/Turno/TurnosHoras'
import format from 'date-fns/format'

export default {
  name: 'TurnoForm',
  components: { TratamientoPick, TurnosHoras },
  mounted () {
    this.$emit('set-title', 'Crear turno')
    if (this.$route.params.idCliente) this.getCliente()
    this.$material.locale.dateFormat = this.dateFormat
  },
  data: () => ({
    nuevoTurno: {
      fecha: {},
      cliente: {},
      tratamiento: {}
    },
    cancelText: '',
    idTurnoToCancel: null,
    idTurnoCancelled: null,
    showTratamientos: false,
    showCancelDialog: false,
    dateFormat: 'dd/MM/yyyy',
    selectedDate: null,
    disabledDates: date => {
      const day = date.getDay()
      return day === 0
    }
  }),
  computed: {
    dateFormated () {
      return format(this.selectedDate, this.dateFormat)
    }
  },
  methods: {
    async getCliente () {
      await ClienteService.get({ id: this.$route.params.idCliente })
      .then((cliente) => {
        this.nuevoTurno.cliente = {
          id: cliente.data._id,
          nombre: cliente.data.firstName + ' ' + cliente.data.lastName
        }
      })
    },
    horaSelected (hora) {
      this.showTratamientos = true
      this.nuevoTurno.fecha.dia = this.dateFormated
      this.nuevoTurno.fecha.hora = hora
    },
    async tratamientoSelected (tratamiento) {
      this.showTratamientos = false
      this.nuevoTurno.tratamiento = tratamiento
      await TurnoService.add(this.nuevoTurno).then(() => {
        this.$router.push({ name: 'ClienteDetails', params: { id: this.nuevoTurno.cliente.id } })
      })
    },
    turnoToCancel (turno) {
      this.showCancelDialog = true
      this.cancelText = `${turno.fecha.dia} a las ${turno.fecha.hora} : ${turno.cliente.nombre} - ${turno.tratamiento.titulo} Estás a punto de cancelar éste turno.`
      this.idTurnoToCancel = turno._id
    },
    async cancelTurno () {
      await TurnoService.delete(this.idTurnoToCancel).then(() => {
        console.log('Deleted!')
        this.idTurnoCancelled = this.idTurnoToCancel
      })
    }
  }
}
</script>
 