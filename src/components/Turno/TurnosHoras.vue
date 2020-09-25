<template>
  <md-list class="md-double-line md-dense">
    <div v-for="(item, index) in turnosHoras" v-bind:key="index">
      <md-list-item class="horas-item">
        <md-avatar>
          {{ item.fecha.hora }}
        </md-avatar>
        <div class="md-list-item-text" v-if="item.cliente">
          <span>{{ item.cliente.nombre }}</span>
          <p>{{ item.tratamiento.titulo }}</p>
        </div>
        <md-button class="md-icon-button md-list-action" v-if="item.cliente" v-on:click="cancel(item)">
          <md-icon class="md-primary">cancel</md-icon>
        </md-button>
        <md-button class="md-icon-button md-list-action" v-if="!item.cliente" v-on:click="horaSelected(item.fecha.hora)">
          <md-icon class="md-primary">alarm</md-icon>
        </md-button>
      </md-list-item>
      <md-divider class="md-inset"></md-divider>
    </div>
  </md-list>
</template>

<script>
import TurnoService from '@/services/Turno'

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
    turnosHoras: []
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
    horaSelected (hora) {
      this.$emit('hora-selected', hora)
    },
    cancel (turno) {
      this.$emit('turno-to-cancel', turno)
    },
    async getTurnosHoras () {
      await TurnoService.fetch({ fecha: this.fecha })
      .then((response) => {
        console.log(response.data)
        this.turnosHoras = horas(8, 20).map((hora) => {
          return response.data.find(turno => turno.fecha.hora === hora) || { fecha: { hora } }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.md-avatar {
  width: 3em !important;
}
.md-list-item-text span {
  font-size: 20px !important;
}
.horas-item:hover {
  background: #03dac5;
}

@media only screen and (max-width: 600px) {
  .md-avatar {
    width: 1em !important;
    font-size: 14px;
    font-weight: bold;
  }
  .md-list-item-text span {
    font-size: 18px !important;
  }
}
</style>