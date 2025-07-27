import React, { useState } from 'react';
import {Box, Typography, Button, Switch, TableContainer,
  Table, TableHead, TableBody, TableRow, TableCell,
  Paper, IconButton, FormControl, Select, MenuItem
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import RedeemIcon from '@mui/icons-material/Redeem';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

// Données JSON des gains comme mentionné dans le README
const gainsData = [
  {
    id: 1,
    nom: "Frite",
    icone: "",
    categorie: "Nourriture",
    stock: 15,
    illimite: false,
    gainParDefaut: false
  },
  {
    id: 2,
    nom: "Sac Jacquemus",
    icone: "",
    categorie: "Tirage au sort",
    stock: 0,
    illimite: true,
    gainParDefaut: true,
    dateLimite: "Jusqu'au 10 déc. 2004"
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
      icone: "",
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
          sx={{color: '#2A3B8F', transform: sectionOuverte ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.3s'}}>
          <KeyboardArrowUpIcon />
        </IconButton>
      </Box>

      {/* Contenu de la section (masqué si accordéon fermé) */}
      {sectionOuverte && (
        <>
          {/* Section Jeu 100% Gagnant */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
              {/* Barre orange devant le titre */}
              <Box sx={{ width: 4, height: 20, bgcolor: '#FF9800', borderRadius: 2, mr: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" fontWeight={600} sx={{ mr: 2, color: '#000' }}>
                    Jeu 100% Gagnant
                  </Typography>
                  <Switch checked={jeu100Gagnant} onChange={(e) => setJeu100Gagnant(e.target.checked)} sx={{'& .MuiSwitch-switchBase.Mui-checked': {color: '#2A3B8F'}, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {backgroundColor: '#2A3B8F'}}} />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.4, textAlign: 'left' }}>
                  Cochez cette option pour garantir un gain à chaque joueur. Si vous la<br />
                  décochez, une case Perdu sera automatiquement ajoutée au jeu.
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Boutons d'action */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 3 }}>
            <Button variant="contained" endIcon={<ConfirmationNumberIcon sx={{ color: 'white' }} />} disabled
              sx={{background: '#FF9800 !important', color: '#fff !important', fontWeight: 600, px: 3, py: 1,borderRadius: 2, textTransform: 'none', opacity: 0.7,
                '&:hover': { background: '#F57C00 !important' },
                '&.Mui-disabled': {background: '#FF9800 !important', color: '#fff !important', opacity: 0.7
                }
              }}
            >
              Lancer le tirage au sort
            </Button>
            <Button variant="contained" startIcon={<AddIcon />} onClick={ajouterGain}
              sx={{background: '#2A3B8F', color: '#fff', fontWeight: 600, px: 3, py: 1, borderRadius: 2, textTransform: 'none', '&:hover': { background: '#1a255c' }}}>
              Ajouter un gain + </Button>
          </Box>

          {/* Tableau des gains */}
          <Box sx={{ position: 'relative' }}>
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0', borderRadius: 2, overflow: 'hidden' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: '#2A3B8F', borderBottom: '2px solid #e0e0e0', borderRight: '1px solid #e0e0e0', width: '35%' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        Nom du Gain
                        <InfoIcon sx={{ fontSize: 14, color: '#2A3B8F' }} />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#2A3B8F', borderBottom: '2px solid #e0e0e0', borderRight: '1px solid #e0e0e0', width: '40%' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        Catégorie
                        <InfoIcon sx={{ fontSize: 14, color: '#2A3B8F' }} />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#2A3B8F', borderBottom: '2px solid #e0e0e0', width: '25%' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        Nombre de stock
                        <InfoIcon sx={{ fontSize: 14, color: '#2A3B8F' }} />
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {gains.map((gain) => (
                    <TableRow key={gain.id} sx={{ 
                      '&:hover': { background: '#f8f9fa' },
                      borderBottom: '1px solid #e0e0e0'
                    }}>
                      <TableCell sx={{ borderRight: '1px solid #e0e0e0' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {/* Icône bleue */}
                          <Box sx={{color: '#2A3B8F', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            {gain.nom === "Frite" ? (
                              <RestaurantIcon sx={{ fontSize: 20, color: '#2A3B8F' }} />
                            ) : gain.nom === "Sac Jacquemus" ? (
                              <ShoppingBagIcon sx={{ fontSize: 20, color: '#2A3B8F' }} />
                            ) : (
                              <RedeemIcon sx={{ fontSize: 20, color: '#2A3B8F' }} />
                            )}
                          </Box>
                          <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                              <Typography variant="body2" fontWeight={500}>
                                {gain.nom}
                              </Typography>
                              {gain.gainParDefaut && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <RedeemIcon sx={{ fontSize: 14, color: '#999' }} />
                                  <Typography variant="caption" color="#999">
                                    Gain par défaut
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ borderRight: '1px solid #e0e0e0' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <FormControl size="small" sx={{ minWidth: 120 }}>
                            <Select value={gain.categorie} displayEmpty IconComponent={KeyboardArrowDownIcon}
                              sx={{
                                '& .MuiSelect-select': { py: 0.5, px: 1, fontSize: '14px' },
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
                              <CalendarTodayIcon sx={{ fontSize: 14, color: '#999' }} />
                              <Typography variant="caption" color="#999">
                                {gain.dateLimite}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ borderRight: '1px solid #e0e0e0' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          {gain.illimite ? (
                            <Typography variant="body2" color="#999" fontWeight={500}>
                              Illimité
                            </Typography>
                          ) : (
                            <Typography variant="body2">
                              {gain.stock}
                            </Typography>
                          )}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="body2" color="#666">
                              Illimité
                            </Typography>
                            <Switch checked={gain.illimite} onChange={() => toggleIllimite(gain.id)} size="small" />
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* Ligne pour ajouter un gain supplémentaire */}
                  <TableRow>
                    <TableCell colSpan={3} sx={{ border: 'none', pt: 2 }}>
                      <Button variant="text" startIcon={<AddIcon sx={{ fontSize: 16 }} />}onClick={ajouterGain}
                        sx={{color: '#2A3B8F', textTransform: 'none', fontSize: 14, pl: 0, minWidth: 'auto', '&:hover': { background: 'rgba(42, 59, 143, 0.04)' }}}>
                        Ajouter un {gains.length + 1 === 3 ? 'Troisième' : gains.length + 1 === 4 ? 'Quatrième' : `${gains.length + 1}e`} Gain
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* Icônes de suppression positionnées hors du tableau */}
            {gains.map((gain, index) => (
              <IconButton 
                key={`delete-${gain.id}`}
                size="small" 
                onClick={() => supprimerGain(gain.id)}
                sx={{ position: 'absolute', right: -25, top: 75 + (index * 56), color: '#666', zIndex: 1 }}
              >
                <DeleteIcon sx={{ fontSize: 20 }} />
              </IconButton>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

export default GainsCampagne; 