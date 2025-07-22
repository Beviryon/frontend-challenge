import React, { useState } from "react";
import { Box, Typography, Grid, Card, CardActionArea, CardContent } from "@mui/material";

// Liste des jeux disponibles
const jeux = [
  { id: "roulette", nom: "ROUE DE LA FORTUNE" },
  { id: "boites", nom: "LES BOÎTES MYSTÈRES" },
  { id: "machine", nom: "MACHINE À SOUS" },
  { id: "cartes", nom: "JEU DE CARTES" },
];

// Composant pour choisir le type de jeu
function ChoixJeu() {
  // On sélectionne la roue de la fortune par défaut
  const [jeuSelectionne, setJeuSelectionne] = useState("roulette");

  // On peut simuler un profil BASIC pour désactiver la sélection
  const profil = "PRO"; // mettre "BASIC" pour tester le cas désactivé
  const selectionDesactivee = profil === "BASIC";

  return (
    <Box sx={{ my: 4, p: 3, background: '#fff', borderRadius: 2, boxShadow: 1 }}>
      {/* Titre de la section */}
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        CHOIX DU JEU
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Sélectionnez parmi 4 jeux interactifs pour engager vos utilisateurs et créer une expérience unique.
      </Typography>

      {/* Grille des jeux */}
      <Grid container spacing={2}>
        {jeux.map((jeu) => (
          <Grid item xs={12} sm={6} md={3} key={jeu.id}>
            {/* On désactive la sélection si le profil est BASIC */}
            <Card
              variant={jeuSelectionne === jeu.id ? "outlined" : undefined}
              sx={{
                border: jeuSelectionne === jeu.id ? '2px solid #2A3B8F' : '1px solid #eee',
                opacity: selectionDesactivee ? 0.5 : 1,
                transition: 'border 0.2s',
              }}
            >
              <CardActionArea
                disabled={selectionDesactivee}
                onClick={() => setJeuSelectionne(jeu.id)}
              >
                <CardContent>
                  <Typography align="center" fontWeight={700}>
                    {jeu.nom}
                  </Typography>
                  {/* On pourrait mettre une image ici */}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ChoixJeu; 