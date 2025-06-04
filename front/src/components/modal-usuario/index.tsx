
import { useTranslation } from "react-i18next";

interface Intolerancia {
  id: number;
  nombre: string;
}

interface Props {
  open: boolean;
  nombreUsuario: string;
  intolerancia: string | Intolerancia;
  onClose: () => void;
  onCambiar: () => void;
  onSeguir: () => void;
}

export const ModalEleccionIntolerancia: React.FC<Props> = ({
  open,
  nombreUsuario,
  intolerancia,
  onClose,
  onCambiar,
  onSeguir,
}) => {
  const { t } = useTranslation();

const intoleranciaMostrar = intolerancia || "N/A";
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-perfil">
        <h2>{t("greeting", { nombreUsuario })}</h2>
        <p>{t("question", { intolerancia: intoleranciaMostrar })}</p>

        <div className="modal-buttons">
          <button onClick={onSeguir}>{t("continue")}</button>
          <button onClick={onCambiar}>{t("change")}</button>
          <button onClick={onClose}>{t("cancel")}</button>
        </div>
      </div>
    </div>
  );
};
