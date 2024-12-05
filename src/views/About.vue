<script setup lang="ts">
import VaguesDivider from '../components/VaguesDivider.vue'
import MembreEquipe from '../components/MembreEquipe.vue'
import { ref } from 'vue'

const equipeInfo = ref([
  {
    nom: 'Marie Dubois',
    role: 'Directrice de Projet',
    description: 'Passionnée par la protection des océans depuis 15 ans',
    image: '/images/team/marie.jpg'
  },
  {
    nom: 'Pierre Martin',
    role: 'Responsable Technique',
    description: 'Expert en solutions durables pour l\'environnement marin',
    image: '/images/team/pierre.jpg'
  },
  {
    nom: 'Sophie Laurent',
    role: 'Coordinatrice Scientifique',
    description: 'Spécialiste en écosystèmes marins',
    image: '/images/team/sophie.jpg'
  },
  {
    nom: 'Lucas Bernard',
    role: 'Responsable Communication',
    description: 'Expert en sensibilisation environnementale',
    image: '/images/team/lucas.jpg'
  },
  {
    nom: 'Emma Petit',
    role: 'Biologiste Marine',
    description: 'Spécialiste de la biodiversité océanique',
    image: '/images/team/emma.jpg'
  },
  {
    nom: 'Thomas Moreau',
    role: 'Ingénieur Environnemental',
    description: 'Expert en solutions de dépollution marine',
    image: '/images/team/thomas.jpg'
  },
  {
    nom: 'Julie Rousseau',
    role: 'Responsable Partenariats',
    description: 'Développe des collaborations internationales',
    image: '/images/team/julie.jpg'
  }
])

const missionTexte = ref(`Notre mission est de sensibiliser et d'agir pour la protection des océans. 
Nous travaillons sans relâche pour préserver la biodiversité marine et lutter contre la pollution des mers.`)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500">
    <VaguesDivider position="haut" />
    
    <div class="container mx-auto px-4 py-12">
      <h1 class="text-5xl text-white font-bold text-center mb-12">À Propos de Nous</h1>
      
      <div class="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-12">
        <h2 class="text-3xl text-white font-semibold mb-6">Notre Mission</h2>
        <p class="text-blue-50 text-lg leading-relaxed">{{ missionTexte }}</p>
      </div>

      <h2 class="text-3xl text-white font-semibold mb-8 text-center">Notre Équipe</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <MembreEquipe
          v-for="membre in equipeInfo"
          :key="membre.nom"
          v-bind="membre"
        />
      </div>
    </div>

    <VaguesDivider position="bas" />
  </div>
</template>