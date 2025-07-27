import { Button, Box, Typography } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';

// Composant pour afficher l'alerte du code PIN non configuré
function AlerteCodePin() {
  return (
    <Box sx={{ my: 3 }}>
      {/* On affiche une alerte jaune si le code PIN n'est pas configuré */}
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFF8E1', border: '1px solidrgb(254, 205, 56)', borderRadius: 3, p: 3, boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
        {/* Icône et texte à gauche */}
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          {/* Icône de cadenas */}
          <Box
            sx={{width: 48, height: 48, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 3, boxShadow: '0 2px 8px rgba(173, 173, 173, 0.3)'}}
          >
            <LockIcon sx={{ color: '#FFB800', fontSize: 24 }} />
          </Box>
          
          {/* Texte de l'alerte */}
          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5, color: '#000' }}>
              Votre Code PIN n'est pas configuré
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Activez-le pour sécuriser la récupération des cadeaux par vos clients.
            </Typography>
          </Box>
        </Box>

        {/* Bouton à droite */}
        <Button
          variant="contained"
          sx={{background: '#FF9800', color: '#fff', fontWeight: 700, px: 3, py: 1.5, borderRadius: 2, textTransform: 'uppercase', fontSize: 14, minWidth: 180, '&:hover': { background: '#F57C00' }}}
        >
          CONFIGURER MON CODE
        </Button>
      </Box>
    </Box>
  );
}

export default AlerteCodePin; 