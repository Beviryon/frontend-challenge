import React from "react";
import { Box, Typography, Button, List, ListItem, ListItemText, Chip, Alert } from "@mui/material";

// Composant pour organiser les actions de la campagne
function ActionsCampagne() {
  // Exemple de données fictives pour les actions
  const actions = [
    { id: 1, nom: "Avis Google", cible: "https://google.com/fr", etat: "Intégré" },
    { id: 2, nom: "Parrainage (Par défaut)", cible: "", etat: "" },
  ];

  return (
    <Box sx={{ my: 4, p: 3, background: '#fff', borderRadius: 2, boxShadow: 1 }}>
      {/* Titre de la section */}
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        ORGANISEZ VOS ACTIONS
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Définissez l'ordre des actions à réaliser par vos clients pour maximiser l'engagement.
      </Typography>

      {/* Bouton pour ajouter une action */}
      <Button variant="outlined" color="primary" sx={{ mb: 2 }}>
        Ajouter une action
      </Button>

      {/* Liste des actions (drag & drop à venir) */}
      <List>
        {actions.map((action, idx) => (
          <ListItem key={action.id} sx={{ borderBottom: '1px solid #eee' }}>
            <ListItemText
              primary={
                <span>
                  <b>{idx + 1}.</b> {action.nom}
                  {action.etat && (
                    <Chip label={action.etat} color="success" size="small" sx={{ ml: 1 }} />
                  )}
                </span>
              }
              secondary={action.cible && (
                <Typography variant="caption" color="text.secondary">{action.cible}</Typography>
              )}
            />
          </ListItem>
        ))}
      </List>

      {/* Avertissement en bas de section */}
      <Alert severity="warning" sx={{ mt: 3, background: '#FFF8E1', border: '1px solid #FFECB3' }}>
        {/* On affiche un avertissement si une action est en double (exemple) */}
        <Typography variant="body2">
          <b></b>Zone à une seule participation : vos clients ne peuvent qu'une seule fois la vous et vous ne proposez qu'une seule action.
        </Typography>
      </Alert>
    </Box>
  );
}

export default ActionsCampagne; 