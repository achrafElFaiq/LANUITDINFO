<script setup lang="ts">
const props = defineProps<{
  position: 'haut' | 'bas'
}>()
</script>

<template>
  <div class="vagues-conteneur" :class="position === 'haut' ? 'transform rotate-180' : ''">
    <svg class="vagues" viewBox="0 24 150 28" preserveAspectRatio="none">
      <defs>
        <path id="douce-vague" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
      </defs>
      <g class="vagues-parallax">
        <use href="#douce-vague" x="48" y="0" class="fill-blue-300/30" />
        <use href="#douce-vague" x="48" y="3" class="fill-blue-400/30" />
        <use href="#douce-vague" x="48" y="5" class="fill-blue-500/30" />
        <use href="#douce-vague" x="48" y="7" class="fill-blue-600" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.vagues-conteneur {
  width: 100%;
  height: 100px;
  overflow: hidden;
  line-height: 0;
}

.vagues {
  width: 100%;
  height: 100%;
}

.vagues-parallax > use {
  animation: bouger-vagues 25s cubic-bezier(.55,.5,.45,.5) infinite;
}

.vagues-parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.vagues-parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.vagues-parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.vagues-parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}

@keyframes bouger-vagues {
  0% {
    transform: translate3d(-90px,0,0);
  }
  100% { 
    transform: translate3d(85px,0,0);
  }
}
</style>