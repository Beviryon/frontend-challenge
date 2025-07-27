import React from "react";
import './App.css';
// On importe tous les composants de la page
import HeaderCampagne from "./components/HeaderCampagne";
import AlerteCodePin from "./components/AlerteCodePin";
import ActionsCampagne from "./components/ActionsCampagne";
import ChoixJeu from "./components/ChoixJeu";
import PersonnalisationJeu from "./components/PersonnalisationJeu";
import GainsCampagne from "./components/GainsCampagne";
import ConditionsRecuperation from "./components/ConditionsRecuperation";

function App() {
  return (
    <div
      className="ma-campagne-container"
      style={{
        padding: '20px',
        minHeight: '100vh',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* En-tête de la page */}
      <HeaderCampagne />

      {/* Alerte code PIN */}
      <AlerteCodePin />

      {/* Section pour organiser les actions */}
      <ActionsCampagne />

      {/* Section pour choisir le type de jeu */}
      <ChoixJeu />

      {/* Section pour personnaliser le jeu */}
      <PersonnalisationJeu />

      {/* Section pour ajouter et configurer les gains */}
      <GainsCampagne />

      {/* Section pour définir les conditions de récupération */}
      <ConditionsRecuperation />
      </div>
  );
}

export default App;
