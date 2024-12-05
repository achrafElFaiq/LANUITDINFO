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
    path: 'M200,20 C215,20 225,30 225,45 C225,60 215,70 200,70 C185,70 175,60 175,45 C175,30 185,20 200,20',
    transform: 'translate(50, 0)',  
    viewBox: '0 0 50 50',
    description: 'Centre de contrôle du corps',
    etatSante: 100,
    effets: ['Concentration réduite', 'Maux de tête occasionnels']
}
,
{
  id: 'poumons',
  nom: 'Poumons',
  path: 'M173,127 C180,110 185,120 185,135 C185,150 180,160 173,160 C166,160 160,150 160,135 C160,120 166,110 173,127 M223,127 C230,110 235,120 235,135 C235,150 230,160 223,160 C216,160 210,150 210,135 C210,120 216,110 223,127',
  viewBox: '0 0 50 50',
  description: 'Organes respiratoires',
  etatSante: 85,
  effets: ['Capacité respiratoire diminuée', 'Irritation des voies respiratoires']
}

,
  {
    id: 'coeur',
    nom: 'Cœur',
    path: 'M200,130 C215,130 225,140 225,155 C225,170 215,180 200,180 C185,180 175,170 175,155 C175,140 185,130 200,130',
    viewBox: '0 0 100 100',
    description: 'Pompe du système circulatoire',
    etatSante: 90,
    effets: ['Circulation sanguine modifiée']
  },
  {
    id: 'foie',
    nom: 'Foie',
    path: 'M175,187.5 C197.5,187.5 208.75,195 208.75,210 C208.75,225 197.5,232.5 175,232.5 C152.5,232.5 141.25,225 141.25,210 C141.25,195 152.5,187.5 175,187.5',
    viewBox: '0 0 100 100',
    description: 'Organe de détoxification',
    etatSante: 75,
    effets: ['Accumulation de toxines', 'Fonction hépatique ralentie']
  },
  {
    id: 'estomac',
    nom: 'Estomac',
    path: 'M200,230 C230,230 250,250 250,280 C250,310 230,330 200,330 C170,330 150,310 150,280 C150,250 170,230 200,230',
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