import ModalBase from "../modal-sele";


interface Props {
  open: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export default function ModalRoL({ open, onClose, onLoginClick, onRegisterClick }: Props) {
  return (
    <ModalBase
      open={open}
      onClose={onClose}
      title="¿Ya eres usuario o quieres registrarte?"
      actions={[
        { label: "Iniciar Sesión", onClick: onLoginClick, variant: "contained" },
        { label: "Registrarse", onClick: onRegisterClick }
      ]}
    />
  );
}
