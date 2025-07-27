
import { Box, Button, Typography, Stack, IconButton } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import ellipse from "../assets/ellipse.svg";
import stars from "../assets/stars.svg";

// Composant pour l'en-tête de la page Ma Campagne
function HeaderCampagne() {
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
    </Box>
  );
}

export default HeaderCampagne; 