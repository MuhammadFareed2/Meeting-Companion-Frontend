import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IMAGES } from "../constant/images.ts";

export default function Navbar() {
  const location = useLocation();

  return (
    <>
      <nav className="flex items-center justify-start md:justify-between px-2 md:px-6 py-2 w-full font-['Poppins'] border-b-[1px] border-slate-300 ">
        <h1 className="text-slate-800 md:text-2xl text-lg font-semibold capitalize">
          {location.pathname.slice(1) || "Dashboard"}
        </h1>

        <div className="flex items-center justify-between gap-1 py-0 px-0 md:py-2 md:px-4 rounded-full">
          <div className="flex items-center">
            <div className="w-8 flex justify-center">
              <img className="w-5" src={IMAGES.NotificationIcon} />
            </div>
            <div className="w-8 flex justify-center">
              <img className="w-5" src={IMAGES.InfoIcon} />
            </div>
          </div>
          <div className="h-8 w-8 rounded-full text-white text-lg bg-lime-400 flex items-center justify-center">
            P
          </div>
        </div>
      </nav>
    </>
  );
}
