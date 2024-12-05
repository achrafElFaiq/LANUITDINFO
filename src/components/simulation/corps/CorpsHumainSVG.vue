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
    <image 
      x="0" 
      y="0" 
      width="400" 
      height="600" 
      href="../../../assets/corps.svg" 
      class="opacity-70"
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