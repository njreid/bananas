import { writable } from 'svelte/store'

export const selectedPortfolio = writable(0)
export const projectData = writable([])
export const loading = writable(false)