<script lang="ts">
  import { loading } from "./stores.js"
</script>

<template lang="pug">
+if('$loading') 
  .loading 
    h1 LOADING...
</template>

<style lang="stylus">
.loading
  z-index 10
  position fixed
  top 20vh
  left calc(50vw - 200px)
  width 400px
  height 200px
  display flex
  align-items center
  justify-content center
  background-color rgba(0,0,0,0.5)

  h1
    font-size 4em
    color white
</style>
