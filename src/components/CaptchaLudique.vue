
<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500">
    <div class="captcha-container">
      <h3 class="title">CAPTCHA : Lancez le déchet dans la poubelle !</h3>

      <div class="game-container">
        <!-- Pont avec personnage -->
        <div class="bridgeL">
          <div class="character" :style="{ backgroundImage: `url(${characterImage})` }">
            <!-- Déchet prêt à être lancé -->
            <div 
              class="trash" 
              v-if="isTrashVisible" 
              :style="{ left: `${trash.x}px`, bottom: `${trash.y}px`, backgroundImage: `url(${trashImage})` }">
            </div>
          </div>
        </div>

        <div class="bridgeR"></div>

        <!-- Flèche de puissance -->
        <div 
          class="arrow" 
          v-if="isArrowAnimating" 
          :style="{ height: `${arrowHeight}px`, bottom: '60px', left: '100px' }">
        </div>

        <!-- Poubelle -->
        <div 
          class="bin" 
          :style="{ left: `${bin.x}px`, bottom: `${bin.y}px`, backgroundImage: `url(${binImage})` }">
        </div>

        <div 
          class="bin2" 
          :style="{ left: `${bin2.x}px`, bottom: `${bin2.y}px`, backgroundImage: `url(${binImage})` }">
        </div>
        

        <!-- Océan -->
        <div class="ocean"></div>
      </div>

    <!-- Boutons -->
      <button 
        v-if="!success && isGameActive" 
        @click="handleStartOrLaunch" 
        class="cta-button start-button"
      >
        {{ buttonLabel }}
      </button>

      <button 
        v-if="!isGameActive" 
        @click="resetGame" 
        class="cta-button reset-button"
      >
        Réinitialiser
      </button>

      <!-- Message de succès -->
      <div v-if="success" class="captcha-success">
        🎉 Bravo ! Vous avez réussi !
      </div>

      <div v-if="echec" class="captcha-echec">
        🤖 Vous n'êtes pas un humain et vous n'êtes pas quelqu'un d'éco-responsable !! 
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: "InteractiveCaptcha",
  data() {
    return {
      // URL des images
      trashImage: '/images/captcha/trash.png',  // Remplacez par l'URL de votre image de déchet
      arrowImage: '',  // Pas d'image pour la flèche
      binImage: '/images/captcha/poubelle.png',  // Remplacez par l'URL de votre image de poubelle
      characterImage: '/images/captcha/character.png',  // Remplacez par l'URL de votre image de personnage

      // Position du déchet et de la poubelle
      trash: { x: 145, y: 160 },
      bin: { x: 400, y: 140, width: 100, height: 30 },
      bin2: { x: 400, y: 50, width: 120, height: 120 }, // Position de la deuxième poubelle
      isTrashVisible: true, // Contrôle la visibilité du déchet
      isArrowAnimating: false, // Contrôle si l'animation de la flèche est en cours
      arrowHeight: 50, // Hauteur initiale de la flèche
      arrowGrowing: true, // Indique si la flèche grandit ou rétrécit
      trashVelocity: { x: 0, y: 0 }, // Vitesse du déchet
      gravity: 0.5, // Gravité pour la trajectoire
      success: false, // Indique si le joueur a réussi
      echec: false,
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

  // Ajoute la classe de rotation au déchet pour le faire tourner
  this.$nextTick(() => {
    const trashElement = document.querySelector('.trash');
    trashElement.classList.add('trash-rotate'); // Ajout de la classe qui fait tourner le déchet
  });

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
      this.trash.x >= this.bin2.x && // Bord gauche de la poubelle
      this.trash.x <= this.bin2.x + this.bin2.width && // Bord droit de la poubelle
      this.trash.y <= this.bin2.y && // Bord haut de la poubelle
      this.trash.y >= this.bin2.y - this.bin2.height // Bord bas de la poubelle
    ) {
      this.success = true;
      this.echec = false;
      this.isGameActive = false;
      clearInterval(interval);
    }

    // Vérifier si le déchet passe derrière la poubelle
    if (this.trash.x > this.bin2.x - 3 || this.trash.y < this.bin2.y - 10) {
      this.isTrashVisible = false;
    }

    if (this.trash.x > this.bin2.x + 5) {
      this.isGameActive;
      this.success = false;
      this.echec = true;
    }

    // Vérifier si le déchet tombe dans l'océan ou trop loin
    if (this.trash.y <= -100 || this.trash.x > 1000) {
      this.isGameActive = false;
      this.isTrashVisible = false;
      this.echec = true;
      clearInterval(interval);
    }
  }, 20);
},

    resetGame() {
      // Réinitialise tous les paramètres
      this.trash = { x: 145, y: 160 }; // Réinitialise la position du déchet
      this.arrowHeight = 50;
      this.trashVelocity = { x: 0, y: 0 };
      this.isTrashVisible = true; // Rendre le déchet visible
      this.success = false;
      this.echec = false;
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
  background: url('/images/captcha/ciel.png') no-repeat center center;  /* Image du ciel */
  background-size: cover;
  border: 2px solid #aaa;
  border-radius: 15px;
  overflow: hidden;
  z-index: 0;  /* Ciel en arrière-plan */
}

