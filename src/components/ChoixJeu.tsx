import { useState } from "react";
import { Box, Typography, Card, CardActionArea, CardContent, IconButton, ToggleButton, ToggleButtonGroup, Alert } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import wheel from "../assets/wheel.jpg";
import mystery from "../assets/mystery.png";
import slot from "../assets/slot.png";
import card from "../assets/card.png";
import type { Profile } from '../../doc/CampaignType';

interface ChoixJeuProps {
  profile: Profile;
  onProfileChange: (profile: Profile) => void;
}

// Composant pour choisir le type de jeu
function ChoixJeu({ profile, onProfileChange }: ChoixJeuProps) {
  // On sélectionne la roue de la fortune par défaut
  const [jeuSelectionne, setJeuSelectionne] = useState("roulette");
  const [sectionOuverte, setSectionOuverte] = useState(true);

  // Désactiver la sélection si le profil est BASIC
  const selectionDesactivee = profile === "BASIC";

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
                CHOIX DU JEU
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.4, textAlign: 'left' }}>
                Sélectionnez parmi 4 jeux interactifs pour engager vos utilisateurs et créer une expérience unique.
              </Typography>
            </Box>
          </Box>
        </Box>
        
        {/* Flèche accordéon */}
        <IconButton 
          onClick={() => setSectionOuverte(!sectionOuverte)}
          sx={{ color: '#2A3B8F', transform: sectionOuverte ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.3s' }}
        >
          <KeyboardArrowUpIcon />
        </IconButton>
      </Box>

      {/* Contenu de la section (masqué si accordéon fermé) */}
      {sectionOuverte && (
        <>
          {/* Sélecteur de profil */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ width: 4, height: 20, bgcolor: '#2A3B8F', borderRadius: 2, mr: 2 }} />
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#000' }}>
                Profil de campagne
              </Typography>
            </Box>
            <ToggleButtonGroup
              value={profile}
              exclusive
              onChange={(_, newProfile: Profile | null) => {
                if (newProfile !== null) {
                  onProfileChange(newProfile);
                }
              }}
              sx={{ 
                '& .MuiToggleButton-root': {textTransform: 'none', fontWeight: 600, px: 3, py: 1, border: '2px solid #e0e0e0',
                  '&.Mui-selected': {background: '#2A3B8F', color: '#fff', borderColor: '#2A3B8F', '&:hover': { background: '#1a255c' }},
                  '&:hover': {background: '#f5f5f5'}
                }
              }}
            >
              <ToggleButton value="PREMIUM">
                PREMIUM
              </ToggleButton>
              <ToggleButton value="BASIC">
                BASIC
              </ToggleButton>
            </ToggleButtonGroup>
            
            {profile === "BASIC" && (
              <Alert severity="info" sx={{ mt: 2, background: '#E3F2FD', border: '1px solid #2196F3' }}>
                <Typography variant="body2">
                  <strong>Mode BASIC :</strong> Certaines fonctionnalités de personnalisation seront désactivées.
                </Typography>
              </Alert>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 1, mt: 2, overflowX: 'auto' }}>
          {/* Roue de la Fortune - Sélectionnée */}
          <Card
            variant={jeuSelectionne === "roulette" ? "outlined" : undefined}
            sx={{
              border: jeuSelectionne === "roulette" ? '3px solid #2A3B8F' : '1px solid #e0e0e0',
              opacity: selectionDesactivee ? 0.5 : 1,
              transition: 'border 0.2s',
              background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
              height: 280, 
              display: 'flex',
              flexDirection: 'column',
              minWidth: 'calc(25% - 6px)', 
              flex: '1 1 0%'
            }}
          >
            <CardActionArea
              disabled={selectionDesactivee}
              onClick={() => setJeuSelectionne("roulette")}
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardContent sx={{ textAlign: 'center', p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" fontWeight={700} color="#2A3B8F" sx={{ mb: 1 }}>
                  ROUE DE LA FORTUNE
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="#2A3B8F">★★★</Typography>
                </Box>
                
                {/* Image de la roue */}
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img 
                    src={wheel} 
                    alt="Roue de la Fortune" 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%', 
                      objectFit: 'contain',
                      borderRadius: 8
                    }} 
                  />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>

          {/* Les Boîtes Mystères */}
          <Card
            variant={jeuSelectionne === "boites" ? "outlined" : undefined}
            sx={{
              border: jeuSelectionne === "boites" ? '3px solid #2A3B8F' : '1px solid #e0e0e0',
              opacity: selectionDesactivee ? 0.5 : 1,
              transition: 'border 0.2s', background: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)', height: 280, 
              display: 'flex',
              flexDirection: 'column',
              minWidth: 'calc(25% - 6px)', 
              flex: '1 1 0%'
            }}
          >
            <CardActionArea
              disabled={selectionDesactivee}
              onClick={() => setJeuSelectionne("boites")}
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardContent sx={{ textAlign: 'center', p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" fontWeight={700} color="#FF9800" sx={{ mb: 1 }}>
                  LES BOÎTES MYSTÈRES
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="#FF9800">★★★</Typography>
                </Box>
                
                {/* Image des boîtes mystères */}
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img 
                    src={mystery} 
                    alt="Boîtes Mystères" 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%', 
                      objectFit: 'contain',
                      borderRadius: 8
                    }} 
                  />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>

          {/* Machine à Sous */}
          <Card
            variant={jeuSelectionne === "machine" ? "outlined" : undefined}
            sx={{
              border: jeuSelectionne === "machine" ? '3px solid #2A3B8F' : '1px solid #e0e0e0',
              opacity: selectionDesactivee ? 0.5 : 1,
              transition: 'border 0.2s',
              background: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)',
              height: 280, 
              display: 'flex',
              flexDirection: 'column',
              minWidth: 'calc(25% - 6px)', 
              flex: '1 1 0%'
            }}
          >
            <CardActionArea
              disabled={selectionDesactivee}
              onClick={() => setJeuSelectionne("machine")}
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardContent sx={{ textAlign: 'center', p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" fontWeight={700} color="#9C27B0" sx={{ mb: 1 }}>
                  MACHINE À SOUS
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="#9C27B0">★★★</Typography>
                </Box>
                
                {/* Image de la machine à sous */}
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img 
                    src={slot} 
                    alt="Machine à Sous" 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%', 
                      objectFit: 'contain',
                      borderRadius: 8
                    }} 
                  />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>

          {/* Jeu de Cartes */}
          <Card
            variant={jeuSelectionne === "cartes" ? "outlined" : undefined}
            sx={{
              border: jeuSelectionne === "cartes" ? '3px solid #2A3B8F' : '1px solid #e0e0e0',
              opacity: selectionDesactivee ? 0.5 : 1,
              transition: 'border 0.2s',
              background: 'linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 100%)',
              height: 280, 
              display: 'flex',
              flexDirection: 'column',
              minWidth: 'calc(25% - 6px)', 
              flex: '1 1 0%'
            }}
          >
            <CardActionArea
              disabled={selectionDesactivee}
              onClick={() => setJeuSelectionne("cartes")}
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardContent sx={{ textAlign: 'center', p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" fontWeight={700} color="#2A3B8F" sx={{ mb: 1 }}>
                  JEU DE CARTES
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="#2A3B8F">★★★</Typography>
                </Box>
                
                {/* Image du jeu de cartes */}
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img 
                    src={card} 
                    alt="Jeu de Cartes" 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%', 
                      objectFit: 'contain',
                      borderRadius: 8
                    }} 
                  />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
        </>
      )}
    </Box>
  );
}

export default ChoixJeu; 