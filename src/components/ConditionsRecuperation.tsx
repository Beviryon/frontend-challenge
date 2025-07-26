import React, { useState } from "react";
import { Box, Typography, Switch, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

// Composant pour définir les conditions de récupération des cadeaux
function ConditionsRecuperation() {
  // On simule la liste des gains (normalement à synchroniser avec le vrai tableau des gains)
  const gains = [
    { id: 1, nom: "Frite" },
    { id: 2, nom: "Sac Jacquemus" },
  ];

  // Etat pour les interrupteurs
  const [pourTous, setPourTous] = useState(true); // "Pas de condition" activé par défaut
  const [sousCondition, setSousCondition] = useState(false);
  const [montantMin, setMontantMin] = useState(10);

  // Etat pour les conditions personnalisées par gain
  const [conditions, setConditions] = useState([
    { gainId: 1, condition: "Aucune" },
    { gainId: 2, condition: "Achat minimum de 10€" },
  ]);

  // Fonction pour modifier une condition (exemple simple)
  const modifierCondition = (gainId: number) => {
    const nouvelleCondition = prompt("Nouvelle condition pour ce gain :", "Achat minimum de 10€");
    if (nouvelleCondition) {
      setConditions(conditions.map(c => c.gainId === gainId ? { ...c, condition: nouvelleCondition } : c));
    }
  };

  return (
    <Box sx={{ my: 4, p: 3, background: '#fff', borderRadius: 2, boxShadow: 1 }}>
      {/* Titre de la section */}
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        DÉFINISSEZ LES CONDITIONS POUR RÉCUPÉRER LES CADEAUX
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Paramétrez si vos clients doivent remplir une condition (ex : montant minimum d'achat) pour pouvoir repartir avec leur cadeau.
      </Typography>

      {/* Interrupteurs globaux */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {/* Interrupteur "Pas de condition" */}
        <Switch
          checked={pourTous}
          onChange={() => {
            setPourTous(!pourTous);
            if (!pourTous) setSousCondition(false); // Si on active "Pas de condition", on désactive l'autre
          }}
        />
        <Typography variant="body2" sx={{ mr: 4 }}>
          Pas de condition
        </Typography>
        {/* Interrupteur "Sous condition d'achat minimale" */}
        <Switch
          checked={sousCondition}
          onChange={() => {
            setSousCondition(!sousCondition);
            if (!sousCondition) setPourTous(false); // Si on active la condition, on désactive "Pas de condition"
          }}
        />
        <Typography variant="body2">
          Sous condition d'achat minimale
        </Typography>
      </Box>

      {/* Champ de saisie conditionnel */}
      {sousCondition && (
        <TextField
          label="Montant minimum d'achat (€)"
          type="number"
          value={montantMin}
          onChange={e => setMontantMin(Number(e.target.value))}
          sx={{ mb: 3 }}
        />
      )}

      {/* Tableau des conditions personnalisées par gain */}
      <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
        Conditions personnalisées par gain
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Gain</TableCell>
              <TableCell>Condition</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gains.map(gain => {
              const cond = conditions.find(c => c.gainId === gain.id);
              return (
                <TableRow key={gain.id}>
                  <TableCell>{gain.nom}</TableCell>
                  <TableCell>{cond ? cond.condition : "Aucune"}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => modifierCondition(gain.id)}>
                      {cond ? "Modifier" : "Ajouter une condition"}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ConditionsRecuperation; 