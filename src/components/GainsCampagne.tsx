import React, { useState } from "react";
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, IconButton, Select, MenuItem, FormControl } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import CasinoIcon from '@mui/icons-material/Casino';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Données JSON des gains comme mentionné dans le README
const gainsData = [
  {
    id: 1,
    nom: "Frite",
    icone: "🍟",
    categorie: "Nourriture",
    stock: 15,
    illimite: false,
    gainParDefaut: false
  },
  {
    id: 2,
    nom: "Sac Jacquemus",
    icone: "👜",
    categorie: "Tirage au sort",
    stock: 0,
    illimite: true,
    gainParDefaut: true,
    dateLimite: "Jusqu'au 10 déc. 2024"
  }
];

// Composant pour configurer les gains de la campagne
function GainsCampagne() {
  const [gains, setGains] = useState(gainsData);
  const [jeu100Gagnant, setJeu100Gagnant] = useState(false);
  const [sectionOuverte, setSectionOuverte] = useState(true);

  // Fonction pour ajouter un nouveau gain
  const ajouterGain = () => {
    const nouveauGain = {
      id: Date.now(),
      nom: "Nouveau gain",
      icone: "🎁",
      categorie: "Nourriture",
      stock: 1,
      illimite: false,
      gainParDefaut: false
    };
    setGains([...gains, nouveauGain]);
  };

  // Fonction pour supprimer un gain
  const supprimerGain = (id: number) => {
    setGains(gains.filter(gain => gain.id !== id));
  };

  // Fonction pour basculer l'état illimité
  const toggleIllimite = (id: number) => {
    setGains(gains.map(gain => 
      gain.id === id ? { ...gain, illimite: !gain.illimite } : gain
    ));
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
                AJOUTEZ ET CONFIGUREZ VOS GAINS
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.4, textAlign: 'left' }}>
                Indiquez les récompenses que vos clients pourront gagner. Offrez des cadeaux attractifs pour augmenter<br />
                leur engagement et leur fidélité.
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
          {/* Section Jeu 100% Gagnant */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              {/* Barre orange devant le titre */}
              <Box sx={{ width: 4, height: 20, bgcolor: '#FF9800', borderRadius: 2, mr: 2 }} />
              <Typography variant="body1" fontWeight={600} sx={{ mr: 2 }}>
                Jeu 100% Gagnant
              </Typography>
              <Switch
                checked={jeu100Gagnant}
                onChange={(e) => setJeu100Gagnant(e.target.checked)}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#2A3B8F',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#2A3B8F',
                  },
                }}
              />
            </Box>
            <Typography variant="caption" sx={{ color: '#666', display: 'block', ml: 4 }}>
              Cochez cette option pour garantir un gain à chaque joueur. Si vous la<br />
              décochez, une case Perdu sera automatiquement ajoutée au jeu.
            </Typography>
          </Box>

          {/* Boutons d'action */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 3 }}>
            <Button
              variant="outlined"
              startIcon={<CasinoIcon />}
              sx={{
                color: '#FF9800',
                borderColor: '#FF9800',
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                '&:hover': { borderColor: '#F57C00', backgroundColor: 'rgba(255, 152, 0, 0.04)' }
              }}
            >
              Lancer le tirage au sort
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={ajouterGain}
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
            >
              Ajouter un gain +
            </Button>
          </Box>

          {/* Tableau des gains */}
          <Box sx={{ position: 'relative' }}>
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: '#f8f9fa' }}>
                    <TableCell sx={{ fontWeight: 600, color: '#2A3B8F' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        Nom du Gain
                        <InfoIcon sx={{ fontSize: 14, color: '#666' }} />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#2A3B8F' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        Catégorie
                        <InfoIcon sx={{ fontSize: 14, color: '#666' }} />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#2A3B8F' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        Nombre de stock
                        <InfoIcon sx={{ fontSize: 14, color: '#666' }} />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#2A3B8F' }}>Illimité</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {gains.map((gain, index) => (
                    <TableRow key={gain.id} sx={{ '&:hover': { background: '#f8f9fa' } }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {/* Icône dans un carré bleu */}
                          <Box sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '4px',
                            background: '#2A3B8F',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontSize: 12,
                            fontWeight: 'bold'
                          }}>
                            {gain.nom === "Frite" ? "🍟" : gain.nom === "Sac Jacquemus" ? "👜" : "🎁"}
                          </Box>
                          <Box>
                            <Typography variant="body2" fontWeight={500}>
                              {gain.nom}
                            </Typography>
                            {gain.gainParDefaut && (
                              <Typography variant="caption" color="#666">
                                Gain par défaut
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <FormControl size="small" sx={{ minWidth: 120 }}>
                            <Select
                              value={gain.categorie}
                              displayEmpty
                              IconComponent={KeyboardArrowDownIcon}
                              sx={{
                                '& .MuiSelect-select': { 
                                  py: 0.5,
                                  px: 1,
                                  fontSize: '14px'
                                },
                                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                '& .MuiSelect-icon': { color: '#666', fontSize: 16 }
                              }}
                            >
                              <MenuItem value="Nourriture">Nourriture</MenuItem>
                              <MenuItem value="Tirage au sort">Tirage au sort</MenuItem>
                              <MenuItem value="Réduction">Réduction</MenuItem>
                              <MenuItem value="Cadeau">Cadeau</MenuItem>
                            </Select>
                          </FormControl>
                          {gain.dateLimite && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <CalendarTodayIcon sx={{ fontSize: 14, color: '#666' }} />
                              <Typography variant="caption" color="#666">
                                {gain.dateLimite}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        {gain.illimite ? (
                          <Typography variant="body2" color="#2A3B8F" fontWeight={500}>
                            Illimité
                          </Typography>
                        ) : (
                          <Typography variant="body2">
                            {gain.stock}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={gain.illimite}
                          onChange={() => toggleIllimite(gain.id)}
                          size="small"
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: '#2A3B8F',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: '#2A3B8F',
                            },
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Icônes de suppression positionnées hors du tableau */}
            {gains.map((gain, index) => (
              <IconButton 
                key={`delete-${gain.id}`}
                size="small" 
                onClick={() => supprimerGain(gain.id)}
                sx={{ 
                  position: 'absolute',
                  right: -50, // Plus à droite
                  top: 56 + (index * 56), // 56px pour le header + 56px par ligne
                  color: '#666',
                  zIndex: 1
                }}
              >
                <DeleteIcon sx={{ fontSize: 18 }} />
              </IconButton>
            ))}
          </Box>

          {/* Lien pour ajouter un gain supplémentaire */}
          <Box sx={{ mt: 2, textAlign: 'left' }}>
            <Button
              variant="text"
              startIcon={<AddIcon />}
              onClick={ajouterGain}
              sx={{
                color: '#2A3B8F',
                textTransform: 'none',
                fontSize: 14,
                pl: 0,
                '&:hover': { background: 'rgba(42, 59, 143, 0.04)' }
              }}
            >
              Ajouter un {gains.length + 1 === 3 ? 'Troisième' : gains.length + 1 === 4 ? 'Quatrième' : `${gains.length + 1}e`} Gain
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default GainsCampagne; 