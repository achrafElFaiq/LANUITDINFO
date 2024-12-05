<script setup lang="ts">
interface MembreEquipeProps {
  nom: string
  role: string
  description: string
  image: string
}

defineProps<MembreEquipeProps>()
</script>

<template>
  <div class="bg-white/5 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
    <div class="mb-4 relative">
      <img 
        :src="image" 
        :alt="nom"
        class="w-48 h-48 object-cover rounded-full mx-auto border-4 border-blue-400/30"
      />
      <div class="absolute inset-0 rounded-full bg-gradient-to-b from-blue-500/20 to-blue-900/40"></div>
    </div>
    <h3 class="text-2xl text-white font-semibold mb-2 text-center">{{ nom }}</h3>
    <p class="text-blue-200 font-medium mb-3 text-center">{{ role }}</p>
    <p class="text-blue-100 text-center">{{ description }}</p>
  </div>
</template>