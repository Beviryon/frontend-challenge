import React, { useState } from "react";
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Stack, Chip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

// Composant pour ajouter et configurer les gains
function GainsCampagne() {
  // On simule le type de jeu (mettre true pour 100% gagnant, false sinon)
  const jeu100Gagnant = true;

  // Liste des gains (état local)
  const [gains, setGains] = useState([
    { id: 1, nom: "Frite", categorie: "Nourriture", stock: 15, illimite: false },
    { id: 2, nom: "Sac Jacquemus", categorie: "Tirage au sort", stock: -1, illimite: true },
  ]);

  // Si le jeu n'est pas 100% gagnant, on ajoute automatiquement une PERTE
  const gainsAffiches = jeu100Gagnant
    ? gains
    : [...gains, { id: 999, nom: "PERTE", categorie: "-", stock: 0, illimite: false }];

  // Fonction pour ajouter un gain fictif
  const ajouterGain = () => {
    setGains([...gains, { id: Date.now(), nom: "Nouveau gain", categorie: "Autre", stock: 1, illimite: false }]);
  };

  // Fonction pour supprimer un gain
  const supprimerGain = (id: number) => {
    setGains(gains.filter(g => g.id !== id));
  };

  // Vérifier si au moins un gain est illimité si jeu 100% gagnant
  const auMoinsUnIllimite = jeu100Gagnant && gains.some(g => g.illimite);

  return (
    <Box sx={{ my: 4, p: 3, background: '#fff', borderRadius: 2, boxShadow: 1 }}>
      {/* Titre de la section */}
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        AJOUTEZ ET CONFIGUREZ VOS GAINS
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Indiquez les récompenses que vos clients pourront gagner. Offrez des cadeaux attractifs pour augmenter leur engagement et leur fidélité.
      </Typography>

      {/* Alerte si aucun gain illimité pour 100% gagnant */}
      {jeu100Gagnant && !auMoinsUnIllimite && (
        <Typography color="error" sx={{ mb: 2 }}>
          Au moins un gain doit être en quantité illimitée (initial_limit = -1)
        </Typography>
      )}

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        {/* Bouton pour lancer le tirage au sort (non implémenté) */}
        <Button variant="outlined" color="warning" disabled>
          Lancer le tirage au sort
        </Button>
        {/* Bouton pour ajouter un gain */}
        <Button variant="contained" color="primary" onClick={ajouterGain}>
          Ajouter un gain
        </Button>
      </Stack>

      {/* Tableau des gains */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom du Gain</TableCell>
              <TableCell>Catégorie</TableCell>
              <TableCell>Nombre de stock</TableCell>
              <TableCell>Illimité</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gainsAffiches.map((gain) => (
              <TableRow key={gain.id}>
                <TableCell>{gain.nom}</TableCell>
                <TableCell>{gain.categorie}</TableCell>
                <TableCell>{gain.illimite ? <Chip label="Illimité" color="success" size="small" /> : gain.stock}</TableCell>
                <TableCell>{gain.illimite ? "Oui" : "Non"}</TableCell>
                <TableCell>
                  {/* On ne peut pas supprimer la PERTE */}
                  {gain.nom !== "PERTE" && (
                    <IconButton onClick={() => supprimerGain(gain.id)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default GainsCampagne; 