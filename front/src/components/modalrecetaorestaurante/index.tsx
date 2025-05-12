import { useTranslation } from "react-i18next";
import ModalBase from "../modal-sele";
//modal para ir a receta o restaurnates
interface Props {
  open: boolean;
  onClose: () => void;
  onRecetasClick: () => void;
  onRestaurantesClick: () => void;
}


export default function ModalElegirRoR({ open, onClose, onRecetasClick, onRestaurantesClick }: Props) {
   const { t } = useTranslation();
  return (
    <ModalBase
      open={open}
      onClose={onClose}
      title={t("what_would_see")}
      actions={[
        { label: t("seeRecipes"), onClick: onRecetasClick },
        { label: t("seeRestaurants"), onClick: onRestaurantesClick }
      ]}
    />
  );
}
