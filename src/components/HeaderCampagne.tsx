import React from "react";
import { Box, Button, Typography, Stack } from "@mui/material";

// Composant pour l'en-tête de la page Ma Campagne
function HeaderCampagne() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderBottom: '1px solid #eee', background: '#fff' }}>
      {/* Titre de la page */}
      <Typography variant="h4" fontWeight={700} color="#2A3B8F">
        Ma Campagne
      </Typography>

      {/* Boutons à droite */}
      <Stack direction="row" spacing={2} alignItems="center">
        {/* Bouton Mon Code PIN (ouvre une modale, non implémenté ici) */}
        <Button variant="outlined" color="primary">
          Mon Code PIN
        </Button>
        {/* Bouton QR Code (ouvre une modale, non implémenté ici) */}
        <Button variant="outlined" color="warning">
          QR Code
        </Button>
        {/* Bouton Sauvegarder */}
        <Button variant="contained" color="primary">
          SAUVEGARDER
        </Button>
      </Stack>

      {/* Date de disponibilité (sous les boutons sur la maquette, ici à droite pour simplifier) */}
      <Typography variant="body2" color="text.secondary" sx={{ ml: 3 }}>
        Disponible jusqu'au 10 déc. 2025
      </Typography>
    </Box>
  );
}

export default HeaderCampagne; 