import React, { useState, useRef } from "react";
import { Box, Typography, Button, TextField, Stack, Paper, IconButton } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Composant pour personnaliser le jeu (logo, couleurs, aperçu)
function PersonnalisationJeu() {
  // mettre BASIC pour désactiver la personnalisation
  const profil: "PRO" | "BASIC" = "PRO";
  const personnalisationDesactivee = profil === "BASIC";

  // Etat pour la couleur 1 et 2
  const [couleur1, setCouleur1] = useState("#3F5EFB");
  const [couleur2, setCouleur2] = useState("#FCB03F");
  const [logo, setLogo] = useState<File | null>(null);
  const [sectionOuverte, setSectionOuverte] = useState(true);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validation simple du format hexadécimal
  const isHex = (val: string) => /^#[0-9A-Fa-f]{6}$/.test(val);

  // Gestion du drag & drop pour le logo
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setLogo(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  // Gestion de la sélection de fichier
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLogo(event.target.files[0]);
    }
  };

  // Fonction pour ouvrir le sélecteur de fichier
  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  // Fonction pour voir l'aperçu (simulation)
  const handleVoirApercu = () => {
    alert("Aperçu du jeu personnalisé avec les couleurs " + couleur1 + " et " + couleur2 + (logo ? " et le logo " + logo.name : ""));
  };

  return (
    <Box sx={{ my: 4, p: 3, background: '#fff', borderRadius: 2, boxShadow: 1 }}>
      {/* En-tête avec titre et flèche accordéon */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          {/* Titre avec barre bleue */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
            <Box sx={{ width: 4, height: 48, bgcolor: '#2A3B8F', borderRadius: 2, mr: 2, mt: 0.5 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant="h6" fontWeight={700} color="#000" sx={{ mb: 0.5, textAlign: 'left' }}>
                PERSONNALISEZ VOTRE JEU
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.4, textAlign: 'left' }}>
                Importez votre logo et sélectionnez vos couleurs pour créer un jeu à l'image de votre<br />
                marque. Offrez à vos clients une expérience unique, entièrement personnalisée.
              </Typography>
            </Box>
          </Box>
        </Box>
        
        {/* Flèche accordéon */}
        <IconButton 
          onClick={() => setSectionOuverte(!sectionOuverte)}
          sx={{ 
            color: '#2A3B8F',
            transform: sectionOuverte ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform 0.3s'
          }}
        >
          <KeyboardArrowUpIcon />
        </IconButton>
      </Box>

      {/* Contenu de la section (masqué si accordéon fermé) */}
      {sectionOuverte && (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
          {/* Zone de drag & drop pour le logo */}
          <Box sx={{ flex: 1, minWidth: 250 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ width: 4, height: 20, bgcolor: '#2A3B8F', borderRadius: 2, mr: 2 }} />
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#000' }}>
                Glissez-déposez votre logo
              </Typography>
            </Box>
            <Paper
              variant="outlined"
              sx={{ 
                p: 3, 
                minHeight: 180, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                borderStyle: 'dashed', 
                borderColor: isDragOver ? '#2A3B8F' : '#ccc',
                backgroundColor: isDragOver ? '#f0f8ff' : '#fff',
                opacity: personnalisationDesactivee ? 0.5 : 1,
                transition: 'all 0.3s ease',
                cursor: personnalisationDesactivee ? 'not-allowed' : 'pointer'
              }}
              onDrop={personnalisationDesactivee ? undefined : handleDrop}
              onDragOver={personnalisationDesactivee ? undefined : handleDragOver}
              onDragLeave={personnalisationDesactivee ? undefined : handleDragLeave}
              onClick={personnalisationDesactivee ? undefined : handleSelectFile}
            >
              {/* Icône de téléchargement */}
              <CloudUploadIcon 
                sx={{ 
                  fontSize: 48, 
                  color: isDragOver ? '#2A3B8F' : '#ccc', 
                  mb: 2 
                }} 
              />
              
              {/* Texte d'instruction */}
              <Typography variant="body2" sx={{ mb: 2, textAlign: 'center', color: '#666' }}>
                {logo ? logo.name : "Cliquez ou glissez-déposez votre logo ici"}
              </Typography>
              
              {/* Bouton de sélection */}
              <Button 
                variant="contained" 
                sx={{
                  background: '#2A3B8F',
                  color: '#fff',
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  '&:hover': { background: '#1a255c' }
                }}
                disabled={personnalisationDesactivee}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectFile();
                }}
              >
                SÉLECTIONNER UN FICHIER
              </Button>
              
              {/* Input file caché */}
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                style={{ display: 'none' }}
                disabled={personnalisationDesactivee}
                aria-label="Sélectionner un fichier logo"
              />
            </Paper>
          </Box>

          {/* Sélecteur de couleurs */}
          <Box sx={{ flex: 1, minWidth: 250, opacity: personnalisationDesactivee ? 0.5 : 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: 4, height: 20, bgcolor: '#2A3B8F', borderRadius: 2, mr: 2 }} />
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#000' }}>
                  Importer vos couleurs
                </Typography>
              </Box>
              <Button 
                variant="text" 
                endIcon={<VisibilityIcon />}
                onClick={handleVoirApercu}
                disabled={personnalisationDesactivee}
                sx={{ 
                  color: '#2A3B8F', 
                  textTransform: 'none',
                  fontSize: 14
                }}
              >
                Voir l'aperçu
              </Button>
            </Box>
            
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
              {/* Sélecteur couleur 1 */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box 
                  sx={{ 
                    width: 60, 
                    height: 60, 
                    bgcolor: isHex(couleur1) ? couleur1 : '#eee', 
                    borderRadius: 2,
                    border: '2px solid #e0e0e0',
                    mb: 1,
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    if (!personnalisationDesactivee) {
                      const input = document.createElement('input');
                      input.type = 'color';
                      input.value = couleur1;
                      input.onchange = (e) => setCouleur1((e.target as HTMLInputElement).value);
                      input.click();
                    }
                  }}
                />
                <TextField
                  label="Couleur 1"
                  value={couleur1}
                  onChange={e => setCouleur1(e.target.value)}
                  error={!isHex(couleur1)}
                  helperText={!isHex(couleur1) ? "Format hexadécimal attendu" : ""}
                  disabled={personnalisationDesactivee}
                  size="small"
                  sx={{ width: 120 }}
                />
              </Box>
              
              {/* Sélecteur couleur 2 */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box 
                  sx={{ 
                    width: 60, 
                    height: 60, 
                    bgcolor: isHex(couleur2) ? couleur2 : '#eee', 
                    borderRadius: 2,
                    border: '2px solid #e0e0e0',
                    mb: 1,
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    if (!personnalisationDesactivee) {
                      const input = document.createElement('input');
                      input.type = 'color';
                      input.value = couleur2;
                      input.onchange = (e) => setCouleur2((e.target as HTMLInputElement).value);
                      input.click();
                    }
                  }}
                />
                <TextField
                  label="Couleur 2"
                  value={couleur2}
                  onChange={e => setCouleur2(e.target.value)}
                  error={!isHex(couleur2)}
                  helperText={!isHex(couleur2) ? "Format hexadécimal attendu" : ""}
                  disabled={personnalisationDesactivee}
                  size="small"
                  sx={{ width: 120 }}
                />
              </Box>
            </Stack>
            
            <Typography variant="caption" sx={{ color: '#666', display: 'block', textAlign: 'left' }}>
              Personnalisez votre jeu en<br />
              ajoutant jusqu'à deux couleurs
            </Typography>
          </Box>
        </Stack>
      )}
    </Box>
  );
}

export default PersonnalisationJeu; 