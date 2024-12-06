<template>
  <div class="captcha-container">
    <h3>Lancez le déchet dans la poubelle !</h3>

    <div class="game-container">
      <!-- Pont avec personnage -->
      <div class="bridge">
        <div class="character">
          <!-- Déchet prêt à être lancé -->
          <div
            class="trash"
            v-if="isTrashVisible"
            :style="{ left: `${trash.x}px`, bottom: `${trash.y}px` }"
          ></div>
        </div>
        <!-- Flèche de puissance -->
        <div
          class="arrow"
          v-if="isArrowAnimating"
          :style="{ height: `${arrowHeight}px`, bottom: '60px', left: '100px' }"
        ></div>
      </div>

      <!-- Poubelle -->
      <div class="bin" :style="{ left: `${bin.x}px`, bottom: `${bin.y}px` }">
        <div class="bin-label">Poubelle</div>
      </div>

      <!-- Océan -->
      <div class="ocean"></div>
    </div>

    <!-- Boutons -->
    <button v-if="!success && isGameActive" @click="handleStartOrLaunch">
      {{ buttonLabel }}
    </button>
    <button v-if="!isGameActive" @click="resetGame">Réinitialiser</button>

    <!-- Message de succès -->
    <div v-if="success" class="captcha-success">
      🎉 Bravo ! Vous avez réussi !
    </div>
  </div>
</template>

<script>
export default {
  name: "InteractiveCaptcha",
  data() {
    return {
      // Position du déchet et de la poubelle
      trash: { x: 120, y: 60 },
      bin: { x: 400, y: 50, width: 100, height: 120 },
      isTrashVisible: true, // Contrôle la visibilité du déchet
      isArrowAnimating: false, // Contrôle si l'animation de la flèche est en cours
      arrowHeight: 50, // Hauteur initiale de la flèche
      arrowGrowing: true, // Indique si la flèche grandit ou rétrécit
      trashVelocity: { x: 0, y: 0 }, // Vitesse du déchet
      gravity: 0.5, // Gravité pour la trajectoire
      success: false, // Indique si le joueur a réussi
      isGameActive: true, // Contrôle si le jeu est actif
      isArrowStarted: false, // Indique si le joueur a commencé l'animation
    };
  },
  computed: {
    buttonLabel() {
      return this.isArrowStarted ? "Lancer" : "Démarrer";
    },
  },
  methods: {
    handleStartOrLaunch() {
      if (!this.isArrowStarted) {
        this.startArrow();
        this.isArrowStarted = true;
      } else {
        this.launchTrash();
      }
    },
    startArrow() {
      // Lance l'animation de la flèche
      this.isArrowAnimating = true;
      const interval = setInterval(() => {
        if (!this.isArrowAnimating) {
          clearInterval(interval);
          return;
        }

        // Faire varier la hauteur de la flèche
        if (this.arrowHeight >= 150) this.arrowGrowing = false;
        if (this.arrowHeight <= 50) this.arrowGrowing = true;

        this.arrowHeight += this.arrowGrowing ? 2 : -2;
      }, 20);
    },
    launchTrash() {
  // Stoppe l'animation de la flèche
  this.isArrowAnimating = false;

  // Calcule la puissance du lancer à partir de la hauteur de la flèche
  const power = this.arrowHeight;
  this.trashVelocity.x = power / 5; // Vitesse horizontale
  this.trashVelocity.y = power / 4; // Vitesse verticale initiale

  // Début du mouvement du déchet
  const interval = setInterval(() => {
    if (!this.isGameActive) {
      clearInterval(interval);
      return;
    }

    // Mise à jour de la position du déchet
    this.trash.x += this.trashVelocity.x / 10;
    this.trash.y += this.trashVelocity.y / 10;

    // Appliquer la gravité
    this.trashVelocity.y -= this.gravity;
    

    // Vérifier si le déchet tombe exactement dans la poubelle
    if (
      this.trash.x >= this.bin.x && // Bord gauche de la poubelle
      this.trash.x <= this.bin.x + this.bin.width && // Bord droit de la poubelle
      this.trash.y <= this.bin.y && // Bord haut de la poubelle
      this.trash.y >= this.bin.y - this.bin.height // Bord bas de la poubelle
    ) {
        
        this.success = true;
        this.isGameActive = false;
        clearInterval(interval);
    }

    // Vérifier si le déchet tombe dans l'océan ou trop loin
    if (this.trash.y <= -100 || this.trash.x > 1000) {
      this.isGameActive = false;
      this.isTrashVisible = false;
      clearInterval(interval);
    }
  }, 20);
}
,
    resetGame() {
      // Réinitialise tous les paramètres
      this.trash = { x: 120, y: 60 }; // Réinitialise la position du déchet
      this.arrowHeight = 50;
      this.trashVelocity = { x: 0, y: 0 };
      this.isTrashVisible = true; // Rendre le déchet visible
      this.success = false;
      this.isGameActive = true;
      this.isArrowStarted = false;
      this.isArrowAnimating = false;
    },
  },
};
</script>

<style scoped>
.captcha-container {
  text-align: center;
}

.game-container {
  position: relative;
  width: 600px;
  height: 600px;
  margin: 20px auto;
  background-color: #e3f2fd;
  border: 2px solid #aaa;
  border-radius: 15px;
  overflow: hidden;
}

.bridge {
  position: absolute;
  bottom: 50px;
  left: 0;
  width: 600px;
  height: 20px;
  background-color: #8b4513;
  border-radius: 5px;
}

.character {
  position: absolute;
  bottom: 60px;
  left: 50px;
  width: 50px;
  height: 80px;
  background-color: #ffcc00;
  border-radius: 10px;
}

.trash {
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: #333;
  border-radius: 50%;
}

.arrow {
  position: absolute;
  width: 10px;
  background-color: red;
  border-radius: 5px;
}

.bin {
  position: absolute;
  width: 100px;
  height: 120px;
  background-color: #00bfff;
  border-radius: 10px;
}

.bin-label {
  text-align: center;
  line-height: 100px;
  font-weight: bold;
  color: white;
}

.ocean {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #1e90ff;
}

.captcha-success {
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  color: #4caf50;
}
</style>
