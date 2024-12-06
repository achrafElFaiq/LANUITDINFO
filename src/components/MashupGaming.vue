<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4 flex items-center gap-2">
      Mashup Gaming <span class="text-3xl">🎮</span>
    </h1>
    <div class="bg-white p-4 rounded shadow relative">
      <!-- Navigation entre les pages -->
      <div class="flex justify-between items-center mb-4">
        <button
          class="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          @click="prevPage"
          :disabled="currentPage === 1"
        >
          Précédent
        </button>
        <span class="font-semibold text-lg">Page {{ currentPage }} / {{ story.length }}</span>
        <button
          class="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          @click="nextPage"
          :disabled="currentPage === story.length"
        >
          Suivant
        </button>
      </div>
      <!-- Contenu dynamique de la page -->
      <div>
        <transition name="fade">
          <div v-if="currentStory" class="relative">
            <!-- Image -->
            <div class="mb-4">
              <img
                v-if="currentStory.image"
                :src="currentStory.image"
                :alt="currentStory.title"
                class="max-h-96 mx-auto rounded-lg shadow-lg"
              />
            </div>
            <!-- Titre -->
            <h2 class="text-xl font-bold mb-2 animate-bounce">{{ currentStory.title }}</h2>
            <!-- Texte -->
            <p
              v-for="(paragraph, index) in currentStory.content"
              :key="index"
              class="text-gray-800 mb-2"
            >
              {{ paragraph }}
            </p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// Liste des pages de l'histoire
const story = [
  {
    title: "Introduction captivante",
    content: [
      "Dans un monde où les Assassins ont gagné, la paix reste fragile.",
      "Mais qu'arrive-t-il lorsque l'ombre de l'oppression renaît dans une île oubliée ?",
      "Un maître Assassin et une guérillera s'unissent pour affronter un tyran, protégé par un pouvoir ancestral.",
    ],
    image: "/images/etape1.jpg",
  },
  {
    title: "Le Monde Post-Templiers",
    content: [
      "Après leur victoire sur les Templiers, les Assassins ont remodelé le monde.",
      "Le libre arbitre est restauré, mais certains lieux comme Yara restent sous l'ombre de l'oppression.",
      "Yara est plus qu'une simple île : elle est le dernier bastion des ténèbres.",
    ],
    image: "/images/etape2.jpg",
  },
  {
    title: "Présentation des Héros",
    content: [
      "Dani Rojas : Une guérillera courageuse, déterminée à libérer son peuple d'Antón Castillo.",
      "Altan Sefir : Un maître Assassin envoyé pour récupérer un artefact d'Éden, clé du pouvoir de Castillo.",
    ],
    image: "/images/etape3.jpg",
  },
  {
    title: "L’Intrigue",
    content: [
      "Antón Castillo utilise un artefact d’Éden pour manipuler les esprits et contrôler Yara.",
      "Diego, son fils, est transformé en une arme vivante, posant un dilemme moral à Dani et Altan.",
    ],
    image: "/images/etape4.jpg",
  },
  {
    title: "Le Climax",
    content: [
      "Dans une infiltration risquée, Altan affronte Castillo et l'artefact d'Éden.",
      "Dani mène une attaque pour détourner l'attention des troupes.",
      "Qui sacrifiera quoi pour remporter cette victoire ?",
    ],
    image: "/images/etape5.jpg",
  },
  {
    title: "Le Dénouement",
    content: [
      "Lorsque le fragment d’Éden éclate, Yara est libérée, mais à quel prix ?",
      "Le monde des Assassins et de Far Cry est à jamais transformé.",
    ],
    image: "/images/etape6.jpg",
  },
];

// Gestion de la navigation
const currentPage = ref(1);

const currentStory = computed(() => story[currentPage.value - 1]);

const nextPage = () => {
  if (currentPage.value < story.length) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};
</script>

<style scoped>
/* Animation fade pour les transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Animation de bounce */
.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
