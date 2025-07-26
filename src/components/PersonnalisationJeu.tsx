import React, { useState } from "react";
import { Box, Typography, Button, TextField, Stack, Paper } from "@mui/material";

// Composant pour personnaliser le jeu (logo, couleurs, aperçu)
function PersonnalisationJeu() {
  // On simule un profil (mettre BASIC pour désactiver la personnalisation)
  const profil = "PRO";
  const personnalisationDesactivee = profil === "BASIC";

  // Etat pour la couleur 1 et 2
  const [couleur1, setCouleur1] = useState("#3F5CFB");
  const [couleur2, setCouleur2] = useState("#FCB03F");
  const [logo, setLogo] = useState<File | null>(null);

  // Validation simple du format hexadécimal
  const isHex = (val: string) => /^#[0-9A-Fa-f]{6}$/.test(val);

  // Gestion du drag & drop pour le logo
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setLogo(e.dataTransfer.files[0]);
    }
  };

  return (
    <Box sx={{ my: 4, p: 3, background: '#fff', borderRadius: 2, boxShadow: 1 }}>
      {/* Titre de la section */}
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        PERSONNALISEZ VOTRE JEU
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Importez votre logo et sélectionnez vos couleurs pour créer un jeu à l'image de votre marque. Offrez à vos clients une expérience unique, entièrement personnalisée.
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
        {/* Zone de drag & drop pour le logo */}
        <Paper
          variant="outlined"
          sx={{ p: 3, minWidth: 250, minHeight: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', opacity: personnalisationDesactivee ? 0.5 : 1 }}
          onDrop={personnalisationDesactivee ? undefined : handleDrop}
          onDragOver={personnalisationDesactivee ? undefined : (e) => e.preventDefault()}
        >
          {/* On désactive le drag & drop si le profil est BASIC */}
          <Typography variant="body2" sx={{ mb: 2 }}>
            Glissez-déposez votre logo
          </Typography>
          <Button variant="outlined" component="label" disabled={personnalisationDesactivee}>
            SÉLECTIONNER UN FICHIER
            <input type="file" hidden onChange={e => e.target.files && setLogo(e.target.files[0])} disabled={personnalisationDesactivee} />
          </Button>
          {logo && <Typography variant="caption" sx={{ mt: 1 }}>{logo.name}</Typography>}
        </Paper>

        {/* Sélecteur de couleurs */}
        <Box sx={{ minWidth: 250, opacity: personnalisationDesactivee ? 0.5 : 1 }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Importer vos couleurs
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              label="Couleur 1"
              value={couleur1}
              onChange={e => setCouleur1(e.target.value)}
              error={!isHex(couleur1)}
              helperText={!isHex(couleur1) ? "Format hexadécimal attendu" : ""}
              disabled={personnalisationDesactivee}
            />
            <Box sx={{ width: 32, height: 32, bgcolor: isHex(couleur1) ? couleur1 : '#eee', borderRadius: '50%', border: '1px solid #ccc' }} />
            <TextField
              label="Couleur 2"
              value={couleur2}
              onChange={e => setCouleur2(e.target.value)}
              error={!isHex(couleur2)}
              helperText={!isHex(couleur2) ? "Format hexadécimal attendu" : ""}
              disabled={personnalisationDesactivee}
            />
            <Box sx={{ width: 32, height: 32, bgcolor: isHex(couleur2) ? couleur2 : '#eee', borderRadius: '50%', border: '1px solid #ccc' }} />
          </Stack>
          <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
            Personnalisez votre jeu en ajoutant jusqu'à deux couleurs
          </Typography>
          {/* Bouton Voir l'aperçu (fonction non implémentée) */}
          <Button variant="text" sx={{ mt: 2 }} disabled={personnalisationDesactivee}>
            Voir l'aperçu
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default PersonnalisationJeu; 