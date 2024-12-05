<script setup lang="ts">
const navItems = [
  { title: 'Application', path: '/application' },
  { title: 'Défis', path: '/defis' },
  { title: 'A propos', path: '/about' },
  { title: 'Donner', path: '/donate' }
]
</script>

<template>
  <header class="bg-blue-900 text-white p-4 shadow-lg">
    <nav class="container mx-auto flex items-center justify-between">
      <router-link to="/" class="flex items-center">
        <div class="logo-container">
          <h1 class="text-3xl font-righteous text-white relative">
            <span class="relative z-10">CHILL </span>
            <span class="text-blue-300 ml-2 relative z-10">POSEIDON</span>
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent blur-sm transform -skew-x-12"></div>
          </h1>
        </div>
      </router-link>
      
      <ul class="flex space-x-8">
        <li v-for="item in navItems" :key="item.title">
          <router-link 
            :to="item.path"
            class="text-lg hover:text-blue-300 transition-colors duration-200"
          >
            {{ item.title }}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style>
.font-righteous {
  font-family: 'Righteous', cursive;
}

.logo-container {
  position: relative;
  padding: 0.5rem 1rem;
  overflow: hidden;
}

.logo-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0));
  transform: skewX(-12deg);
  z-index: 0;
}

.logo-container:hover h1 span {
  animation: wave 0.5s ease-in-out;
}

@keyframes wave {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
</style>