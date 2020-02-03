import React, { useRef } from "react";

export const title = "Modal title";
export const footer = <button>ok</button>;

const Modal = ({ title, children, footer, show, close }) => {
  const overlay = useRef();
  const modal = useRef();

  const handleClose = () => {
    overlay.current.classList.remove("active");
    modal.current.classList.remove("active");
  };

  return (
    <>
      <div
        className={show ? "overlay active" : "overlay"}
        ref={overlay}
        onClick={() => close()}
      ></div>
      <div className={show ? "modal active" : "modal"} ref={modal}>
        <div className="modal__header">
          <div className="modal__header--title">{title}</div>
          <div className="modal__header--close" onClick={() => close()}></div>
        </div>
        <div className="modal__content">{children}</div>
        <div className="modal__footer">{footer}</div>
      </div>
    </>
  );
};

export default Modal;
