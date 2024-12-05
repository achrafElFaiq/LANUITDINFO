<script setup lang="ts">
import VaguesDivider from '../components/VaguesDivider.vue'
import { ref } from 'vue'

const montantsDon = ref([
  { valeur: 10, description: 'Nettoyer 10m² de plage' },
  { valeur: 25, description: 'Protéger un récif corallien' },
  { valeur: 50, description: 'Sauver une tortue marine' },
  { valeur: 100, description: 'Financer une journée de recherche' }
])

const montantPersonnalise = ref('')
const messageRemerciement = ref('')

const faireDon = () => {
  messageRemerciement.value = 'Merci pour votre générosité ! Votre don aide à protéger nos océans.'
  setTimeout(() => {
    messageRemerciement.value = ''
  }, 3000)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500">
    <VaguesDivider position="haut" />
    
    <div class="container mx-auto px-4 py-12">
      <h1 class="text-5xl text-white font-bold text-center mb-12">Faire un Don</h1>

      <div class="max-w-3xl mx-auto">
        <div class="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-8">
          <h2 class="text-3xl text-white font-semibold mb-6 text-center">
            Votre Don Fait la Différence
          </h2>
          
          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <button v-for="option in montantsDon" 
                    :key="option.valeur"
                    @click="faireDon"
                    class="bg-blue-600 hover:bg-blue-500 text-white rounded-xl p-6 transition-colors duration-300">
              <div class="text-2xl font-bold mb-2">{{ option.valeur }}€</div>
              <div class="text-blue-100">{{ option.description }}</div>
            </button>
          </div>

          <div class="flex flex-col items-center">
            <label class="text-white mb-2">Montant personnalisé</label>
            <div class="relative">
              <input v-model="montantPersonnalise"
                     type="number"
                     class="bg-white/20 text-white rounded-lg px-4 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-400"
                     placeholder="Autre montant">
              <span class="absolute right-4 top-2 text-white">€</span>
            </div>
            <button @click="faireDon"
                    class="mt-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-8 py-2 transition-colors duration-300">
              Faire un don
            </button>
          </div>
        </div>

        <transition
          enter-active-class="transition duration-500 ease-out"
          enter-from-class="transform -translate-y-4 opacity-0"
          enter-to-class="transform translate-y-0 opacity-100"
          leave-active-class="transition duration-300 ease-in"
          leave-from-class="transform translate-y-0 opacity-100"
          leave-to-class="transform -translate-y-4 opacity-0"
        >
          <div v-if="messageRemerciement" 
               class="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
            {{ messageRemerciement }}
          </div>
        </transition>
      </div>
    </div>

    <VaguesDivider position="bas" />
  </div>
</template>