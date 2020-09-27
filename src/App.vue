<template>
  <div>
    <md-app>
      <md-app-toolbar class="md-primary" md-elevation="0">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="isMobile">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">{{title}}</span>
      </md-app-toolbar>
      <md-app-drawer :md-active.sync="menuVisible" md-persistent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          <div class="logo">
            <img src="/static/images/logo-s.png" />
          </div>
        </md-toolbar>
        <navigation v-if="menuVisible" @toggle-menu="toggleMenu"/>
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
    menuVisible: true
  }),
  mounted () {
    this.menuVisible = !this.isMobile
  },
  computed: {
    isMobile () {
      return window.innerWidth < 600
    }
  },
  methods: {
    setTitle: function (value) {
      this.title = value
    },
    toggleMenu () {
      if (this.isMobile) {
        this.menuVisible = !this.menuVisible
      }
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
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
form {
  width: 400px;
  margin: 20px;
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
  z-index: 6;
}

@media only screen and (max-width: 600px) {
 form {
    width: 100%;
    margin: 0;
  }
}
</style>
