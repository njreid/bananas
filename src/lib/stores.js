import { writable } from "svelte/store"

export const selectedPortfolio = writable({})
export const projectData = writable([])
export const loading = writable(false)
export const title = writable("Asana Report")
export const asana = writable()
export const asanaKey = writable()
export const rootPortfolio = writable()
export const connected = writable(false)
export const rootData = writable([])
