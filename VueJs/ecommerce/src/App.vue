<template>
  <HeaderBar />
  <div class="main-section columns">
    <!-- <NavBar /> -->
    <router-view />
  </div>
</template>

<script>
// import NavBar from '@/components/NavBar';
import HeaderBar from '@/components/header-bar.vue';

export default {
  name: 'App',
  components: { HeaderBar },
};
</script>

<style lang="scss">
@import '@/design/index.scss';

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

// nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
