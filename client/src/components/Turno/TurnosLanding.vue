<template>
  <md-card>
    <md-card-header>
      <div class="md-title">Próximos turnos</div>
    </md-card-header>

    <md-card-content>
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
      <div v-else>
        <h3>No hay turnos cargados.</h3>
      </div>
    </md-card-content>
  </md-card>
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