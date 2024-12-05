<script setup lang="ts">
import { ref } from 'vue'
import CorpsHumain from '../components/simulation/CorpsHumain.vue'
import Ocean from '../components/simulation/Ocean.vue'
import MenuActions from '../components/simulation/MenuActions.vue'

const actionsDisponibles = ref([
  { id: 1, nom: 'Pollution plastique', description: 'Simuler l\'impact des déchets plastiques' },
  { id: 2, nom: 'Microplastiques', description: 'Observer l\'absorption des microplastiques' },
  { id: 3, nom: 'Métaux lourds', description: 'Visualiser la contamination par métaux lourds' },
])

const actionSelectionnee = ref<number | null>(null)

const executerAction = (actionId: number) => {
  actionSelectionnee.value = actionId
  // Logique d'exécution des actions à implémenter
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 p-6">
    <div class="container mx-auto">
      <h1 class="text-4xl text-white font-bold text-center mb-8">Simulation Interactive</h1>
      
      <div class="grid grid-cols-12 gap-6">
        <!-- Corps Humain -->
        <div class="col-span-5">
          <CorpsHumain :action-active="actionSelectionnee" />
        </div>

        <!-- Océan -->
        <div class="col-span-5">
          <Ocean :action-active="actionSelectionnee" />
        </div>

        <!-- Menu Actions -->
        <div class="col-span-2">
          <MenuActions 
            :actions="actionsDisponibles"
            :action-selectionnee="actionSelectionnee"
            @selectionner-action="executerAction"
          />
        </div>
      </div>
    </div>
  </div>
</template>