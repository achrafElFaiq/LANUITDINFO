<script setup lang="ts">
import { useRouter } from 'vue-router'
import VaguesDivider from '../components/VaguesDivider.vue'

const router = useRouter()
const navigateToApplication = () => {
  router.push('/application')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 relative">
    <!-- Vague du haut -->
    <VaguesDivider position="haut" />

    <!-- Contenu principal -->
    <div class="container mx-auto px-4 py-12 relative z-10">
      <h1 class="text-5xl text-white font-bold text-center mb-12 drop-shadow-lg">
        Bienvenue sur la Nuit de l'Info 2024
      </h1>
      <p class="text-lg text-gray-200 text-center leading-relaxed mb-12">
        Explorez les parallèles fascinants entre l'océan et le corps humain et découvrez l'importance de protéger nos écosystèmes marins pour l'avenir de la planète.
      </p>
      <div class="text-center">
        <button @click="navigateToApplication" class="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-700 transition ">
          Commencez l'Exploration
        </button>
      </div>
      <div class="container mx-auto px-4 py-12">
  <h2 class="text-3xl text-white font-bold text-center mb-8">Pourquoi Protéger les Océans ?</h2>
  <div class="grid md:grid-cols-2 gap-8 items-center">

    <div>
      <p class="text-gray-200 text-lg leading-relaxed">
        Les océans couvrent 70% de la surface de notre planète et produisent la moitié de l’oxygène que nous respirons. 
        Ils régulent le climat, abritent une biodiversité exceptionnelle et sont une source de nourriture et d’énergie. 
        Cependant, ils sont gravement menacés par la pollution plastique, le réchauffement climatique et la surpêche.
      </p>
    </div>
    <div>
      <img src="/images/ocean/ocean.jpg" alt="Protection des Océans" class="rounded-lg shadow-lg">
    </div>
  </div>

  <div class="container mx-auto px-4 py-12">
  <h2 class="text-3xl text-white font-bold text-center mb-8">Galerie : L'Océan en Péril</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div>
      <img src="/images/ocean/plastiques.png" alt="Pollution plastique" class="img-uniform">
      <p class="text-white text-sm mt-2 text-center">Plastique dans l'océan</p>
    </div>
    <div>
      <img src="/images/ocean/nettoyage.jpeg" alt="Nettoyage océan" class="img-uniform">
      <p class="text-white text-sm mt-2 text-center">Efforts de nettoyage</p>
    </div>
    <div>
      <img src="/images/ocean/biodiv.jpg" alt="Biodiversité marine" class="img-uniform">
      <p class="text-white text-sm mt-2 text-center">Biodiversité en danger</p>
    </div>
  </div>

  <div class="container mx-auto px-4 py-12">
  <h2 class="text-3xl text-white font-bold text-center mb-8">Quelques Chiffres Alarmants</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
    <div>
      <h3 class="text-5xl text-white font-bold">8M</h3>
      <p class="text-gray-200 mt-2">Tonnes de plastique déversées dans les océans chaque année</p>
    </div>
    <div>
      <h3 class="text-5xl text-white font-bold">90%</h3>
      <p class="text-gray-200 mt-2">Des oiseaux marins ont ingéré du plastique</p>
    </div>
    <div>
      <h3 class="text-5xl text-white font-bold">450 ans</h3>
      <p class="text-gray-200 mt-2">Temps de décomposition d'une bouteille en plastique</p>
    </div>
  </div>
</div>

  <div class="container mx-auto px-4 py-12">
    <h2 class="text-3xl text-white font-bold text-center mb-8">Race for Water</h2>
    <div class="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <p class="text-gray-200 text-lg leading-relaxed">
          Race for Water est une fondation dédiée à la préservation de l'eau et à la lutte contre la pollution plastique dans les océans. 
          Leur mission est de sensibiliser le public et de promouvoir des solutions innovantes pour protéger nos ressources en eau.
        </p>
        <p class="text-gray-200 text-lg leading-relaxed mt-4">
        
        </p>
      </div>
      <div>
        <a href="https://www.raceforwater.org" class="text-blue-400 underline" target="_blank">
        <img src="/images/ocean/raceforwater.jpg" alt="Race for Water" class="rounded-lg shadow-lg">
        </a>
      </div>
    </div>
  </div>

</div>


</div>

    </div>

    <!-- Vague du bas -->
    <VaguesDivider position="bas" />
  </div>
</template>


<style scoped>
/* Ombre pour le texte */
.drop-shadow-lg {
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
}
.img-uniform {
  width: 100%; /* Remplit le conteneur horizontalement */
  height: 200px; /* Hauteur uniforme */
  object-fit: cover; /* Garde le ratio d'aspect et remplit */
  border-radius: 8px; /* Coins arrondis pour un style moderne */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Ombre légère */
}
</style>
