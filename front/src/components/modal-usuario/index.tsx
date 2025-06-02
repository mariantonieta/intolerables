import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  nombreUsuario: string;
  intolerancia: string | { id: number; nombre: string };
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
  if (!open) return null;

  const intoleranciaMostrar =
    typeof intolerancia === "string" ? intolerancia : intolerancia.nombre;

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
