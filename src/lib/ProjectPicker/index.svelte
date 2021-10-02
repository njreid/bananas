<script lang="ts">
  // import * as Asana from "asana"
  export let projectId = ""

  import { onMount } from "svelte"
  import StatusUpdate from "../StatusUpdate.svelte"
  import Status from "../Status.svelte"
  import ExpandedProject from "../ExpandedProject.svelte"
  import { asana, rootData, loading, selectedPortfolio } from "../stores.js"
  import { replaceURLs } from "../utils"

  let projectStatuses = {}
</script>

<template lang="pug">

.wrapper
  #report
    h2 Goals
    .portfolios
      +each('$rootData as portfolio')
        .portfolio 
          .title
            p 
             a(href="https://app.asana.com/0/{portfolio.gid}/list", target="_blank") { portfolio.name }
          .subtitle
            p 
              Status(status="{ portfolio.current_status ? portfolio.current_status.color : 'none'}") 
            p Owner: {portfolio.owner.name}
          StatusUpdate(update="{portfolio.current_status}")
          ExpandedProject(projectId="{portfolio.gid}")

</template>

<style lang="stylus">

.wrapper 
  margin 0 10px

#report
  margin auto
  max-width 1100px

.subtitle
  display flex
  height 30px
  p
    margin-right 20px

.portfolios
  margin 0

.portfolio
  margin 10px 0 10px 0

.title
  display flex
  background-color black
  padding 4px 10px
  color white
  font-size 1.2em
  p
    padding 0
    margin 4px
    a
      color white

</style>
