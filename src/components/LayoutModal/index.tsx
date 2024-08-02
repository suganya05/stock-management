import React from "react";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import "./LayoutModal.scss";

interface ILayoutModule {
  children: React.ReactNode;
  className?: string;
  handleToggle: () => void;
}

const LayoutModule: React.FC<ILayoutModule> = ({
  children,
  handleToggle,
  className,
}) => {
  return (
    <div className="mx">
      <div className="product-detail">
        <div className="modal-overlay" onClick={handleToggle} />
        <div className={`product-detail-wrap ${className}`}>
          <div className="close-btn" onClick={handleToggle}>
            <CloseIcon />
          </div>
          <div className="layout-module-children">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default LayoutModule;
