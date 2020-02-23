<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary" md-elevation="0">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">{{title}}</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Navigation</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item>
              <md-icon>calendar_today</md-icon>
              <span class="md-list-item-text">Turnos</span>
            </md-list-item>
            <router-link v-bind:to="{ name: 'clients' }" class="md-primary">
              <md-list-item>
                <md-icon>people</md-icon>
                  <span class="md-list-item-text" >Clientes</span>
                </md-list-item>
              </router-link>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view @on-mounted-events="moutedEvents"></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  export default {
    name: 'PersistentMini',
    data: () => ({
      menuVisible: false,
      title: ''
    }),
    methods: {
      toggleMenu () {
        this.menuVisible = !this.menuVisible
      },
      moutedEvents: function (value) {
        this.title = value
      }
    }
  }
</script>

<style lang="scss" scoped>
  .md-app {
    min-height: 350px;
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
</style>
