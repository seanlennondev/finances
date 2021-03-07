<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  created () {
    const darkmode = this.$q.localStorage.getItem('darkmode') || false
    this.$q.dark.set(darkmode)
  }
}
</script>
