import React, { useState } from "react";
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip, Alert } from "@mui/material";

// Données JSON des actions comme mentionné dans le README
const actionsData = [
  {
    id: 1,
    ordre: "Première action",
    nom: "Avis Google",
    icone: "G", // Icône Google stylisée
    cible: "https://google.com/fr",
    statut: "Intégré",
    type: "google"
  },
  {
    id: 2,
    ordre: "Deuxième action", 
    nom: "Ajouter une Deuxième action",
    icone: "+",
    cible: "",
    statut: "",
    type: "ajouter"
  },
  {
    id: 3,
    ordre: "Dernière action",
    nom: "Parrainage (Par défaut)",
    icone: "👥", // Icône de personnes
    cible: "Modifier",
    lienInfo: "En savoir plus",
    type: "parrainage"
  }
];

// Composant pour organiser les actions de la campagne
function ActionsCampagne() {
  const [actions, setActions] = useState(actionsData);

  // Fonction pour ajouter une nouvelle action
  const ajouterAction = () => {
    const nouvelleAction = {
      id: Date.now(),
      ordre: "Nouvelle action",
      nom: "Nouvelle action",
      icone: "+",
      cible: "",
      statut: "",
      type: "nouvelle"
    };
    setActions([...actions, nouvelleAction]);
  };

  // Fonction pour supprimer une action
  const supprimerAction = (id: number) => {
    setActions(actions.filter(action => action.id !== id));
  };

  return (
    <Box sx={{ my: 4, p: 3, boxShadow: 1 }}>
      {/* En-tête de la section avec titre et bouton */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          {/* Titre avec barre bleue */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
            <Box sx={{ width: 9, height: 78, bgcolor: '#2A3B8F', borderRadius: 0, mr: 2, mt: 0.5 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant="h6" fontWeight={700} color="#000" sx={{ mb: 0.5, textAlign: 'left' }}>
                ORGANISEZ VOS ACTIONS
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.4, textAlign: 'left' }}>
                Définissez l'ordre et les actions à réaliser par vos clients pour maximiser<br />
                l'engagement.
              </Typography>
            </Box>
          </Box>
        </Box>
        
        {/* Bouton Ajouter une action */}
        <Button
          variant="contained"
          sx={{
            background: '#2A3B8F',
            color: '#fff',
            fontWeight: 600,
            px: 2,
            py: 1,
            borderRadius: 2,
            textTransform: 'none',
            '&:hover': { background: '#1a255c' }
          }}
          onClick={ajouterAction}
        >
          + Ajouter une action
        </Button>
      </Box>

      {/* Tableau des actions */}
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: '#f8f9fa' }}>
              <TableCell sx={{ fontWeight: 600, color: '#2A3B8F' }}>Ordre des actions</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#2A3B8F' }}>Action</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#2A3B8F' }}>Cible</TableCell>
              <TableCell sx={{ width: 60 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {actions.map((action) => (
              <TableRow key={action.id} sx={{ '&:hover': { background: '#f8f9fa' } }}>
                <TableCell sx={{ fontWeight: 500 }}>
                  {action.ordre}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* Icône selon le type d'action */}
                    {action.type === 'google' && (
                      <Box sx={{ 
                        width: 24, 
                        height: 24, 
                        borderRadius: '50%', 
                        background: '#4285F4', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: 12,
                        fontWeight: 'bold'
                      }}>
                        G
                      </Box>
                    )}
                    {action.type === 'ajouter' && (
                      <Box sx={{ 
                        width: 24, 
                        height: 24, 
                        borderRadius: '50%', 
                        border: '2px solid #ccc', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: '#666'
                      }}>
                        +
                      </Box>
                    )}
                    {action.type === 'parrainage' && (
                      <Box sx={{ fontSize: 20 }}>
                        👥
                      </Box>
                    )}
                    <Typography>{action.nom}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {action.cible && action.cible !== "Modifier" && (
                      <Typography variant="body2" color="text.secondary">
                        {action.cible}
                      </Typography>
                    )}
                    {action.statut && (
                      <Chip 
                        label={action.statut} 
                        color="success" 
                        size="small" 
                        sx={{ height: 20, fontSize: 11 }}
                      />
                    )}
                    {action.type === 'parrainage' && (
                      <>
                        <Typography 
                          variant="body2" 
                          sx={{ color: '#2A3B8F', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                          {action.cible}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ color: '#666', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 0.5 }}
                        >
                          {action.lienInfo} ℹ️
                        </Typography>
                      </>
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  {/* Bouton supprimer (pas pour parrainage) */}
                  {action.type !== 'parrainage' && (
                    <IconButton 
                      size="small" 
                      onClick={() => supprimerAction(action.id)}
                      sx={{ color: '#666' }}
                    >
                      🗑️
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Alerte en bas */}
      <Alert 
        severity="warning" 
        icon={false}
        sx={{ 
          mt: 3, 
          background: '#FFF8E1', 
          border: '1px solid #FFECB3',
          '& .MuiAlert-message': { color: '#000' }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ fontSize: 16 }}>⚠️</Box>
          <Typography variant="body2">
            Une seule action = une seule participation : Vos clients ne peuvent jouer qu'une seule fois et vous ne proposez qu'une seule action.
          </Typography>
        </Box>
      </Alert>
    </Box>
  );
}

export default ActionsCampagne; 