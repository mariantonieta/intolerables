import ModalBase from "../modal-sele";


interface Props {
  open: boolean;
  onClose: () => void;
  onRecetasClick: () => void;
  onRestaurantesClick: () => void;
}

export default function ModalElegirRoR({ open, onClose, onRecetasClick, onRestaurantesClick }: Props) {
  return (
    <ModalBase
      open={open}
      onClose={onClose}
      title="¿Qué te gustaría ver?"
      actions={[
        { label: "Ver Recetas", onClick: onRecetasClick },
        { label: "Ver Restaurantes", onClick: onRestaurantesClick }
      ]}
    />
  );
}
