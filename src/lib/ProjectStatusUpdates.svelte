<script lang="ts">
  let expanded = false
  export let statusData = {}
  export let latest = {}
  // export let projectId = ""

  import dayjs from 'dayjs'
  import status from './status.json'

  // let latest = status.data[0]
  let remaining = status.data

  console.log(latest)

  function toggleExpanded() {
    expanded = !expanded
  }

  function extractSections(text) {
    const knownHeaders = ['Summary', "What we've accomplished", "What's blocked", 'Next steps']
    const lines = text.split('\n')

    let sections = {}
    let currentHeader = ''
    let currentSection = ''
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i]
      if (knownHeaders.indexOf(line) >= 0) {
        if (currentHeader) {
          sections[currentHeader] = currentSection
        }
        currentSection = ''
        currentHeader = line
      } else {
        currentSection += line
      }
    }
    sections[currentHeader] = currentSection
    return sections
  }

  function timeString(d) {
    let o = dayjs(d)
    return o.format('DD-MMM hh:mm')
  }
</script>

<template lang="pug">

+if('latest')
  p
    u {latest.title}
    | {` ${latest.color.toUpperCase()} `}
    | {@html extractSections(latest.text).Summary}
    | -- {latest.author.name}, {timeString(latest.modified_at)}
    b(on:click="{toggleExpanded}") &nbsp [{expanded ? '-': '+'}]
+if('expanded')
  +each('remaining as statusUpdate')
    p
      u {statusUpdate.title}
      | {` ${latest.color.toUpperCase()} `}
      | {@html extractSections(statusUpdate.text).Summary}
      | -- {statusUpdate.author.name}, {timeString(statusUpdate.modified_at)}
</template>

<style lang="stylus">

.title
  display flex
  align-items center
  margin-bottom 4px

h1
  font-size 1em

p
  margin 0 0 5px 0
  text-align justify

b
  font-family Consolas
  font-size 0.8em

</style>
