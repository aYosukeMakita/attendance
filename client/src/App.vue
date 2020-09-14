<template>
  <router-view></router-view>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
})
</script>

<style>
.column-icon {
  width: 3rem;
}
.column-name {
  width: 12rem;
}
.column-toggle {
  width: 10rem;
  display: flex;
  justify-content: center;
}
</style>
