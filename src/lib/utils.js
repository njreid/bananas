import dayjs from "dayjs"

export function replaceURLs(message) {
  if (!message) return

  let urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g
  let html = message.replace(urlRegex, url => {
    let hyperlink = url
    if (!hyperlink.match("^https?://")) {
      hyperlink = "http://" + hyperlink
    }

    // Replace the url with hostname
    let tmp = document.createElement("a")
    tmp.href = url
    let label = tmp.hostname
    return (
      '<a href="' +
      hyperlink +
      '" target="_blank" rel="noopener noreferrer">' +
      label +
      "</a>"
    )
  })
  return html
}

// Asana inject a bunch of sections into the summary text, which we remove.
export function extractSections(text) {

  if(!text) return {Summary:""}
  
  const knownHeaders = [
    "Summary",
    "What we've accomplished",
    "What's blocked",
    "Next steps",
  ]
  const lines = text.split("\n")

  let sections = {}
  let currentHeader = ""
  let currentSection = ""
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]
    if (knownHeaders.indexOf(line) >= 0) {
      if (currentHeader) {
        sections[currentHeader] = currentSection
      }
      currentSection = ""
      currentHeader = line
    } else {
      currentSection += line
    }
  }
  sections[currentHeader] = currentSection
  return sections
}

export function timeString(d) {
  let o = dayjs(d)
  return o.format("DD-MMM hh:mm")
}
