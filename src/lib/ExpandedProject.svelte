<script lang="ts">
  import { onMount } from "svelte"
  import Status from "./Status.svelte"
  import { asana, loading } from "./stores"
  import { DefaultDict } from "./defaultdict"

  import { replaceURLs, extractSections } from "./utils"

  export let projectId = 0
  let expanded = false
  let children = {}
  let combined = {}
  let summaryProjectsByStatus = {}
  let platformProjects = {}
  let projectsByStageByFeature = new Map()

  const stageOrder = ["Planning/Design", "Development", "Not Started", "Done"]

  function splitLines(str) {
    if (!str) return []
    return str.split("\n")
  }

  function loadChildren() {
    loading.set(true)

    $asana.portfolios
      .getItemsForPortfolio(projectId, {
        opt_expand: ".",
      })
      .then(result => {
        children = indexChildren(result.data)
        loading.set(false)
      })
      .catch(error => {
        loading.set(false)
        console.log(error)
        children = []
      })
  }

  const expectedPlatforms = [
    "JS",
    "Android",
    "iOS",
    "Flutter",
    "RN",
    "CLI",
    "Studio",
    "All",
  ]

  function indexChildren(data) {
    children = {}
    data.map(p => {
      let s = p.name.split(":") // assumes <platform>:<feature> naming standard
      indexCustomFields(p)
      // console.log(p)
      let featureName = s[1]?.trim()
      let platformName = s[0]?.trim()
      if (s.length == 1) {
        // If there isn't a ':'' in the name, it's all feature.
        featureName = p.name
        platformName = "All"
      }

      // Initialize children array
      if (!(featureName in children)) {
        children[featureName] = expectedPlatforms.reduce((acc, l) => {
          acc[l] = {
            name: featureName,
            due_date: "-",
            current_status: {
              color: "na",
            },
            owner: {
              name: "-",
            },
            fields: {
              stage: "Not Started",
            },
            notes: " ",
            nostatus: true,
          }
          return acc
        }, {})
      }

      // Add project to children
      children[featureName][platformName] = p
    })

    summaryProjectsByStatus = new DefaultDict(() => [])
    platformProjects = new DefaultDict(() => [])
    console.log(children)

    // Separate summary projects ("All") from platform projects
    Object.entries(children).map(([feature, child]) => {
      summaryProjectsByStatus[child["All"].fields.stage].push(child["All"])
      delete child["All"]
      platformProjects[feature] = child
    })

    // console.log(children)
    console.log(summaryProjectsByStatus)
    console.log(platformProjects)
    console.log("SUM", summaryProjectsByStatus["N/A"])

    projectsByStageByFeature = new Map()
    for (let stage of stageOrder) {
      let t = []
      for (let p of summaryProjectsByStatus[stage]) {
        p.children = platformProjects[p.name]
        t.push(p)
      }
      if (t.length > 0) {
        projectsByStageByFeature.set(stage, t)
      }
    }
    console.log(projectsByStageByFeature)
    return children
  }

  function indexCustomFields(project) {
    project.fields = project.custom_fields.reduce((acc, field) => {
      acc[field.name] = field.display_value
      if (field.name == "Amplify Status (Portfolio)") {
        acc["stage"] = field.display_value || "N/A"
      }
      return acc
    }, {})
    return project
  }

  function expand() {
    loadChildren()
    expanded = true
  }

  function hide() {
    expanded = false
  }

  let testArray = {
    "N/A": [
      {
        owner: {
          name: "TESTSET",
        },
      },
    ],
  }
</script>

<template lang="pug">

+if('expanded')
  +each('[...projectsByStageByFeature] as [stage, programs]')
    .status
      //- h3 { stage }
      +each('programs as program')
        .program
          b 
            a(href="https://app.asana.com/0/{program.gid}/list", target="_blank") { program.name }
            hr
          +if('!program.nostatus')
            .combined
              p 
                Status(status="{program.current_status?.color}")
              p Owner: { program.owner.name }
              p Due Date: { program.due_date }
              p Stage: { stage }
            p {@html replaceURLs(program.notes) || "" }
            +if('stage != "Done"')
              p { program.current_status?.text.replace("Summary", "", 1) }
              //- p { program.children } 
          .platforms
            table
              thead
                td.title
                +each('Object.entries(program.children) as [platform, o]')
                  +if('o.nostatus')
                    td.nostatus {platform} 
                    +else()
                      td
                        a(href="https://app.asana.com/0/{o.gid}/list", target="_blank") { platform }
              tr
                td.title Color
                +each('Object.entries(program.children) as [platform, o]')
                  td(class:nostatus="{o.nostatus}")
                    Status(status="{o.current_status?.color}")
              tr
                td.title Stage
                +each('Object.entries(program.children) as [platform, o]')
                  td(class:nostatus="{o.nostatus}") {o.fields.stage}

              tr
                td.title Due Date
                +each('Object.entries(program.children) as [platform, o]')
                  td(class:nostatus="{o.nostatus}") {o.due_date || ""}

              tr
                td.title Owner
                +each('Object.entries(program.children) as [platform, o]')
                  td(class:nostatus="{o.nostatus}") { o.owner?.name || "" }

              //- tr
              //-   td.title Update
              //-   +each('Object.entries(program.children) as [platform, o]')
              //-     td { extractSections(o.current_status?.text)?.Summary || "" }

  a(on:click="{hide}") Hide

  +else()
    a(on:click="{expand}") Platform details...


</template>

<style lang="stylus">

table
  width 100%

thead
  td 
    font-weight 700

td
  width 140px
  vertical-align top

.title
  font-weight 300 

.nostatus
  color #b0b0b0

.combined
  display flex
  p 
    margin 2px 20px 0 0

.program
  margin-top 10px
  p 
    margin 2px 20px 0 0

.project
  margin-bottom 10px

.status
  margin 0 10px

</style>
