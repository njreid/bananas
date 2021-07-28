<script lang="ts">
  export let projectId = "";
  export let projects = [];

  import { onMount } from "svelte";
  import { projectData, loading } from "../stores.js";

  let portfolios = [];

  onMount(async () => {
    loading.set(true)
    fetch("https://app.asana.com/api/1.0/portfolios/1200209109173696/items?opt_expand=color", {
      // fetch('https://app.asana.com/api/1.0/portfolios/1200209109173696/items?opt_expand=.', {
      headers: {
        authorization:
          "Bearer 1/1200375434717708:ebc8099cd11eb8fed4a5921f0752ae59",
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        loading.set(false)
        portfolios = data.data;
      })
      .catch((error) => {
        loading.set(false)
        console.log(error);
        return [];
      });
  });

  function loadProjects(selected) {
    loading.set(true)
    fetch(
      "https://app.asana.com/api/1.0/portfolios/" +
        selected +
        "/items?opt_expand=.",
      {
        headers: {
          authorization:
            "Bearer 1/1200375434717708:ebc8099cd11eb8fed4a5921f0752ae59",
          accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        loading.set(false)
        console.log(data);
        projectData.set(data.data);
      })
      .catch((error) => {
        loading.set(false)
        console.log(error);
        return [];
      });
  }

  const COLORS = {
    'light-red': '#ffcccb',
    'light-blue': '#ADD8E6',
    'dark-pink': '#C71585',
    'dark-purple': '#4B0082',
  }

  function lookupColor(name) {
    if (name in COLORS) {
      return COLORS[name]
    }
    else {
      return "#555"
    }
  }

</script>

<template lang="pug">
h2 Portfolios
.portfolios
  +each('portfolios as portfolio')
    .portfolio( 
      style="background-color: {lookupColor(portfolio.color)}"
      on:click="{function() { loadProjects(portfolio.gid)}}")
      p {portfolio.name}
</template>

<style lang="stylus">
h2
  margin-left 20px
  margin-right 10px

button 
  margin-left 10px

.portfolios
  margin 30px
  display flex
  flex-flow wrap

.portfolio
  display flex
  align-items center
  justify-content center
  margin 6px
  background-color #555
  width 200px
  height 80px
  padding 20px
  color white
  font-size 1.2em
  box-shadow 5px 5px 15px 5px #b5b2b2

</style>
