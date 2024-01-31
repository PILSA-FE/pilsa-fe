import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div className={styles.overlayStyle} />
      <div className={styles.modalStyle}>
        <button onClick={onClose}>모달 닫기</button>
        {children}
      </div>
    </>,
    document.getElementById("global-modal") as HTMLElement
  );
};

export default Modal;
