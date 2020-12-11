<template>
  <div>
    <md-list class="md-double-line md-dense">
      <div v-for="(items, index) in turnosHoras" v-bind:key="index">
        <md-list-item class="horas-item" >
          <md-avatar>
            {{ items[0].hora }}
          </md-avatar>
          <div v-if="items[0].idCliente">
            <span v-for="(item, index) in items" v-bind:key="index">
              <md-avatar
                @click.native="turnoDetail(item)"
                class="md-avatar-icon client-initials md-accent"
              >
                {{ initial(item.firstName)+initial(item.lastName) }}
              </md-avatar>
            </span>
          </div>
          <md-button class="md-icon-button md-list-action" v-on:click="items.length < 3 ? horaSelected(items[0].hora) : false">
            <md-icon v-bind:class="[items.length < 3 ? 'md-primary' : '']">alarm</md-icon>
          </md-button>
        </md-list-item>
        <md-divider class="md-inset"></md-divider>
      </div>
    </md-list>
    <md-dialog-confirm
      :md-active.sync="showTurnoDetailDialog"
      md-title="Turno"
      :md-content="turnoDetailText"
      md-confirm-text="¿Cancelar?"
      md-cancel-text="Ok"
      @md-confirm="goToCancelTurno"
    />
  </div>
</template>

<script>
import TurnoService from '@/services/Turno'
import D from '@/utils/date'
import MT from '@/utils/miniTemplates.js'

const horas = (start, end) => {
  return Array(end - start + 1).fill().map((_, idx) => start + idx + ':00')
}

export default {
  name: 'TurnosHoras',
  components: {},
  props: {
    tratamiento: {
      type: String,
      default: ''
    },
    fecha: {
      type: String,
      required: true
    },
    idTurnoCancelled: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    turnosHoras: [],
    showTurnoDetailDialog: false,
    turnoDetailText: '',
    turnoToCancel: {}
  }),
  watch: {
    fecha: function () {
      this.getTurnosHoras()
    },
    idTurnoCancelled: function () {
      this.getTurnosHoras()
    }
  },
  mounted () {
    this.getTurnosHoras()
  },
  methods: {
    initial (text) {
      return text ? text[0] : ''
    },
    horaSelected (hora) {
      this.$emit('hora-selected', hora)
    },
    turnoDetail (turno) {
      this.showTurnoDetailDialog = true
      this.turnoDetailText = MT.turnoDetails(turno)
      this.turnoToCancel = turno
    },
    goToCancelTurno () {
      this.showTurnoDetailDialog = false
      this.$emit('turno-to-cancel', this.turnoToCancel)
    },
    async getTurnosHoras () {
      const f = D.dateObj(this.fecha)
      const fecha = f.year + '-' + f.month + '-' + f.day
      await TurnoService.fetch({ fecha, status: 'activo', get: true })
      .then((response) => {
        this.turnosHoras = horas(8, 20).map((hora) => {
          var turnosBlock = response.data.filter(turno => turno.hora === hora)
          return turnosBlock.length > 0 ? turnosBlock : [{ hora }]
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.client-initials {
  margin: 0 .5em;
}
@media only screen and (max-width: 600px) {
  .md-avatar {
    width: 1em !important;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>