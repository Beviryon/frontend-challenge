import React from "react";
import { Alert, Button, Box, Typography } from "@mui/material";

// Composant pour afficher l'alerte du code PIN non configuré
function AlerteCodePin() {
  return (
    <Box sx={{ my: 3 }}>
      {/* On affiche une alerte jaune si le code PIN n'est pas configuré */}
      <Alert
        severity="warning"
        icon={false}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFF8E1', border: '1px solid #FFECB3', p: 3 }}
        action={
          // Bouton pour configurer le code PIN
          <Button variant="contained" color="warning">
            CONFIGURER MON CODE
          </Button>
        }
      >
        <Box>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
            Votre Code PIN n'est pas configuré
          </Typography>
          <Typography variant="body2">
            Activez-le pour sécuriser la récupération des cadeaux par vos clients.
          </Typography>
        </Box>
      </Alert>
    </Box>
  );
}

export default AlerteCodePin; 