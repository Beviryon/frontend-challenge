
import { useState } from 'react';
import { Box, Button, Typography, Stack, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import CloseIcon from '@mui/icons-material/Close';
import ellipse from "../assets/ellipse.svg";
import stars from "../assets/stars.svg";

// Composant pour l'en-tête de la page Ma Campagne
function HeaderCampagne() {
  const [openPinModal, setOpenPinModal] = useState(false);
  const [openQrModal, setOpenQrModal] = useState(false);
  const [pinCode, setPinCode] = useState('1234');

  const handleOpenPinModal = () => setOpenPinModal(true);
  const handleClosePinModal = () => setOpenPinModal(false);
  const handleOpenQrModal = () => setOpenQrModal(true);
  const handleCloseQrModal = () => setOpenQrModal(false);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 2px 8px rgba(44, 62, 80, 0.07)",
        mb: 5,
        p: "32px 40px 24px 40px",
        minHeight: 120,
        position: "relative",
      }}
    >
      {/* Bloc titre avec ellipse et étoiles */}
      <Box sx={{ position: "relative", minWidth: 320, minHeight: 60, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        {/* Ellipse SVG*/}
        <img
          src={ellipse}
          alt=""
          style={{
            position: "absolute",
            left: -10,
            top: -5,
            width: 280,
            zIndex: 1,
            pointerEvents: "none",
            transform: "rotate(-5deg)",
          }}
        />
        <Typography variant="h2" fontWeight={800} color="#2A3B8F"
          sx={{ letterSpacing: "-2px", position: "relative", zIndex: 2, fontSize: 38, textAlign: 'left', pl: 1 }}
        >Ma Campagne</Typography>

        {/* Étoiles*/}
        <img src={stars} alt="Etoil" style={{position: "absolute", left: 240, top: 40, width: 42, zIndex: 2, pointerEvents: "none", transform: 'rotate(-9deg)',}}
        />
      </Box>

      {/* Bloc boutons + date */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", minWidth: 320 }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
          <Button
            variant="outlined"
            onClick={handleOpenPinModal}
            sx={{
              color: "#2A3B8F",
              borderColor: "#2A3B8F",
              fontWeight: 700,
              px: 2,
              py: 0.5,
              borderRadius: 2,
              fontSize: 15,
              minWidth: 110,
              height: 36,
              borderLeft: '6px solid #5C27C0',
              textTransform: 'none',
              justifyContent: 'flex-start',
            }}
          >
            Mon Code PIN
          </Button>
          <Button
            variant="outlined"
            onClick={handleOpenQrModal}
            sx={{
              color: "#FF9800",
              borderColor: "#FF9800",
              fontWeight: 700,
              px: 2,
              py: 0.5,
              borderRadius: 2,
              fontSize: 15,
              minWidth: 110,
              height: 36,
              textTransform: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
            startIcon={<QrCode2Icon sx={{ fontSize: 20, color: '#FF9800' }} />}
          >
            QR Code
          </Button>
          <Button variant="contained" sx={{ background: "#2A3B8F", fontWeight: 700, px: 2, py: 0.5, borderRadius: 2, fontSize: 15, minWidth: 110, height: 36, boxShadow: "none", "&:hover": { background: "#1a255c" }, textTransform: 'none' }}>
            SAUVEGARDER
          </Button>
          {/* Bouton menu ... */}
          <IconButton sx={{ ml: 1, border: '1px solid #E0E0E0', borderRadius: 2, width: 36, height: 36 }}>
            <MoreHorizIcon />
          </IconButton>
        </Stack>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: 14, textAlign: 'right', mr: 1 }}>
            Disponible jusqu'au 10 déc. 2025
          </Typography>
          {/* Trait bleu après la date */}
          <Box sx={{ width: 8, height: 12, bgcolor: '#2A3B8F', borderRadius: 2 }} />
        </Box>
      </Box>

      {/* Modale Code PIN */}
      <Dialog 
        open={openPinModal} 
        onClose={handleClosePinModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: 1,
          borderBottom: '1px solid #e0e0e0'
        }}>
          <Typography variant="h6" fontWeight={600} color="#2A3B8F">
            Mon Code PIN
          </Typography>
          <IconButton onClick={handleClosePinModal} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Alert severity="info" sx={{ mb: 3 }}>
            Ce code PIN permet à vos clients de récupérer leurs gains en boutique.
          </Alert>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Code PIN actuel :
            </Typography>
            <TextField
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: 18,
                  textAlign: 'center',
                  letterSpacing: '0.5em'
                }
              }}
              inputProps={{
                maxLength: 4,
                style: { textAlign: 'center' }
              }}
            />
            <Typography variant="caption" color="text.secondary">
              Le code PIN doit contenir 4 chiffres.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button 
            onClick={handleClosePinModal}
            variant="outlined"
            sx={{ 
              color: '#666', 
              borderColor: '#ccc',
              textTransform: 'none'
            }}
          >
            Annuler
          </Button>
          <Button 
            onClick={handleClosePinModal}
            variant="contained"
            sx={{ 
              background: '#2A3B8F',
              textTransform: 'none',
              '&:hover': { background: '#1a255c' }
            }}
          >
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modale QR Code */}
      <Dialog 
        open={openQrModal} 
        onClose={handleCloseQrModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: 1,
          borderBottom: '1px solid #e0e0e0'
        }}>
          <Typography variant="h6" fontWeight={600} color="#FF9800">
            QR Code de la Campagne
          </Typography>
          <IconButton onClick={handleCloseQrModal} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Alert severity="info" sx={{ mb: 3 }}>
            Ce QR Code permet à vos clients d'accéder directement à votre jeu de campagne.
          </Alert>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: 3,
            py: 2
          }}>
            {/* Placeholder pour le QR Code */}
            <Box sx={{
              width: 200,
              height: 200,
              border: '2px dashed #ccc',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f9f9f9'
            }}>
              <QrCode2Icon sx={{ fontSize: 80, color: '#ccc' }} />
            </Box>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              QR Code généré automatiquement pour votre campagne
            </Typography>
            <Typography variant="caption" color="text.secondary" textAlign="center">
              Les clients peuvent scanner ce code pour accéder au jeu
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button 
            onClick={handleCloseQrModal}
            variant="outlined"
            sx={{ 
              color: '#666', 
              borderColor: '#ccc',
              textTransform: 'none'
            }}
          >
            Fermer
          </Button>
          <Button 
            onClick={handleCloseQrModal}
            variant="contained"
            sx={{ 
              background: '#FF9800',
              textTransform: 'none',
              '&:hover': { background: '#f57c00' }
            }}
          >
            Télécharger
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default HeaderCampagne; 