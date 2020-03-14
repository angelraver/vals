<template>
  <div class="tratamientos">
    <md-button class="md-fab md-primary button-top" v-on:click="goToNew()">
      <md-icon>add_circle</md-icon>
      <md-tooltip md-direction="bottom">Agregar tratamiento</md-tooltip>
    </md-button>

    <md-list class="md-double-line" v-if="tratamientos.length > 0" >
      <div v-for="(item, index) in tratamientos" v-bind:key="index">
        <md-list-item>
          <div class="md-list-item-text">
            <span>{{ item.titulo }}</span>
            <span>$ {{ item.precio }} - {{ item.duracion }} min</span>
            <p>{{ item.descripcion }}</p>
          </div>

          <md-button class="md-icon-button md-list-action" v-on:click="goToEdit(item._id)">
            <md-icon>edit</md-icon>
          </md-button>
        </md-list-item>
        <md-divider class="md-inset"></md-divider>
      </div>
    </md-list>

    <div v-else>
      <h2>No hay tratamientos para listar.</h2>
    </div>

    <md-snackbar :md-active.sync="this.$route.params.saved">Los datos se guardaron correctamente.</md-snackbar>

  </div>
</template>

<script>
import TratamientoService from '@/services/TratamientoService'
export default {
  name: 'Tratamientos',
  data: () => ({
    tratamientos: [],
    selectedTratamiento: null
  }),
  mounted () {
    this.$emit('on-mounted-events', 'Tratamientos')
    this.getTratamientos()
  },
  methods: {
    getTratamientos () {
      TratamientoService.fetchTratamientos()
      .then((response) => {
        this.tratamientos = response.data.tratamientos
      })
    },
    goToEdit (id) {
      this.$router.push({ name: 'TratamientoForm', params: { id } })
    },
    goToNew () {
      this.$router.push({ name: 'TratamientoForm', params: { id: null } })
    }
  }
}
</script>
