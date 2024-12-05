<script setup lang="ts">
interface Action {
  id: number
  nom: string
  description: string
}

const props = defineProps<{
  actions: Action[]
  actionSelectionnee: number | null
}>()

const emit = defineEmits<{
  (e: 'selectionner-action', id: number): void
}>()
</script>

<template>
  <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 h-[600px]">
    <h2 class="text-2xl text-white font-semibold mb-4">Actions</h2>
    
    <div class="space-y-4">
      <button
        v-for="action in actions"
        :key="action.id"
        @click="emit('selectionner-action', action.id)"
        class="w-full p-4 rounded-lg text-left transition-all duration-300"
        :class="{
          'bg-blue-600 hover:bg-blue-500': actionSelectionnee !== action.id,
          'bg-blue-400': actionSelectionnee === action.id
        }"
      >
        <h3 class="text-white font-semibold mb-2">{{ action.nom }}</h3>
        <p class="text-blue-100 text-sm">{{ action.description }}</p>
      </button>
    </div>
  </div>
</template>