<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  organeSelectionne: string | null
  organes: Array<{
    id: string
    nom: string
    path: string
    viewBox: string
    etatSante: number
  }>
}>()

const emit = defineEmits<{
  (e: 'selectionner-organe', id: string): void
}>()

const getOrganeClass = computed(() => (organeId: string) => {
  const organe = props.organes.find(o => o.id === organeId)
  const isSelected = organeId === props.organeSelectionne
  const baseClasses = 'transition-all duration-300 cursor-pointer'
  
  if (isSelected) {
    return `${baseClasses} fill-blue-400 stroke-white stroke-2`
  }
  
  if (organe) {
    if (organe.etatSante > 70) return `${baseClasses} fill-green-400/60 hover:fill-green-400/80`
    if (organe.etatSante > 30) return `${baseClasses} fill-yellow-400/60 hover:fill-yellow-400/80`
    return `${baseClasses} fill-red-400/60 hover:fill-red-400/80`
  }
  
  return baseClasses
})
</script>

<template>
  <svg class="w-full h-full" viewBox="0 0 400 600">
    <!-- Silhouette du corps -->
    <path
      d="M200,50 C300,50 300,150 300,200 C300,250 280,300 280,350 C280,400 300,450 300,500 C300,550 250,600 200,600 C150,600 100,550 100,500 C100,450 120,400 120,350 C120,300 100,250 100,200 C100,150 100,50 200,50"
      class="fill-blue-100/10 stroke-blue-200/30"
      stroke-width="2"
    />
    
    <!-- Organes -->
    <template v-for="organe in organes" :key="organe.id">
      <path
        :d="organe.path"
        :class="getOrganeClass(organe.id)"
        @click="emit('selectionner-organe', organe.id)"
      >
        <title>{{ organe.nom }}</title>
      </path>
    </template>
  </svg>
</template>