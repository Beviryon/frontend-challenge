import { useState } from 'react';
import {Box, Typography, Switch, TextField, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Conditions } from '../../doc/CampaignType';

interface ConditionsRecuperationProps {
  conditionsFieldArray: {
    fields: Conditions[];
    append: (condition: Conditions) => void;
    remove: (index: number) => void;
    update: (index: number, condition: Conditions) => void;
  };
  noConditions: boolean;
  purchaseCondition: boolean;
  minimumPurchaseAmount: string;
  onNoConditionsChange: (value: boolean) => void;
  onPurchaseConditionChange: (value: boolean) => void;
  onMinimumPurchaseAmountChange: (value: string) => void;
}

// Composant pour définir les conditions de récupération
function ConditionsRecuperation({ 
  conditionsFieldArray, 
  noConditions, 
  purchaseCondition, 
  minimumPurchaseAmount,
  onNoConditionsChange,
  onPurchaseConditionChange,
  onMinimumPurchaseAmountChange
}: ConditionsRecuperationProps) {
  const { fields, remove, update } = conditionsFieldArray;
  const [sectionOuverte, setSectionOuverte] = useState(true);

  // Fonction pour ajouter une condition
  const ajouterCondition = (index: number) => {
    const condition = fields[index];
    const newCondition: Conditions = {
      ...condition,
      value: "Achat minimum de 5€"
    };
    update(index, newCondition);
  };

  // Fonction pour modifier une condition
  const modifierCondition = (index: number) => {
    // Logique pour modifier une condition
    console.log('Modifier condition pour gain:', index);
  };

  // Fonction pour supprimer une condition
  const supprimerCondition = (index: number) => {
    remove(index);
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
                DÉFINISSEZ LES CONDITIONS POUR RÉCUPÉRER LES CADEAUX
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.4, textAlign: 'left' }}>
                Paramétrez si vos clients doivent remplir une condition (ex: montant minimum d'achat) pour pouvoir<br />
                repartir avec leur cadeau.
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
          {/* Section "Pas de condition" */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              {/* Barre grise devant le titre */}
              <Box sx={{ width: 4, height: 20, bgcolor: '#ccc', borderRadius: 2, mr: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '400px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', mb: 1 }}>
                  <Typography variant="h6" fontWeight={600} sx={{ color: '#000' }}>
                    Pas de condition
                  </Typography>
                  <Switch
                    checked={noConditions}
                    onChange={(e) => onNoConditionsChange(e.target.checked)}
                    sx={{'& .MuiSwitch-switchBase.Mui-checked': {color: '#666'}, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {backgroundColor: '#666'}}}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.4, textAlign: 'left' }}>
                  Les clients peuvent récupérer leur gain sans aucun achat.
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Section "Sous condition d'achat minimale" */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              {/* Barre orange devant le titre */}
              <Box sx={{ width: 4, height: 20, bgcolor: '#FF9800', borderRadius: 2, mr: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '400px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', mb: 1 }}>
                  <Typography variant="h6" fontWeight={600} sx={{ color: '#000' }}>
                    Sous condition d'achat minimale
                  </Typography>
                  <Switch
                    checked={purchaseCondition}
                    onChange={(e) => onPurchaseConditionChange(e.target.checked)}
                    sx={{'& .MuiSwitch-switchBase.Mui-checked': {color: '#FF9800'}, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {backgroundColor: '#FF9800'}}}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.4, textAlign: 'left', mb: 2 }}>
                  Exigez un montant minimum d'achat en boutique pour permettre la récupération du gain.
                </Typography>
                <TextField 
                  label="Montant à atteindre" 
                  value={minimumPurchaseAmount} 
                  onChange={(e) => onMinimumPurchaseAmountChange(e.target.value)} 
                  placeholder="Ex: 10€ d'achat minimum pour récupérer le gain" 
                  size="small"
                  sx={{
                    width: '100%', 
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1, 
                      '& fieldset': {borderColor: '#e0e0e0'}
                    },
                    '& .MuiInputBase-input': {
                      '&::placeholder': {color: 'gray', opacity: 0.5, fontStyle: 'italic'},
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Section "Conditions personnalisées par gain" */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
              <Typography variant="h6" fontWeight={600} sx={{ color: '#000', mb: 1 }}>
                Conditions personnalisées par gain
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.4, textAlign: 'left' }}>
                Vous pouvez définir une condition spécifique sur un ou plusieurs gains.
              </Typography>
            </Box>

            {/* Tableau des conditions */}
            <Box sx={{ position: 'relative' }}>
              <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0', borderRadius: 2, overflow: 'hidden' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: '#2A3B8F', borderBottom: '2px solid #e0e0e0', borderRight: '1px solid #e0e0e0', width: '30%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          Gain
                          <InfoIcon sx={{ fontSize: 14, color: '#2A3B8F' }} />
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#2A3B8F', borderBottom: '2px solid #e0e0e0', borderRight: '1px solid #e0e0e0', width: '40%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          Condition
                          <InfoIcon sx={{ fontSize: 14, color: '#2A3B8F' }} />
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#2A3B8F', borderBottom: '2px solid #e0e0e0', width: '30%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          Action
                          <InfoIcon sx={{ fontSize: 14, color: '#2A3B8F' }} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fields.map((condition, index) => (
                      <TableRow key={condition.id} sx={{ 
                        '&:hover': { background: '#f8f9fa' },
                        borderBottom: '1px solid #e0e0e0'
                      }}>
                        <TableCell sx={{ borderRight: '1px solid #e0e0e0' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ 
                              width: 40, 
                              height: 40, 
                              backgroundColor: '#2A3B8F', 
                              borderRadius: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: '20px'
                            }}>
                              🎁
                            </Box>
                            <Typography variant="body2" fontWeight={500}>
                              {condition.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ borderRight: '1px solid #e0e0e0' }}>
                          <Typography variant="body2" color={condition.value === "Aucune" ? "#999" : "#000"}>
                            {condition.value}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {condition.value === "Aucune" ? (
                              <Button variant="text"
                                startIcon={<AddIcon sx={{ fontSize: 16 }} />}
                                onClick={() => ajouterCondition(index)}
                                sx={{color: '#2A3B8F', textTransform: 'none', fontSize: 14, pl: 0, minWidth: 'auto', '&:hover': { background: 'rgba(42, 59, 143, 0.04)' }}}>
                                Ajouter une condition
                              </Button>
                            ) : (
                              <>
                                <Button variant="text"
                                  startIcon={<EditIcon sx={{ fontSize: 16 }} />}
                                  onClick={() => modifierCondition(index)}
                                  sx={{color: '#2A3B8F', textTransform: 'none', fontSize: 14, pl: 0, minWidth: 'auto', '&:hover': { background: 'rgba(42, 59, 143, 0.04)' }}}>
                                  Modifier
                                </Button>
                                <IconButton size="small" onClick={() => supprimerCondition(index)} sx={{ color: '#666' }}>
                                  <DeleteIcon sx={{ fontSize: 18 }} />
                                </IconButton>
                              </>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}

export default ConditionsRecuperation; 