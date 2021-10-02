<script lang="ts">
  export let current = "Not started"

  const portfolioStages = [
    {
      gid: "1182097226423121",
      color: "aqua",
      enabled: true,
      name: "Development",
      resource_type: "enum_option",
    },
    {
      gid: "1182097226423120",
      color: "blue",
      enabled: true,
      name: "QA",
      resource_type: "enum_option",
    },
    {
      gid: "1182097226423123",
      color: "purple",
      enabled: true,
      name: "Planning/Design",
      resource_type: "enum_option",
    },
    {
      gid: "1182097226423124",
      color: "red",
      enabled: true,
      name: "Requirements",
      resource_type: "enum_option",
    },
    {
      gid: "1182117918207256",
      color: "orange",
      enabled: true,
      name: "Queued",
      resource_type: "enum_option",
    },
    {
      gid: "1182097226423119",
      color: "yellow-green",
      enabled: true,
      name: "Done",
      resource_type: "enum_option",
    },
    {
      gid: "1182097226423122",
      color: "cool-gray",
      enabled: true,
      name: "Not Started",
      resource_type: "enum_option",
    },
    {
      gid: "1200055983904289",
      color: "yellow-orange",
      enabled: true,
      name: "Deployment Started",
      resource_type: "enum_option",
    },
  ]

  const stages = [
    {
      gid: "1199680225867880",
      color: "cool-gray",
      enabled: true,
      name: "Not started",
      resource_type: "enum_option",
    },
    {
      gid: "1199680225867882",
      color: "green",
      enabled: true,
      name: "In progress",
      resource_type: "enum_option",
    },
    {
      gid: "1199680225867883",
      color: "yellow",
      enabled: true,
      name: "Code review",
      resource_type: "enum_option",
    },
    {
      gid: "1199680225867884",
      color: "magenta",
      enabled: true,
      name: "QA ready",
      resource_type: "enum_option",
    },
    {
      gid: "1199680225867885",
      color: "red",
      enabled: true,
      name: "QA changes",
      resource_type: "enum_option",
    },
    {
      gid: "1199680225867886",
      color: "blue-green",
      enabled: true,
      name: "Deploy started",
      resource_type: "enum_option",
    },
    {
      gid: "1200179995173808",
      color: "yellow-green",
      enabled: true,
      name: "Done/Deployed/Merged",
      resource_type: "enum_option",
    },
    {
      gid: "1199982544802529",
      color: "pink",
      enabled: true,
      name: "Needs tech design",
      resource_type: "enum_option",
    },
    {
      gid: "1200108733043320",
      color: "purple",
      enabled: true,
      name: "Needs UX design",
      resource_type: "enum_option",
    },
    {
      gid: "1199680225867881",
      color: "orange",
      enabled: true,
      name: "Needs requirements",
      resource_type: "enum_option",
    },
    {
      gid: "1199680225867887",
      color: "none",
      enabled: true,
      name: "Descoped/Icebox",
      resource_type: "enum_option",
    },
    {
      gid: "1200143598071344",
      color: "red",
      enabled: true,
      name: "Blocked",
      resource_type: "enum_option",
    },
  ]
</script>

<template lang="pug">

.stageflow
  +each('portfolioStages as stage')
    .stage(class:selected="{current==stage.name}")
      p {stage.name.replace(/\//g,' ')}

</template>

<style lang="stylus">

.stageflow
  margin 6px 0 6px 0
  display flex
  justify-content left

p
  font-size 0.7em
  text-transform uppercase
  padding 0 2px
  margin 0
  color #aaa

.stage
  display flex
  flex-direction column
  justify-content center
  height 20px
  overflow hidden
  text-align center
  border 1px solid #aaa
  border-radius 3px
  margin-right 4px

.selected
  border 2px solid black
  p
    color black

</style>
