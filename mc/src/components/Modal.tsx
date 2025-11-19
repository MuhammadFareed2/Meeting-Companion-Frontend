import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 font-['Poppins']">
      <div className="bg-white rounded-xl shadow-lg">{children}</div>
    </div>,
    document.getElementById("modal-root")!
  );
}
