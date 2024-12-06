<template>

  <div class="music">
  
  <audio id="background-music" loop>
      <source src="/audio/bo2zombies.mp3" type="audio/mp3">
      Votre navigateur ne supporte pas la balise audio.
    </audio>

  </div>

  <div class="calendar-container">


    <!-- Musique de fond -->
    <!-- Overlay pour demander d'activer la musique -->
    <div v-if="!isMusicPlaying" class="music-overlay">
      <button @click="playBackgroundMusic">Cliquez pour activer la musique</button>
    </div>

    <div class="titre">Calendrier de l’Avent - Défiez le Grinch !</div>
    <img class="corner-image" src="/images/defi_grinch/grinch-removebg.png" alt="Image du Grinch">
    <img class="corner-image2" src="/images/defi_grinch/grinch-removebg.png" alt="Image du Grinch">
    <div class="calendar">
      <div class="grid">
        <!-- En-tête des jours de la semaine -->
        <div class="weekday" v-for="(day, index) in weekDays" :key="index">
          {{ day }}
        </div>

        <!-- Cases du calendrier -->
        <div 
          v-for="day in days"
          :key="day.date"
          class="day"
          :class="{ locked: !day.isAvailable, stolen: day.isStolen }"
          @click="openDay(day)"
        >
          <span v-if="day.isAvailable || day.isStolen">{{ day.number }}</span>
          <span v-else>🔒</span>
        </div>
      </div>
      <div class="grinch-meter">
        <p>Grinch-o-mètre : {{ stolenCount }} boîtes volées !</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      days: [], // Liste des jours du calendrier
      stolenCount: 0, // Compteur de boîtes volées par le Grinch
      weekDays: ['D', 'L', 'M', 'M', 'J', 'V', 'S'], // Initiales des jours de la semaine
      isMusicPlaying: false, // État pour suivre si la musique est jouée
    };
  },
  created() {
    this.generateCalendar();
  },
  methods: {
    // Générer les jours de décembre 2024
    generateCalendar() {
      const currentDate = new Date();
      const today = currentDate.getDate();
      const currentMonth = currentDate.getMonth();
      const isDecember = currentMonth === 11; // Vérifie si nous sommes en décembre

      for (let i = 1; i <= 24; i++) {
        const isAvailable = isDecember && i <= today;
        const isStolen = Math.random() < 0.1; // 10% de chance d'être volée par le Grinch
        this.days.push({
          number: i,
          date: new Date(2024, 11, i),
          isAvailable,
          isStolen: isAvailable && isStolen,
        });
        if (isAvailable && isStolen) {
          this.stolenCount++;
        }
      }
    },
    // Gestion de l'ouverture d'une case
    openDay(day) {
      if (!day.isAvailable) {
        alert("Patience ! Cette case n'est pas encore disponible.");
        return;
      }
      if (day.isStolen) {
        alert("Oh non ! Le Grinch a volé cette case !");
        return;
      }
      alert(`Félicitations ! Vous avez découvert une surprise pour le jour ${day.number}.`);
    },
    // Fonction pour jouer la musique
    playBackgroundMusic() {
      const audioElement = document.getElementById("background-music");
      if (audioElement) {
        audioElement.play()
          .then(() => {
            this.isMusicPlaying = true; // Masque le bouton après le démarrage
          })
          .catch((error) => {
            console.error("Erreur lors de la lecture de la musique :", error);
          });
      }
    },
  },
};
</script>

<style scoped>
/* Conteneur principal */
.calendar-container {
  margin: 0;
  padding: 0;
  height: 100vh;
  background-color: rgb(4, 144, 236); /* Fond bleu pour toute la page */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

/* Titre principal */
.titre {
  margin-top: 20px;
  font-size: 40px;
  font-weight: bold;
  font-family: cursive;
  color: black;
  text-align: center;
}

/* Images du Grinch dans les coins */
.corner-image {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 100px;
  height: auto;
}

.corner-image2 {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 100px;
  height: auto;
}

/* Section du calendrier */
.calendar {
  margin-top: 80px; /* Ajoute un espace sous le titre */
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
}

/* Grille du calendrier */
.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7 colonnes pour les jours */
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

/* En-têtes des jours de la semaine */
.weekday {
  font-weight: bold;
  font-size: 16px;
  color: #fff;
  background-color: #333;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
}

/* Styles pour chaque jour */
.day {
  background: #f2f2f2;
  border: 2px solid #ccc;
  border-radius: 5px;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, background 0.3s;
}

.day.locked {
  background: #ddd;
  cursor: not-allowed;
}

.day.stolen {
  background: #ffcccc;
  color: #900;
}

.day:hover:not(.locked) {
  transform: scale(1.1);
  background: #413f3d;
}

/* Grinch-o-mètre */
.grinch-meter {
  margin-top: 20px;
  font-size: 16px;
  color: #333;
}

/* Overlay pour activer la musique */
.music-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 1000;
}

/* Bouton dans l'overlay */
button {
  background: #ff9800;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background: #e67e22;
}
</style>

