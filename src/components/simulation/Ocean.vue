<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  actionActive: number | null
}>()

const particulesPolluantes = ref<Array<{ x: number, y: number, type: string }>>([])

const genererParticules = () => {
  particulesPolluantes.value = Array.from({ length: 20 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    type: Math.random() > 0.5 ? 'plastique' : 'chimique'
  }))
}

watch(() => props.actionActive, (nouvelleAction) => {
  if (nouvelleAction !== null) {
    genererParticules()
  }
})
</script>

<template>
  <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 h-[600px] relative overflow-hidden">
    <h2 class="text-2xl text-white font-semibold mb-4">Océan</h2>
    
    <div class="relative w-full h-[500px] bg-blue-500/30 rounded-lg">
      <!-- Vagues animées -->
      <div class="absolute inset-0 animate-wave opacity-30">
        <svg viewBox="0 0 100 100" class="w-full h-full">
          <path
            d="M0,50 Q25,40 50,50 T100,50 V100 H0 Z"
            class="fill-blue-300"
          />
        </svg>
      </div>

      <!-- Particules polluantes -->
      <div v-for="(particule, index) in particulesPolluantes" 
           :key="index"
           :style="{
             left: `${particule.x}%`,
             top: `${particule.y}%`,
             transform: 'translate(-50%, -50%)'
           }"
           class="absolute w-2 h-2 rounded-full transition-all duration-1000"
           :class="particule.type === 'plastique' ? 'bg-red-400' : 'bg-yellow-400'"
      />
    </div>
  </div>
</template>