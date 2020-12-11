<template>
  <div>
    <md-card md-with-hover v-for="(turnoFecha, index) in turnos" v-bind:key="index">
      <md-ripple>
        <md-card-header>
          <div class="md-title">{{ dateLabel(turnoFecha[0].fecha) }}</div>
        </md-card-header>
        <md-card-content>
          <md-list class="md-double-line">
            <md-list-item v-for="(item, index) in turnoFecha" v-bind:key="index">
              <md-avatar>
                {{ item.hora }}
              </md-avatar>
              <div class="md-list-item-text">
                <span>{{ item.firstName }} {{ item.lastName }}</span>
                <span>{{ item.titulo }}</span>
              </div>
            </md-list-item>
          </md-list>
        </md-card-content>
      </md-ripple>
    </md-card>
  </div>
</template>

<script>
import TurnoService from '@/services/Turno'
import D from '@/utils/date'
import _ from 'lodash'

export default {
  name: 'TurnosLanding',
  data: () => ({
    turnos: []
  }),
  mounted () {
    this.getTurnos()
    this.$emit('set-title', 'Turnos')
  },
  methods: {
    async getTurnos () {
      await TurnoService.fetch({ status: 'activo', next: '', get: true })
      .then((response) => {
        const fechas = _.uniq(response.data.map(t => t.fecha))
        const fechasOrdenadas = _.sortBy(response.data, [t => t.fecha])
        this.turnos = fechas.map((fecha) => {
          const fechaGrupo = fechasOrdenadas.filter(turno => turno.fecha === fecha)
          // return _.sortBy(fechaGrupo, [t => t.hora])
          return fechaGrupo
        })
      })
    },
    dateLabel (date) {
      return D.label(date)
    }
  }
}
</script>

<style lang="scss" scoped>
.md-card {
  margin-bottom: 1em;
}
.md-avatar {
  width: 1em !important;
  font-size: 14px;
  font-weight: bold;
}
</style>