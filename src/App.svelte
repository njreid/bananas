<script lang="ts">

  import ProjectPicker from "./lib/ProjectPicker/index.svelte"
  import Report from "./lib/Report/index.svelte"

  import { loading, projectData } from './lib/stores.js'

  export let reportName = ""
  let projects = []

  function exportPDF() {
    let element = document.getElementById('report')
    var opt = {
      margin: 0.2,
      filename: reportName + '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak: {
        mode: 'css',
        avoid: '.project',
      },
      pdfCallback: pdfCallback,
    }
    let worker = html2pdf().set(opt).from(element).save()
  }

  function pdfCallback(pdfObject) {
    var number_of_pages = pdfObject.internal.getNumberOfPages()
    var pdf_pages = pdfObject.internal.pages
    var myFooter = 'Footer info'
    for (var i = 1; i < pdf_pages.length; i++) {
      // We are telling our pdfObject that we are now working on this page
      pdfObject.setPage(i)
      // The 10,200 value is only for A4 landscape. You need to define your own for other page sizes
      pdfObject.text(myFooter + ' Page ' + i, 10, 10)
    }
  }
</script>

<svelte:head>
  <title>{reportName}</title>
  <meta name="robots" content="noindex nofollow" />
  <html lang="en" />
</svelte:head>

<template lang="pug">

.nav
  img(src="/favicon.png" width='32px')
  h1 asanabananas
  button.push(on:click="{exportPDF}") Export PDF

+if('$loading')
  .loading
    h1 LOADING...

+if('$projectData.length == 0')
  #picker
    ProjectPicker
  +else()
    #report
      Report

</template>

<style lang="stylus">

:global(body)
  background-color #e0e0e0

.nav
  background-color black
  box-shadow 3px 3px 20px 5px rgba(0,0,0,0.5)
  display flex
  flex-direction row
  align-items center
  margin-bottom 10px
  height 40px

  h1
    margin auto 0 auto 6px
    color #FFC800
    font-size 20pt
    // font-weight bold
    letter-spacing -2px
    padding 0

  button
    margin auto 10px auto auto

  img
    margin-left 10px


.loading
  h1
    font-size 4em
    color white

  z-index 10
  position fixed
  top 20vh
  left calc(50vw - 200px)
  width 400px
  height 200px
  display flex
  align-items center
  justify-content center
  background-color rgba(0,0,0,0.5)

</style>
