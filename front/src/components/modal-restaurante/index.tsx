// components/YelpInfoModal.tsx
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, CircularProgress } from "@mui/material";

export interface YelpData {
  name: string;
 
  image_url: string;
  location: { address1: string };
  url: string;
}

interface YelpInfoModalProps {
  open: boolean;
  onClose: () => void;
  data: YelpData | null;
  loading: boolean;
}

export default function YelpInfoModal({ open, onClose, data, loading }: YelpInfoModalProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{data?.name || "Cargando..."}</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : data ? (
          <>
            <img src={data.image_url} alt={data.name} style={{ width: "100%", borderRadius: 8 }} />
            <Typography variant="body1">
              <strong>Dirección:</strong> {data.location.address1}
            </Typography>
            <Button href={data.url} target="_blank">
              Ver en Yelp
            </Button>
          </>
        ) : (
          <Typography>Error al cargar los datos de Yelp.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
