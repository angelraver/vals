<template>
  <div>
    <md-list class="md-triple-line" v-if="turnos.length > 0">
      <div v-for="(item, index) in turnos" v-bind:key="index">
        <md-list-item>
          <div class="md-list-item-text">
            <span>{{ item.cliente.nombre }}</span>
            <span>{{ item.fecha.dia }} {{ item.fecha.hora }}</span>
            <p>{{ item.tratamiento.titulo }}</p>
          </div>
        </md-list-item>
        <md-divider class="md-inset"></md-divider>
      </div>
    </md-list>
    <h3 v-else>No hay turnos cargados.</h3>
  </div>
</template>

<script>
import TurnoService from '@/services/Turno'

export default {
  name: 'TurnosLanding',
  data: () => ({
    turnos: []
  }),
  mounted () {
    this.getTurnos()
    this.$emit('set-title', 'Próximos turnos')
  },
  methods: {
    async getTurnos () {
      await TurnoService.fetch({ status: 'activo' })
      .then((response) => {
        this.turnos = response.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>