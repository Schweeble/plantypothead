import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface AddToCartDialogProps {
  open: boolean;
  onClose: () => void;
  productName: string;
  onAddAnother: () => void;
}

export default function AddToCartDialog({
  open,
  onClose,
  productName,
  onAddAnother,
}: AddToCartDialogProps) {
  const router = useRouter();

  const handleGoToCart = () => {
    router.push("/cart");
    onClose();
  };

  const handleAddAnother = () => {
    onAddAnother();
    // Keep dialog open to show confirmation of additional item
  };

  const handleContinueShopping = () => {
    router.push("/store");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Typography>Item Added to Cart</Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            color: "success.main",
          }}
        >
          <CheckCircleOutlineIcon sx={{ mr: 1 }} />
          <Typography>
            <strong>{productName}</strong> has been added to your cart.
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          What would you like to do next?
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          p: 2,
          pt: 0,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1,
        }}
      >
        <Button
          onClick={handleContinueShopping}
          color="primary"
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Continue Shopping
        </Button>
        <Button
          onClick={handleAddAnother}
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Add Another
        </Button>
        <Button
          onClick={handleGoToCart}
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartIcon />}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Go to Cart
        </Button>
      </DialogActions>
    </Dialog>
  );
}
