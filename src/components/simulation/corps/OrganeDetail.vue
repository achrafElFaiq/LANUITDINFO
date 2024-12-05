<script setup lang="ts">
interface OrganeDetailProps {
  nom: string
  description: string
  etatSante: number // 0-100
  effets: string[]
}

defineProps<OrganeDetailProps>()
</script>

<template>
  <div class="bg-white/20 backdrop-blur-lg rounded-lg p-4">
    <h3 class="text-xl text-white font-semibold mb-2">{{ nom }}</h3>
    <p class="text-blue-100 mb-3">{{ description }}</p>
    
    <!-- Barre de santé -->
    <div class="w-full h-2 bg-gray-200 rounded-full mb-3">
      <div 
        class="h-full rounded-full transition-all duration-500"
        :class="{
          'bg-green-500': etatSante > 70,
          'bg-yellow-500': etatSante <= 70 && etatSante > 30,
          'bg-red-500': etatSante <= 30
        }"
        :style="{ width: `${etatSante}%` }"
      ></div>
    </div>

    <!-- Liste des effets -->
    <div class="space-y-1">
      <p v-for="(effet, index) in effets" 
         :key="index"
         class="text-sm text-blue-100">
        • {{ effet }}
      </p>
    </div>
  </div>
</template>