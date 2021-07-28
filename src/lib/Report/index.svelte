<script lang="ts">
  import Status from '../Status.svelte'
  import Stage from '../Stage.svelte'
  import ProjectStatusUpdates from '../ProjectStatusUpdates.svelte'

  import { projectData } from '../stores.js'

  function splitLines(str) {
    if (!str) return []
    return str.split('\n')
  }

  function toSnakeCase(str) {
    if (!str) return ''
    return str
      .split(/[ \t()]+/)
      .join('_')
      .toLowerCase()
  }

  function attr(obj, prop, def) {
    if (obj && obj.hasOwnProperty(prop)) {
      return obj[prop]
    } else {
      return def
    }
  }

  function indexCustomFields(projects) {
    let fixed = projects.map(p => {
      p.fields = p.custom_fields.reduce((acc, cur) => {
        acc[toSnakeCase(cur.name)] = cur
        return acc
      }, {})
      return p
    })
    console.log(fixed)
    return fixed
  }

  let reportName = 'Amplify iOS Roadmap'
  let fixedProjects = []
  $: fixedProjects = indexCustomFields($projectData)

  function replaceURLs(message) {
    if (!message) return

    let urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g
    let html = message.replace(urlRegex, url => {
      let hyperlink = url
      if (!hyperlink.match('^https?://')) {
        hyperlink = 'http://' + hyperlink
      }

      // Replace the url with hostname
      let tmp = document.createElement('a')
      tmp.href = url
      let label = tmp.hostname
      return '<a href="' + hyperlink + '" target="_blank" rel="noopener noreferrer">' + label + '</a>'
    })
    return html
  }

  function clearReport() {
    $projectData = []
  }

</script>

<template lang="pug">
section
  button(on:click="{clearReport}") Back
  h1 {reportName}
  +each('fixedProjects as project, i')
    .project
      .title
        h2
          a(href="{project.permalink_url}" target="_blank") {(i+1) + '. ' + project.name}
        Status(status="{attr(project.current_status, 'color', '')}")
        h3.push Target {project.due_date || "TBD"}
        h2 {project.fields.amplify_category?.display_value || "None"}
      Stage(current="{project.fields.amplify_status_portfolio_?.enum_value?.name}")
      +each('splitLines(replaceURLs(project.notes)) as l')
        p {@html l}
      p Owner: {project.owner.name}
      ProjectStatusUpdates(latest="{project.current_status}")
</template>

<style lang="stylus">

section
  max-width 1000px
  margin 0 auto
  background-color white
  padding 10px 40px

.title
  display flex
  align-items center
  margin-bottom 4px
  a
    color black

.push
  margin-left auto
  margin-right 6px

.project
  // border-bottom 1px solid #eee
  padding-bottom 20px

h1, h2, h3
  font-weight normal

h1
  font-size 1.6em

p
  margin 0 0 2px 0

h2, h3
  margin 4px 0 4px 0
  font-size 1em

h2
  font-weight bold

h3
  font-weight normal


</style>
