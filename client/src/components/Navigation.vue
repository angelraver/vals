<template>
  <md-list>
    <router-link v-bind:to="{ name: 'Landing' }" class="md-primary">
      <md-list-item>
        <md-icon>home</md-icon>
        <span class="md-list-item-text" >Landing</span>
      </md-list-item>
    </router-link>

    <router-link v-bind:to="{ name: 'TurnosLanding' }" class="md-primary">
      <md-list-item>
        <md-icon>calendar_today</md-icon>
        <span class="md-list-item-text">Turnos</span>
      </md-list-item>
    </router-link>

    <router-link v-bind:to="{ name: 'Clientes' }" class="md-primary">
      <md-list-item>
        <md-icon>people</md-icon>
        <span class="md-list-item-text" >Clientes</span>
      </md-list-item>
    </router-link>

    <router-link v-bind:to="{ name: 'Tratamientos' }" class="md-primary">
      <md-list-item>
        <md-icon>menu_book</md-icon>
        <span class="md-list-item-text" >Tratamientos</span>
      </md-list-item>
    </router-link>

  </md-list>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>
<style lang="scss">
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
  z-index: 6;
}
</style>


