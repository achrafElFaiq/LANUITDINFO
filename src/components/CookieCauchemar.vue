<template>
  <div class="app" @mousemove="fillGauge">
    <h1 id="title">Bouge la souris dans la zone droite et essaie de cliquer 10 fois sur les boutons</h1>
    <div id="right-zone">
      <div id="gauge-container">
        <div id="gauge" :style="{ height: gaugeProgress + '%' }"></div>
      </div>
    </div>
    
    <!-- Loop through button positions and render them -->
    <button
      v-for="(button, index) in buttonPositions"
      :key="index"
      class="cookie-button"
      @click="handleClick"
      @mouseover="moveButton(index)"
      :style="{
        top: button.y + 'px',
        left: button.x + 'px',
        opacity: gaugeProgress / 100
      }"
    >
      Clique-moi !
    </button>

    <p id="score">Score : {{ score }}</p>
    <div id="pop-up" v-if="showPopUp" :class="{ hidden: !showPopUp }">{{ popUpMessage }}</div>
    <audio ref="clickSound" src="annoying-sound.mp3" preload="auto"></audio>
    <audio ref="backgroundMusic" src="loop-music.mp3" autoplay loop></audio>
  </div>
</template>

<script>
export default {
  name: "CookieCauchemard",
  data() {
    return {
      score: 0,
      showPopUp: false,
      popUpMessage: "",
      // Initial positions for three buttons
      buttonPositions: [
        { x: 200, y: 200 },
        { x: 400, y: 300 },
        { x: 600, y: 400 }
      ],
      gaugeProgress: 0, // Progression de la jauge (en %)
      rightZoneWidth: 300, // Largeur de la zone de remplissage à droite
      lastMoveTime: Date.now(), // Heure du dernier mouvement de la souris
      decayInterval: null, // Intervalle pour diminuer la jauge lorsqu'il n'y a pas de mouvement
    };
  },
  methods: {
    handleClick() {
      // Ajouter ou enlever des points aléatoirement
      const random = Math.random();
      if (random > 0.5) {
        this.score += 1;
        this.showPopUpMessage("Bravo, mais pas trop !");
      } else {
        this.score -= 1;
        this.showPopUpMessage("Oups, ça descend !");
      }
      victoire();

      // Jouer le son agaçant
      this.$refs.clickSound.play();
    },
    moveButton(index) {
      setTimeout(() => {
        // Génère une position aléatoire pour chaque bouton
        let x = Math.random() * (window.innerWidth - 150); // Ajuste pour ne pas sortir de l'écran
        let y = Math.random() * (window.innerHeight - 150);
        
        // S'assurer que le bouton ne tombe pas dans la zone de la jauge
        if (x > window.innerWidth - this.rightZoneWidth - 150) {
          x = window.innerWidth - this.rightZoneWidth - 150; // Décalage à gauche pour éviter la zone de jauge
        }

        // Met à jour la position du bouton spécifique
        this.buttonPositions[index] = { x, y };
      }, 300); // Attendre 500ms avant de changer la position
    },
    showPopUpMessage(message) {
      this.popUpMessage = message;
      this.showPopUp = true;
      setTimeout(() => {
        this.showPopUp = false;
      }, 2000);
    },
    fillGauge(event) {
      // Réinitialiser l'heure de dernier mouvement
      this.lastMoveTime = Date.now();

      // Vérifie si la souris est dans la partie droite de l'écran
      const rightBoundary = window.innerWidth - this.rightZoneWidth;
      if (event.clientX > rightBoundary && this.gaugeProgress < 100) {
        // Remplir la jauge progressivement si la souris est dans la zone
        this.gaugeProgress += 0.5;
      }
    },
    decayGauge() {
      // Si la souris est immobile depuis plus de 2 secondes, réduire la jauge encore plus vite
      const timeSinceLastMove = Date.now() - this.lastMoveTime;
      if (timeSinceLastMove > 2000 && this.gaugeProgress > 0) {
        this.gaugeProgress -= 20; // Augmenter la réduction à 5% pour que la jauge baisse beaucoup plus vite
      }
      // La jauge continue à diminuer même si la souris est en dehors de la zone
      else if (this.gaugeProgress > 0) {
        this.gaugeProgress -= 1; // Réduction plus rapide quand la souris est en mouvement ou dans la zone
      }
    },
  },
  mounted() {
    const backgroundMusic = this.$refs.backgroundMusic;
    backgroundMusic.volume = 0.3;
    backgroundMusic.onended = () => {
      backgroundMusic.play();
    };

    // Démarrer l'intervalle de réduction de la jauge
    this.decayInterval = setInterval(this.decayGauge, 100); // Vérifier toutes les 100 ms
  },
  beforeDestroy() {
    // Arrêter l'intervalle avant de détruire le composant
    clearInterval(this.decayInterval);
  },

  victoire(){
    if (this.score >= 10){
      alert("Bravo, tu as gagné !");
      
    }
  }
};
</script>

<style scoped>
.app {
  background: linear-gradient(45deg, #ff00ff, #00ff00);
  color: #ffffff;
  font-family: Comic Sans MS, cursive;
  text-align: center;
  overflow: hidden;
  height: 100vh;
  position: relative;
}

h1 {
  font-size: 3em;
  text-shadow: 2px 2px 4px #000000;
}

#right-zone {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background: rgba(255, 0, 0, 0.1); /* Légèrement translucide */
  pointer-events: none; /* Ne bloque pas les autres interactions */
}

#gauge-container {
  width: 20px; /* Largeur de la jauge */
  height: 80%; /* Hauteur de la jauge */
  background: #444;
  border: 2px solid #fff;
  border-radius: 10px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

#gauge {
  width: 100%;
  height: 0%; /* Initialement vide */
  background: #ff0000;
  border-radius: 10px;
  transition: height 0.1s ease-in-out;
  position: absolute;
  bottom: 0; /* La jauge commence à partir du bas */
}

.cookie-button {
  font-size: 2em;
  background: #ffcc00;
  border: 5px solid #ff0000;
  padding: 20px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  position: absolute;
}

.cookie-button:hover {
  transform: rotate(10deg) scale(1.2);
}

#score {
  font-size: 1.5em;
  margin-top: 20px;
}

#pop-up {
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  background: #ff0000;
  color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  animation: popUp 0.5s ease-in-out;
}

.hidden {
  display: none;
}

@keyframes popUp {
  from {
    bottom: -100px;
  }
  to {
    bottom: 50px;
  }
}
</style>
