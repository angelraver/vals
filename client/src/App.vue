<template>
  <div>
    <md-app>
      <md-app-toolbar class="md-primary" md-elevation="0">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">{{title}}</span>
      </md-app-toolbar>
      <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
        <md-toolbar class="md-transparent" md-elevation="0">
          <div class="logo" @click="toggleMenu">
            <img src="/static/images/logo-s.png" />
          </div>
        </md-toolbar>

        <navigation />

      </md-app-drawer>
      <md-app-content>
        <router-view @set-title="setTitle"></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
export default {
  name: 'PersistentMini',
  components: { Navigation },
  data: () => ({
    title: '',
    menuVisible: false
  }),
  methods: {
    setTitle: function (value) {
      this.title = value
    },
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  display: block;
  width: 100%;
  text-align: center;
}
.md-app {
  min-height: 350px;
  border: 1px solid rgba(#000, .12);
}
</style>
