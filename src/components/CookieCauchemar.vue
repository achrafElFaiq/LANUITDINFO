<template>
  <div class="app" @mousemove="fillGauge">
    <h1 id="title">Bouge la souris dans la zone droite et essaie d'atteindre un score de 10 !</h1>
    <div id="right-zone">
      <div id="gauge-container">
        <div id="gauge" :style="{ height: gaugeProgress + '%' }"></div>
      </div>
    </div>
    
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
      <img src="/images/ocean/tortue.png" alt="Turtle" class="tortue" />
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
      buttonPositions: [
        { x: 200, y: 200 },
        { x: 400, y: 300 },
        { x: 600, y: 400 },
      ],
      gaugeProgress: 0,
      rightZoneWidth: 300,
      lastMoveTime: Date.now(),
      decayInterval: null,
      //isMoving: false, // Flag pour éviter des mouvements simultanés
    };
  },
  methods: {
    handleClick() {
      const random = Math.random();
      if (random > 0.5) {
        this.score += 1;
        this.showPopUpMessage("Bravo, mais pas trop !");
      } else {
        this.score -= 1;
        this.showPopUpMessage("Oups, ça descend !");
      }
      this.victoire();

      this.$refs.clickSound.play();
    },
    
    moveButton(index) {
      // Génère une position aléatoire pour chaque bouton
      let x = Math.random() * (window.innerWidth - 150); // Ajuste pour ne pas sortir de l'écran
      let y = Math.random() * (window.innerHeight - 150);

      // S'assurer que le bouton ne tombe pas dans la zone de la jauge
      if (x > window.innerWidth - this.rightZoneWidth - 150) {
        x = window.innerWidth - this.rightZoneWidth - 150; // Décalage à gauche pour éviter la zone de jauge
      }

      // Met à jour la position du bouton spécifique
      this.buttonPositions[index] = { x, y };
    },
    
    showPopUpMessage(message) {
      this.popUpMessage = message;
      this.showPopUp = true;
      setTimeout(() => {
        this.showPopUp = false;
      }, 2000);
    },
    fillGauge(event) {
      this.lastMoveTime = Date.now();

      const rightBoundary = window.innerWidth - this.rightZoneWidth;
      if (event.clientX > rightBoundary && this.gaugeProgress < 100) {
        this.gaugeProgress += 0.5;
      }
    },
    decayGauge() {
      const timeSinceLastMove = Date.now() - this.lastMoveTime;
      if (timeSinceLastMove > 2000 && this.gaugeProgress > 0) {
        this.gaugeProgress -= 20;
      } else if (this.gaugeProgress > 0) {
        this.gaugeProgress -= 1;
      }
    },
    victoire() {
      if (this.score >= 10) {
        alert("Bravo, tu as gagné !");
        this.$router.push("/victory");
      }
    },
  },
  mounted() {
    const backgroundMusic = this.$refs.backgroundMusic;
    backgroundMusic.volume = 0.3;
    backgroundMusic.onended = () => {
      backgroundMusic.play();
    };

    this.decayInterval = setInterval(this.decayGauge, 100);
  },
  beforeDestroy() {
    clearInterval(this.decayInterval);
  },
};
</script>

<style scoped>
.app {
  background: linear-gradient(45deg, #ff00ff, #00ff00);
  color: #ffffff;
  font-family: Comic Sans MS, cursive;
  text-align: center;
  overflow: hidden;
  height: 92vh;
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
  background: rgba(255, 0, 0, 0.1);
  pointer-events: none;
}

#gauge-container {
  width: 20px;
  height: 80%;
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
  height: 0%;
  background: #ff0000;
  border-radius: 10px;
  transition: height 0.1s ease-in-out;
  position: absolute;
  bottom: 0;
}

.cookie-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  position: absolute;
}

.cookie-button:hover {
  transform: rotate(10deg) scale(1.2);
}

.tortue {
  width: 20%;
  height: 20%;
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
