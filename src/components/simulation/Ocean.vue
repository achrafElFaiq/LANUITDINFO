<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

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

const COULEURS_POISSONS = ['orange-400', 'yellow-400', 'red-400', 'blue-400', 'purple-400']

const poissons = ref<Array<{ 
  x: number, 
  y: number, 
  direction: number, 
  vitesse: number,
  couleur: string 
}>>([])

const genererPoissons = () => {
  poissons.value = Array.from({ length: 10 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    direction: Math.random() * Math.PI * 2,
    vitesse: 0.5 + Math.random() * 0.5,
    couleur: COULEURS_POISSONS[Math.floor(Math.random() * COULEURS_POISSONS.length)]
  }))
}

const animerPoissons = () => {
  poissons.value = poissons.value.map(poisson => {
    let newX = poisson.x + Math.cos(poisson.direction) * poisson.vitesse
    let newY = poisson.y + Math.sin(poisson.direction) * poisson.vitesse

    // Rebondir sur les bords
    if (newX < 0 || newX > 100) {
      poisson.direction = Math.PI - poisson.direction
      newX = poisson.x
    }
    if (newY < 0 || newY > 100) {
      poisson.direction = -poisson.direction
      newY = poisson.y
    }

    return { ...poisson, x: newX, y: newY }
  })
}

const nuages = ref<Array<{ x: number, y: number, taille: number }>>([])

const genererNuages = () => {
  nuages.value = Array.from({ length: 5 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 25, // Restreint au quart supérieur
    taille: 20 + Math.random() * 30 // Taille entre 20 et 50
  }))
}

const bateau = ref({
  x: -20, // Commence hors écran à gauche
  y: 50,
  rotation: 0,
  direction: 1 // 1 = droite, -1 = gauche
})

const animerBateau = () => {
  // Déplacement horizontal
  bateau.value.x += 0.1 * bateau.value.direction
  
  // Changement de direction aux bords
  if (bateau.value.x > 120) {
    bateau.value.direction = -1
  } else if (bateau.value.x < -20) {
    bateau.value.direction = 1
  }
  
  // Animation de tangage améliorée
  bateau.value.rotation = Math.sin(Date.now() / 1000) * 2
}

const animate = () => {
  animerPoissons()
  animerBateau()
  animationFrame = requestAnimationFrame(animate)
}

let animationFrame: number

onMounted(() => {
  genererPoissons()
  genererNuages()
  animate()
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 h-[600px] relative overflow-hidden">
    <h2 class="text-2xl text-white font-semibold mb-4">Océan</h2>
    
    <div class="relative w-full h-[500px] overflow-hidden">
      <!-- Nuages -->
      <div v-for="(nuage, index) in nuages" 
           :key="`nuage-${index}`"
           :style="{
             left: `${nuage.x}%`,
             top: `${nuage.y}%`,
             width: `${nuage.taille}%`,
             transform: 'translate(-50%, -50%)'
           }"
           class="absolute aspect-[2/1] cloud-float opacity-20"
      >
        <div class="w-full h-full bg-white rounded-full filter blur-md"></div>
      </div>

      <!-- Partie air (ciel) -->
      <div class="absolute inset-0 h-1/2 bg-blue-200/10"></div>
      
      <!-- Bateau amélioré -->
      <div class="absolute"
           :style="{
             left: `${bateau.x}%`,
             top: '50%',
             transform: `translate(-50%, -100%) rotate(${bateau.rotation}deg) scaleX(${bateau.direction})`,
             zIndex: 10
           }">
        <!-- Coque principale -->
        <div class="w-48 h-20 bg-gradient-to-b from-gray-600 to-gray-700 rounded-lg relative">
          <!-- Ligne de flottaison -->
          <div class="absolute bottom-0 w-full h-6 bg-gray-800 rounded-b-lg"></div>
          <!-- Bordure supérieure -->
          <div class="absolute top-0 w-full h-2 bg-gray-500"></div>
        </div>
        
        <!-- Pont avec containers -->
        <div class="absolute bottom-[95%] left-[10%] right-[30%] h-8 flex gap-1">
          <div class="flex-1 bg-blue-600 rounded-sm"></div>
          <div class="flex-1 bg-red-600 rounded-sm"></div>
          <div class="flex-1 bg-green-600 rounded-sm"></div>
        </div>
        
        <!-- Cabine de pilotage -->
        <div class="absolute bottom-[95%] right-[10%] w-12 h-14 bg-gradient-to-b from-gray-600 to-gray-700">
          <!-- Fenêtres -->
          <div class="w-full h-4 bg-blue-300 mt-2"></div>
        </div>
        
        <!-- Cheminée -->
        <div class="absolute bottom-[95%] right-[25%] w-8 h-16 bg-gradient-to-b from-red-600 to-red-700">
          <div class="w-full h-3 bg-white mt-2"></div>
          <!-- Fumée -->
          <div class="absolute -top-4 -right-2 w-8 h-8 rounded-full bg-gray-300/30 animate-smoke"></div>
          <div class="absolute -top-8 right-0 w-6 h-6 rounded-full bg-gray-300/20 animate-smoke-delay"></div>
        </div>
      </div>

      <!-- Partie eau -->
      <div class="absolute inset-0 top-1/2 bg-blue-500/30">
        <!-- Surface de l'eau animée -->
        <div class="absolute -top-4 left-0 w-full">
          <div class="wave1 relative h-8 opacity-30"></div>
          <div class="wave2 relative h-8 -mt-6 opacity-20"></div>
        </div>

        <!-- Particules et poissons (confinés dans l'eau) -->
        <div class="relative w-full h-full">
          <!-- Particules polluantes -->
          <div v-for="(particule, index) in particulesPolluantes" 
               :key="index"
               :style="{
                 left: `${particule.x}%`,
                 top: `${Math.min(particule.y, 100)}%`,
                 transform: 'translate(-50%, -50%)'
               }"
               class="absolute w-2 h-2 rounded-full transition-all duration-1000"
               :class="particule.type === 'plastique' ? 'bg-red-400' : 'bg-yellow-400'"
          />

          <!-- Poissons (confinés dans l'eau) -->
          <div v-for="(poisson, index) in poissons" 
               :key="`poisson-${index}`"
               :style="{
                 left: `${poisson.x}%`,
                 top: `${Math.min(poisson.y, 95)}%`,
                 transform: `translate(-50%, -50%) rotate(${(poisson.direction + Math.PI/2)}rad)`
               }"
               class="absolute w-4 h-6 transition-transform duration-300"
          >
            <div class="w-full h-full rounded-full transform scale-x-50" :class="`bg-${poisson.couleur}`" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wave1 {
  background: linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.3));
  animation: wave 8s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
  transform: translate3d(0, 0, 0);
}

.wave2 {
  background: linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.3));
  animation: wave 10s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
  transform: translate3d(0, 0, 0);
}

.cloud-float {
  animation: floatCloud 20s linear infinite;
}

@keyframes floatCloud {
  from { transform: translate(-50%, -50%) translateX(-100vw); }
  to { transform: translate(-50%, -50%) translateX(100vw); }
}

.triangle-sail {
  clip-path: polygon(0 100%, 50% 0, 100% 100%);
}

@keyframes smoke {
  0% { transform: translateY(0) scale(1); opacity: 0.3; }
  100% { transform: translateY(-20px) scale(2); opacity: 0; }
}

.animate-smoke {
  animation: smoke 3s infinite;
}

.animate-smoke-delay {
  animation: smoke 3s infinite;
  animation-delay: 1.5s;
}
</style>