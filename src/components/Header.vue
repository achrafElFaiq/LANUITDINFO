<script setup lang="ts">
import { ref } from 'vue';

const navItems = [
  { title: 'Application', path: '/application' },
  { 
    title: 'Défis',
    isDropdown: true,
    items: [
      { title: 'Cookie Cauchemar', path: '/defis/cookie-cauchemar' },
      { title: 'Captcha Ludique', path: '/defis/captcha-ludique' },
      { title: 'Mashup Gaming', path: '/defis/mashup-gaming' },
      { title: 'Défier le Grinch', path: '/defis/defier-grinch' }
    ]
  },
  { title: 'A propos', path: '/about' },
  { title: 'Donner', path: '/donate' }
]

const isOpen = ref(false);
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
        <li v-for="item in navItems" :key="item.title" class="relative">
          <template v-if="item.isDropdown">
            <div 
              @mouseenter="isOpen = true"
              @mouseleave="isOpen = false"
              class="relative"
            >
              <button 
                class="text-lg hover:text-blue-300 transition-colors duration-200 flex items-center"
              >
                {{ item.title }}
                <span class="ml-1">▼</span>
              </button>
              <ul 
                v-show="isOpen" 
                class="absolute top-full left-0 bg-blue-800 rounded-md shadow-lg py-2 w-48 z-50"
              >
                <li v-for="subItem in item.items" :key="subItem.title">
                  <router-link 
                    :to="subItem.path"
                    class="block px-4 py-2 hover:bg-blue-700 transition-colors duration-200"
                  >
                    {{ subItem.title }}
                  </router-link>
                </li>
              </ul>
            </div>
          </template>
          <router-link 
            v-else
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