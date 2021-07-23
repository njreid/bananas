<script lang="ts">
  export let projectId = ''
  export let projects = []

  import { onMount } from 'svelte'
  import { projectData } from '../stores.js'

  let portfolios = []
  let selected = 0

  onMount(async () => {
    fetch('https://app.asana.com/api/1.0/portfolios/1200209109173696/items?opt_expand=.', {
      headers: {
        authorization: 'Bearer 1/1200375434717708:ebc8099cd11eb8fed4a5921f0752ae59',
        accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        portfolios = data.data
      })
      .catch(error => {
        console.log(error)
        return []
      })
  })

  function loadProjects() {
    fetch('https://app.asana.com/api/1.0/portfolios/' + selected + '/items?opt_expand=.', {
      headers: {
        authorization: 'Bearer 1/1200375434717708:ebc8099cd11eb8fed4a5921f0752ae59',
        accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        projectData.set(data.data)
      })
      .catch(error => {
        console.log(error)
        return []
      })
  }
</script>

<template lang="pug">
h2 Project
select(id="projectchooser" bind:value="{selected}")
	+each('portfolios as portfolio')
		option(value='{portfolio.gid}') {portfolio.name}
p {selected}
button(on:click="{loadProjects}") Load

</template>

<style lang="stylus">

</style>
