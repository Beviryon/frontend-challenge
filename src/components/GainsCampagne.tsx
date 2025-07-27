import { useState } from 'react';
import {Box, Typography, Button, Switch, TableContainer,
  Table, TableHead, TableBody, TableRow, TableCell,
  Paper, IconButton
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import InfoIcon from '@mui/icons-material/Info';
import { useFormContext } from 'react-hook-form';
import type { Gift } from '../../doc/CampaignType';

interface GainsCampagneProps {
  giftsFieldArray: {
    fields: Gift[];
    append: (gift: Gift) => void;
    remove: (index: number) => void;
    update: (index: number, gift: Gift) => void;
  };
}

// Composant pour configurer les gains de la campagne
function GainsCampagne({ giftsFieldArray }: GainsCampagneProps) {
  const { fields, append, remove, update } = giftsFieldArray;
  const { watch, setValue } = useFormContext();
  const [sectionOuverte, setSectionOuverte] = useState(true);
  
  // Surveiller la valeur du switch 100% gagnant
  const is100PercentWinning = watch('configuration.disabled') === false;

  // Fonction pour ajouter un nouveau gain
  const ajouterGain = () => {
    const nouveauGain: Gift = {
      id: Date.now().toString(),
      name: "Nouveau gain",
      icon: "🎁",
      type: "EAT",
      initial_limit: 1,
      limit: 1
    };
    append(nouveauGain);
  };

  // Fonction pour supprimer un gain
  const supprimerGain = (index: number) => {
    const gift = fields[index];
    // Empêcher la suppression du gain "Perdu" (il est géré automatiquement)
    if (gift.type === 'LOSS') {
      alert('Le gain "Perdu" ne peut pas être supprimé manuellement. Il est géré automatiquement selon le mode de jeu.');
      return;
    }
    remove(index);
  };

  // Fonction pour basculer l'état illimité
  const toggleIllimite = (index: number) => {
    const gift = fields[index];
    const updatedGift: Gift = {
      ...gift,
      initial_limit: gift.initial_limit === -1 ? 1 : -1,
      limit: gift.limit === -1 ? 1 : -1
    };
    update(index, updatedGift);
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
                  <Switch 
                    checked={is100PercentWinning} 
                    onChange={(e) => setValue('configuration.disabled', !e.target.checked)} 
                    sx={{'& .MuiSwitch-switchBase.Mui-checked': {color: '#2A3B8F'}, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {backgroundColor: '#2A3B8F'}}} 
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.4, textAlign: 'left' }}>
                  Cochez cette option pour garantir un gain à chaque joueur. Si vous la<br />
                  décochez, une case Perdu sera automatiquement ajoutée au jeu.
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Boutons d'action près du tableau */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 3, gap: 2 }}>
            <Button
              variant="contained"
              endIcon={<ConfirmationNumberIcon />}
              sx={{
                background: '#FF9800',
                color: '#fff',
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                '&:hover': { background: '#f57c00' }
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
              + Ajouter un gain +
            </Button>
          </Box>

          {/* Tableau des gains */}
          <TableContainer component={Paper} sx={{ mb: 3, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 600, borderBottom: '2px solid #e0e0e0' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <InfoIcon sx={{ color: '#2A3B8F', fontSize: 16 }} />
                      Nom du Gain
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, borderBottom: '2px solid #e0e0e0' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <InfoIcon sx={{ color: '#2A3B8F', fontSize: 16 }} />
                      Catégorie
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, borderBottom: '2px solid #e0e0e0' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <InfoIcon sx={{ color: '#2A3B8F', fontSize: 16 }} />
                      Nombre de stock
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, borderBottom: '2px solid #e0e0e0' }}>Illimité</TableCell>
                  <TableCell sx={{ fontWeight: 600, borderBottom: '2px solid #e0e0e0' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fields.map((gift, index) => (
                  <TableRow key={gift.id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                    <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ 
                          width: 40, 
                          height: 40, 
                          backgroundColor: gift.type === 'LOSS' ? '#f44336' : '#2A3B8F', 
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '20px'
                        }}>
                          {gift.icon}
                        </Box>
                        <Box>
                          <Typography variant="body1" fontWeight={600}>
                            {gift.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Gain par défaut
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography>{gift.type === 'EAT' ? 'Nourriture' : gift.type === 'DISCOUNT' ? 'Tirage au sort' : gift.type}</Typography>
                        {gift.type === 'DISCOUNT' && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 1 }}>
                            <ConfirmationNumberIcon sx={{ color: '#2A3B8F', fontSize: 16 }} />
                            <Typography variant="caption" color="text.secondary">Jusqu'au 10 déc. 2024</Typography>
                          </Box>
                        )}
                        <KeyboardArrowDownIcon sx={{ color: '#2A3B8F', fontSize: 16 }} />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography>{gift.limit === -1 ? 'Illimité' : gift.limit}</Typography>
                        <Switch 
                          checked={gift.limit === -1} 
                          onChange={() => toggleIllimite(index)}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {color: '#2A3B8F'},
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {backgroundColor: '#2A3B8F'}
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>
                      <Typography>{gift.limit === -1 ? 'Illimité' : 'Limité'}</Typography>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>
                      <IconButton
                        onClick={() => supprimerGain(index)}
                        sx={{
                          color: '#f44336',
                          '&:hover': {
                            backgroundColor: 'rgba(244, 67, 54, 0.04)'
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>


        </>
      )}
    </Box>
  );
}

export default GainsCampagne; 