.bridgeL {
  position: absolute;
  bottom: 50px;
  left: 0;
  width: 250px;
  height: 20px;
  background: url('/images/captcha/béton.jpg'); /* Texture du pont gauche */
  background-size: cover;
  border-radius: 5px;
  z-index: 1;  /* Le pont gauche passe devant le ciel */
}

.bridgeR {
  position: absolute;
  bottom: 50px;
  right: 100px; /* Coller au bord droit */
  width: 75px;
  height: 17px;
  background-image: url('/images/captcha/béton.jpg'); /* Texture du pont droit */
  background-size: cover;
  border-radius: 5px;
  z-index: 1;  /* Le pont droit passe devant le ciel */
}

.character {
  position: absolute;
  bottom: 21px;
  left: 50px;
  width: 250px;
  height: 245px;
  background-size: cover; /* Utilisation de l'image de fond pour le personnage */
  z-index: 4;  /* Le personnage passe devant les ponts */
}


.arrow {
  position: absolute;
  width: 10px;
  background-color: red;
  border-radius: 5px;
  z-index: 4;  /* La flèche passe devant le déchet */
}

/* Poubelle principale (bin2) */
.bin {
  position: absolute;
  width: 120px;
  height: 30px;
  background-size: cover;
  border-radius: 10px;
  z-index: 0;  /* Poubelle 1 passe derrière le déchet */
}

/* Deuxième poubelle (bin2) */
.bin2 {
  position: absolute;
  width: 120px;
  height: 120px;
  background-size: cover;
  border-radius: 10px;
  z-index: 3;  /* La poubelle 2 passe devant la poubelle 1 mais derrière le déchet */
  clip-path: inset(30px 0 0 0); /* Découper 30px du haut de l'image */
}

/* Déchet (trash) */
.trash {
  position: absolute;
  bottom: 80px;
  left: 55px;
  width: 60px;
  height: 60px;
  background-size: cover;
  z-index: 4;  /* Le déchet passe devant les poubelles */
  transition: transform 0.1s ease-in-out; /* Transition pour la rotation et mouvement */
}

.trash-rotate {
  animation: rotateTrash 2s linear infinite; /* Animation continue de rotation */
}

@keyframes rotateTrash {
  0% {
    transform: rotate(0deg); /* Début de la rotation */
  }
  100% {
    transform: rotate(360deg); /* Fin de la rotation (360 degrés) */
  }
}




.ocean {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background-image: url('/images/captcha/ocean.png'); /* Texture de l'océan */
  background-size: cover;
  z-index: 2;  /* L'océan passe devant le ciel mais derrière tout le reste */
}

.captcha-success {
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  color: #4caf50;
}

.captcha-echec {
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  color: red;
}

/* Style commun pour les boutons */
.cta-button {
  font-size: 18px;
  font-weight: bold;
  padding: 12px 25px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border: none;
  outline: none;
  text-align: center;
  width: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: inline-block;
  margin: 10px;
  text-transform: uppercase;
}

.cta-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.cta-button:active {
  transform: scale(0.98);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

/* Bouton de démarrage (Start) */
.start-button {
  background-color: #4caf50;  /* Vert */
  color: white;
}

.start-button:hover {
  background-color: #45a049;
}

.start-button:active {
  background-color: #3e8e41;
}

/* Bouton de réinitialisation */
.reset-button {
  background-color: #f44336;  /* Rouge */
  color: white;
}

.reset-button:hover {
  background-color: #da190b;
}

.reset-button:active {
  background-color: #c21807;
}

/* Style pour le titre */
.title {
  font-family: 'Arial', sans-serif; /* Choix d'une police moderne */
  font-size: 28px; /* Taille du texte */
  font-weight: bold; /* Texte en gras pour le rendre plus percutant */
  color: #000000; /* Couleur verte */
  text-transform: uppercase; /* Transforme en majuscules */
  letter-spacing: 2px; /* Espacement entre les lettres pour plus de lisibilité */
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* Ombre portée douce pour donner du relief */
  margin: 20px 0; /* Marge autour du titre */
  padding: 10px;
  background: linear-gradient(135deg, #e00000, #ff8a8a); /* Dégradé vert pour ajouter du dynamisme */
  border-radius: 8px; /* Bords arrondis pour un effet plus moderne */
  display: inline-block; /* Garder l'espace autour du texte */
  transition: all 0.3s ease-in-out; /* Transition pour un effet visuel lors du survol */
}

.title:hover {
  color: white; /* Changer la couleur du texte lors du survol */
  transform: scale(1.1); /* Agrandir légèrement le texte */
  text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5); /* Ombre plus marquée lors du survol */
}

</style>
  