<script setup lang="ts">
import Header from './components/Header.vue'
</script>

<template>
  <div class="min-h-screen bg-blue-50">
    <Header />
    <router-view />
  </div>
</template>