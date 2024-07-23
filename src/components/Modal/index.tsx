import React from "react";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import "./Modal.scss";

interface IModal {
  title?: string;
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<IModal> = ({
  title,
  isOpen,
  onClose,
  children,
}) => {
  const overlayRef = React.useRef<HTMLDivElement>(null);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (overlayRef.current && event.target === overlayRef.current) {
      onClose();
    }
  };

  return isOpen ? (
    <div className="modal">
      <div
        className="modal-overlay"
        ref={overlayRef}
        onClick={handleOverlayClick}
      />
      <div className="modal-box">
        <div className="modal-close-btn" onClick={onClose}>
          <CloseIcon />
        </div>
        <div className="modal-title">{title}</div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  ) : null;
};
