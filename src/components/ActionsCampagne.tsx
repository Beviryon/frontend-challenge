
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from "@mui/material";
import DraggableActions from "./DraggableActions";
import type { Action } from "../../doc/CampaignType";

interface ActionsCampagneProps {
  actionsFieldArray: {
    fields: Action[];
    append: (action: Action) => void;
    remove: (index: number) => void;
    update: (index: number, action: Action) => void;
  };
}

// Composant pour organiser les actions de la campagne
function ActionsCampagne({ actionsFieldArray }: ActionsCampagneProps) {
  const { fields, append } = actionsFieldArray;

  // Fonction pour ajouter une nouvelle action
  const ajouterAction = () => {
    const nouvelleAction: Action = {
      id: Date.now().toString(),
      priority: fields.length + 1,
      target: "Nouvelle action",
      type: "GOOGLE_REVIEW"
    };
    append(nouvelleAction);
  };

  // Fonction pour supprimer une action
  const supprimerAction = (id: string) => {
    const index = fields.findIndex((field: Action) => field.id === id);
    if (index !== -1) {
      actionsFieldArray.remove(index);
    }
  };

  // Fonction pour mettre à jour les actions après drag & drop
  const handleActionsChange = (newActions: Action[]) => {
    // Mettre à jour les champs avec les nouvelles actions
    newActions.forEach((action, index) => {
      actionsFieldArray.update(index, action);
    });
  };

  return (
    <Box sx={{ my: 4, p: 3, background: '#fff', borderRadius: 2, boxShadow: 1 }}>
      {/* En-tête de la section avec titre et bouton */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          {/* Titre avec barre bleue */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
            <Box sx={{ width: 4, height: 48, bgcolor: '#2A3B8F', borderRadius: 2, mr: 2, mt: 0.5 }} />
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

      {/* Tableau des actions avec drag & drop */}
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
            <DraggableActions
              actions={fields}
              onActionsChange={handleActionsChange}
              onDeleteAction={supprimerAction}
            />
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