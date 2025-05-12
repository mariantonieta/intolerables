import { useTranslation } from "react-i18next";
import ModalBase from "../modal-sele";
import "../modal-sele/index.css"
//modal para saber si quieres registrarte o loguearte
interface Props {
  open: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export default function ModalRoL({
  open,
  onClose,
  onLoginClick,
  onRegisterClick,
}: Props) {
  const { t } = useTranslation();
  return (

    <ModalBase
      open={open}
      onClose={onClose}
      title={t("loginOrRegister")}
      actions={[
        {
          label: t("login"),
          onClick: onLoginClick,
          variant: "contained",
        },
        { label: t("register"), onClick: onRegisterClick },
      ]}
    />
  );
}
