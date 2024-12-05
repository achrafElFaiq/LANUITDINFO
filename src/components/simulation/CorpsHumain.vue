<script setup lang="ts">
import { ref, watch } from 'vue'
import CorpsHumainSVG from './corps/CorpsHumainSVG.vue'
import OrganeDetail from './corps/OrganeDetail.vue'

const props = defineProps<{
  actionActive: number | null
}>()

const organes = ref([
  {
    id: 'cerveau',
    nom: 'Cerveau',
    path: 'M200,80 C230,80 250,100 250,130 C250,160 230,180 200,180 C170,180 150,160 150,130 C150,100 170,80 200,80',
    viewBox: '0 0 100 100',
    description: 'Centre de contrôle du corps',
    etatSante: 100,
    effets: ['Concentration réduite', 'Maux de tête occasionnels']
  },
  {
    id: 'poumons',
    nom: 'Poumons',
    path: 'M160,200 C180,200 190,220 190,250 C190,280 180,300 160,300 C140,300 130,280 130,250 C130,220 140,200 160,200 M240,200 C260,200 270,220 270,250 C270,280 260,300 240,300 C220,300 210,280 210,250 C210,220 220,200 240,200',
    viewBox: '0 0 100 100',
    description: 'Organes respiratoires',
    etatSante: 85,
    effets: ['Capacité respiratoire diminuée', 'Irritation des voies respiratoires']
  },
  {
    id: 'coeur',
    nom: 'Cœur',
    path: 'M200,220 C230,220 250,240 250,270 C250,300 230,320 200,320 C170,320 150,300 150,270 C150,240 170,220 200,220',
    viewBox: '0 0 100 100',
    description: 'Pompe du système circulatoire',
    etatSante: 90,
    effets: ['Circulation sanguine modifiée']
  },
  {
    id: 'foie',
    nom: 'Foie',
    path: 'M180,350 C220,350 240,370 240,400 C240,430 220,450 180,450 C140,450 120,430 120,400 C120,370 140,350 180,350',
    viewBox: '0 0 100 100',
    description: 'Organe de détoxification',
    etatSante: 75,
    effets: ['Accumulation de toxines', 'Fonction hépatique ralentie']
  },
  {
    id: 'estomac',
    nom: 'Estomac',
    path: 'M200,380 C230,380 250,400 250,430 C250,460 230,480 200,480 C170,480 150,460 150,430 C150,400 170,380 200,380',
    viewBox: '0 0 100 100',
    description: 'Système digestif',
    etatSante: 60,
    effets: ['Digestion perturbée', 'Absorption de microplastiques']
  }
])

const organeSelectionne = ref<string | null>(null)

const selectionnerOrgane = (organeId: string) => {
  organeSelectionne.value = organeId
}

const getOrganeDetail = () => {
  return organes.value.find(o => o.id === organeSelectionne.value)
}

watch(() => props.actionActive, (nouvelleAction) => {
  if (nouvelleAction !== null) {
    // Simuler l'impact sur les organes
    organes.value = organes.value.map(organe => ({
      ...organe,
      etatSante: Math.max(0, organe.etatSante - Math.random() * 20)
    }))
  }
})
</script>

<template>
  <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 h-[600px] relative">
    <h2 class="text-2xl text-white font-semibold mb-4">Corps Humain</h2>
    
    <div class="grid grid-cols-3 gap-4 h-[500px]">
      <!-- Visualisation du corps -->
      <div class="col-span-2 bg-blue-900/20 rounded-lg p-4">
        <CorpsHumainSVG
          :organes="organes"
          :organe-selectionne="organeSelectionne"
          @selectionner-organe="selectionnerOrgane"
        />
      </div>

      <!-- Panneau d'information -->
      <div class="bg-blue-900/20 rounded-lg p-4 overflow-y-auto">
        <template v-if="organeSelectionne && getOrganeDetail()">
          <OrganeDetail v-bind="getOrganeDetail()!" />
        </template>
        <div v-else class="text-blue-100 text-center mt-4">
          Sélectionnez un organe pour voir les détails
        </div>
      </div>
    </div>
  </div>
</template>