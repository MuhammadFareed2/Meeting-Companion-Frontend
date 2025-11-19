import React from "react";
import ReactDOM from "react-dom";

interface LoaderProps {
  children: React.ReactNode;
}

export default function Loader() {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 font-['Poppins']">
      <h1>LOADING</h1>
    </div>,
    document.getElementById("loader-root")!
  );
}
