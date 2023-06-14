<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <div class="content">
    <button class="button is-primary">
      Button
    </button>
  </div>
  <AboutWorld></AboutWorld>
</template>

<script>
// @ is an alias to /src
import AboutWorld from '@/components/AboutWorld.vue'

export default {
  name: 'AboutView',
  components: {
    AboutWorld
  }
}
</script>
