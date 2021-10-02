<script lang="ts">
  import { onMount } from "svelte"
  import {
    asanaKey,
    rootPortfolio,
    connected,
    asana,
    loading,
    rootData,
  } from "./stores"

  onMount(() => {
    loadConfig()
  })

  let key
  let root
  let client
  let message

  function loadConfig() {
    connected.set(false)
    key = localStorage.getItem("asanaKey")
    root = localStorage.getItem("asanaRoot")
    if (key) {
      asanaKey.set(key)
      if (root) {
        rootPortfolio.set(root)
        console.log("Connecting to Asana.")
        //@ts-ignore
        client = Asana.Client.create().useAccessToken(key)
        asana.set(client)
        loadData(asana, root)
      }
    }
  }

  function loadData(asana, root) {
    loading.set(true)
    message = ""

    client.portfolios
      .getItemsForPortfolio(root, {
        opt_expand: ".",
      })
      .then(result => {
        rootData.set(result.data)
        loading.set(false)
        connected.set(true)
      })
      .catch(error => {
        loading.set(false)
        console.log(error)
        rootData.set([])
        connected.set(false)
        message = error.message
      })
    }

  function save() {
    console.log("Saving key and root portfolio locally.")
    localStorage.setItem("asanaKey", key)
    localStorage.setItem("asanaRoot", root)
    loadConfig()
  }
</script>

<template lang="pug">

+if('$connected == false')
  .authorizer
    h1 Asana Configuration
    p We need the following information to connect to your Asana instance. The Personal Access Token can be retrieved from 
      a(href="https://app.asana.com/0/developer-console") the Asana Developer console. 
      | The Root Portfolio is the ID (10+ digits) of your top-level Portfolio.
    p 
      b Note: 
      | These values are kept in localStorage in your Browser and only sent to Asana.

    form(onsubmit="return false;")
      label(for="key") Personal Access Token
      textarea(name="key" bind:value="{key}")
      label(for="root") Asana Portfolio Root
      input(name="root" bind:value="{root}")
      button(on:click="{save}") Save
  
  .message {message||""}

</template>

<style lang="stylus">

.authorizer
  width 600px
  margin auto
  padding 20px
  background-color red
  box-shadow 10px 10px 20px 10px #aaa

textarea
  width 100%
  height 80px

input
  width 100%

button
  margin 10px auto
  width 120px
  background-color blue
  color white
  font-weight bold
  padding 10px 20px
  border 0
  border-radius 4px
  // box-shadow 1px 1px 10px 4px #333 

</style>
