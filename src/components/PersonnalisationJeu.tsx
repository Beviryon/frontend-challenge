import { useState, useRef } from "react";
import { Box, Typography, Button, TextField, Stack, Paper, IconButton, Alert } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import type { Profile } from '../../doc/CampaignType';

interface PersonnalisationJeuProps {
  profile: Profile;
}

// Composant pour personnaliser le jeu (logo, couleurs, aperçu)
function PersonnalisationJeu({ profile }: PersonnalisationJeuProps) {
  // Désactiver la personnalisation si le profil est BASIC
  const personnalisationDesactivee = profile === "BASIC";

  // Etat pour la couleur 1 et 2
  const [couleur1, setCouleur1] = useState("#3F5EFB");
  const [couleur2, setCouleur2] = useState("#FCB03F");
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [sectionOuverte, setSectionOuverte] = useState(true);
  const [isDragOver, setIsDragOver] = useState(false);
  const [couleur1Error, setCouleur1Error] = useState<string | null>(null);
  const [couleur2Error, setCouleur2Error] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validation complète du format hexadécimal
  const validateHexColor = (val: string) => {
    // Supprimer les espaces et convertir en majuscules
    const cleanVal = val.trim().toUpperCase();
    
    // Vérifier si c'est un format hexadécimal valide
    const hexRegex = /^#[0-9A-F]{6}$/;
    const shortHexRegex = /^#[0-9A-F]{3}$/;
    
    if (hexRegex.test(cleanVal)) {
      return { isValid: true, value: cleanVal, error: null };
    }
    
    if (shortHexRegex.test(cleanVal)) {
      // Convertir le format court en format long
      const expanded = '#' + cleanVal[1] + cleanVal[1] + cleanVal[2] + cleanVal[2] + cleanVal[3] + cleanVal[3];
      return { isValid: true, value: expanded, error: null };
    }
    
    // Si la valeur commence par # mais n'est pas valide
    if (cleanVal.startsWith('#')) {
      if (cleanVal.length < 7) {
        return { isValid: false, value: cleanVal, error: 'Code couleur incomplet' };
      } else if (cleanVal.length > 7) {
        return { isValid: false, value: cleanVal, error: 'Code couleur trop long' };
      } else {
        return { isValid: false, value: cleanVal, error: 'Code couleur invalide' };
      }
    }
    
    // Si la valeur ne commence pas par #
    if (cleanVal.length === 6 && /^[0-9A-F]{6}$/.test(cleanVal)) {
      return { isValid: true, value: '#' + cleanVal, error: null };
    }
    
    return { isValid: false, value: cleanVal, error: 'Format hexadécimal attendu (ex: #FF0000)' };
  };

  const isHex = (val: string) => validateHexColor(val).isValid;

  // Validation des fichiers d'image
  const validateImageFile = (file: File) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    
    if (!allowedTypes.includes(file.type)) {
      return { isValid: false, error: 'Format de fichier non supporté. Utilisez JPG, PNG, GIF ou WebP.' };
    }
    
    if (file.size > maxSize) {
      return { isValid: false, error: 'Fichier trop volumineux. Taille maximum : 5MB.' };
    }
    
    return { isValid: true, error: null };
  };

  // Création de la prévisualisation
  const createPreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setLogoPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Gestion du drag & drop pour le logo
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const validation = validateImageFile(file);
      
      if (validation.isValid) {
        setLogo(file);
        setLogoError(null);
        createPreview(file);
      } else {
        setLogoError(validation.error);
        setLogo(null);
        setLogoPreview(null);
      }
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
      const file = event.target.files[0];
      const validation = validateImageFile(file);
      
      if (validation.isValid) {
        setLogo(file);
        setLogoError(null);
        createPreview(file);
      } else {
        setLogoError(validation.error);
        setLogo(null);
        setLogoPreview(null);
      }
    }
  };

  // Fonction pour ouvrir le sélecteur de fichier
  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  // Fonction pour supprimer le logo
  const handleRemoveLogo = () => {
    setLogo(null);
    setLogoPreview(null);
    setLogoError(null);
  };

  // Fonctions de gestion des changements de couleurs avec validation
  const handleCouleur1Change = (newValue: string) => {
    const validation = validateHexColor(newValue);
    setCouleur1(validation.value);
    setCouleur1Error(validation.isValid ? null : validation.error);
  };

  const handleCouleur2Change = (newValue: string) => {
    const validation = validateHexColor(newValue);
    setCouleur2(validation.value);
    setCouleur2Error(validation.isValid ? null : validation.error);
  };

  // Fonction pour voir l'aperçu (simulation)
  const handleVoirApercu = () => {
    if (couleur1Error || couleur2Error) {
      alert("Veuillez corriger les erreurs de couleur avant de voir l'aperçu.");
      return;
    }
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
        <>
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
                borderColor: logoError ? '#f44336' : (isDragOver ? '#2A3B8F' : '#ccc'),
                backgroundColor: logoError ? '#ffebee' : (isDragOver ? '#f0f8ff' : '#fff'),
                opacity: personnalisationDesactivee ? 0.5 : 1,
                transition: 'all 0.3s ease',
                cursor: personnalisationDesactivee ? 'not-allowed' : 'pointer',
                position: 'relative'
              }}
              onDrop={personnalisationDesactivee ? undefined : handleDrop}
              onDragOver={personnalisationDesactivee ? undefined : handleDragOver}
              onDragLeave={personnalisationDesactivee ? undefined : handleDragLeave}
              onClick={personnalisationDesactivee ? undefined : handleSelectFile}
            >
              {/* Prévisualisation du logo */}
              {logoPreview && (
                <Box sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: 1
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    gap: 2
                  }}>
                    <img 
                      src={logoPreview} 
                      alt="Logo preview" 
                      style={{ 
                        maxWidth: '120px', 
                        maxHeight: '120px', 
                        objectFit: 'contain',
                        borderRadius: '8px'
                      }} 
                    />
                    <Typography variant="body2" sx={{ color: '#666', textAlign: 'center' }}>
                      {logo?.name}
                    </Typography>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveLogo();
                      }}
                      sx={{ 
                        color: '#f44336', 
                        borderColor: '#f44336',
                        textTransform: 'none',
                        '&:hover': { 
                          background: '#ffebee',
                          borderColor: '#d32f2f'
                        }
                      }}
                    >
                      Supprimer
                    </Button>
                  </Box>
                </Box>
              )}

              {/* Message d'erreur */}
              {logoError && (
                <Box sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: 1
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    gap: 2,
                    textAlign: 'center'
                  }}>
                    <Typography variant="body2" sx={{ color: '#f44336', fontWeight: 500 }}>
                      ❌ {logoError}
                    </Typography>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLogoError(null);
                      }}
                      sx={{ 
                        color: '#666', 
                        borderColor: '#ccc',
                        textTransform: 'none'
                      }}
                    >
                      Réessayer
                    </Button>
                  </Box>
                </Box>
              )}

              {/* Contenu par défaut (visible seulement si pas de prévisualisation ni d'erreur) */}
              {!logoPreview && !logoError && (
                <>
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
                    Cliquez ou glissez-déposez votre logo ici
                  </Typography>
                  
                  {/* Informations sur les formats acceptés */}
                  <Typography variant="caption" sx={{ mb: 2, textAlign: 'center', color: '#999' }}>
                    Formats acceptés : JPG, PNG, GIF, WebP (max 5MB)
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
                </>
              )}
              
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
                    border: couleur1Error ? '2px solid #f44336' : '2px solid #e0e0e0',
                    mb: 1,
                    cursor: 'pointer',
                    position: 'relative',
                    '&:hover': {
                      borderColor: couleur1Error ? '#d32f2f' : '#2A3B8F'
                    }
                  }}
                  onClick={() => {
                    if (!personnalisationDesactivee) {
                      const input = document.createElement('input');
                      input.type = 'color';
                      input.value = couleur1;
                      input.onchange = (e) => handleCouleur1Change((e.target as HTMLInputElement).value);
                      input.click();
                    }
                  }}
                />
                <TextField
                  label="Couleur 1"
                  value={couleur1}
                  onChange={e => handleCouleur1Change(e.target.value)}
                  error={!!couleur1Error}
                  helperText={couleur1Error || ""}
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
                    border: couleur2Error ? '2px solid #f44336' : '2px solid #e0e0e0',
                    mb: 1,
                    cursor: 'pointer',
                    position: 'relative',
                    '&:hover': {
                      borderColor: couleur2Error ? '#d32f2f' : '#FF9800'
                    }
                  }}
                  onClick={() => {
                    if (!personnalisationDesactivee) {
                      const input = document.createElement('input');
                      input.type = 'color';
                      input.value = couleur2;
                      input.onchange = (e) => handleCouleur2Change((e.target as HTMLInputElement).value);
                      input.click();
                    }
                  }}
                />
                <TextField
                  label="Couleur 2"
                  value={couleur2}
                  onChange={e => handleCouleur2Change(e.target.value)}
                  error={!!couleur2Error}
                  helperText={couleur2Error || ""}
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
        
        {/* Alerte d'information sur l'importance des couleurs */}
        {personnalisationDesactivee ? (
          <Alert 
            severity="warning" 
            icon={false}
            sx={{ 
              mt: 3, 
              background: '#FFF3E0', 
              border: '1px solid #FF9800',
              '& .MuiAlert-message': { color: '#E65100' }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ fontSize: 16 }}>⚠️</Box>
              <Typography variant="body2">
                <strong>Mode BASIC :</strong> La personnalisation des couleurs et du logo est désactivée. Passez au mode PREMIUM pour personnaliser votre jeu.
              </Typography>
            </Box>
          </Alert>
        ) : (
          <Alert 
            severity="info" 
            icon={false}
            sx={{ 
              mt: 3, 
              background: '#E3F2FD', 
              border: '1px solid #2196F3',
              '& .MuiAlert-message': { color: '#1976D2' }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ fontSize: 16 }}>💡</Box>
              <Typography variant="body2">
                <strong>Info :</strong> Les couleurs personnalisées sont importantes pour l'image de votre établissement et l'engagement des joueurs.
              </Typography>
            </Box>
          </Alert>
        )}
        </>
      )}
    </Box>
  );
}

export default PersonnalisationJeu; 