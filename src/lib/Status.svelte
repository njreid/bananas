<script lang="ts">
  export let status = ""
  $: status = status ? status : "none"
</script>

<template lang="pug">

.status(class="{status}")
  p {status.toUpperCase()}

</template>

<style lang="stylus">

.status
  margin 0px 10px 0 0
  width 70px
  height 18px
  font-family Helvetica
  color white
  text-align center
  border-radius 3px
  display flex
  justify-content center
  align-content center
  flex-direction column
  p
    font-weight bold
    font-size 0.6em
    text-align center

.green
  background-color green

.yellow
  background-color yellow

.red
  background-color red

.none
  background-color #bbb

.na
  background-color white

</style>
