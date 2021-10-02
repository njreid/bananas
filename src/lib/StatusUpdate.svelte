<script lang="ts">
  export let update
  import Status from "./Status.svelte"
  import { replaceURLs, extractSections, timeString } from "./utils"
</script>

<template lang="pug">
+if("update")
  p
    | {@html replaceURLs(extractSections(update.text).Summary)} 
    i -- {update.author.name}
    | , updated {timeString(update.modified_at)}
  +else()
    p No updates yet.
</template>

<style lang="stylus">
p 
  line-height 15pt
</style>
