import React, { useState } from "react";
import { IMAGES } from "../constant/images.ts";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <>
      <button
        className="md:hidden flex items-center justify-center text-white z-10 h-10 w-10 rounded-md bg-green-900 absolute top-2 right-2"
        onClick={() => setNavOpen(!navOpen)}
      >
        H
      </button>
      <aside
        className={`h-screen absolute md:sticky top-0 py-4 md:flex ${
          navOpen ? "flex" : "hidden"
        } flex-col gap-5 font-['Poppins'] bg-slate-900 md:w-[64px] w-[200px] group hover:w-[200px] transition-all duration-300 ease-in-out`}
      >
        {/* <div className=" bg-slate-900 h-screen w-[64px] absolute  group-hover:w-[200px] transition-all duration-300 ease-in-out left-0 top-0"> */}
        <div className="flex items-center gap-3">
          <img src={IMAGES.Logo} className="w-8" />
        </div>
        <ul className="pt-5 flex flex-col gap-1 border-t-[1px] border-slate-400">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `py-3 px-5 flex gap-5 items-center text-xs ${
                isActive && "border-r-4 border-green-400 bg-slate-800"
              }`
            }
          >
            <img className="w-5 nav-icon" src={IMAGES.HomeIcon} />
            <p className="text-white text-nowrap group-hover:flex flex md:hidden">
              Home
            </p>
          </NavLink>

          <NavLink
            to="/upload-meeting"
            className={({ isActive }) =>
              `py-3 px-5 flex gap-5 items-center text-xs  ${
                isActive && "border-r-4 border-green-400 bg-slate-800"
              }`
            }
          >
            <img className="w-5 nav-icon" src={IMAGES.UploadIcon} />
            <p className="text-white text-nowrap group-hover:flex flex md:hidden">
              Upload Meeting
            </p>
          </NavLink>
        </ul>

        <ul className="pt-5 flex flex-col gap-1 border-t-[1px] border-slate-400">
          <NavLink
            to="/zoom-meeting"
            className={({ isActive }) =>
              `py-3 px-5 flex gap-5 items-center text-xs ${
                isActive && "border-r-4 border-green-400 bg-slate-800"
              }`
            }
          >
            <img className="w-5 nav-icon" src={IMAGES.ZoomIcon} />
            <p className="text-white text-nowrap group-hover:flex flex md:hidden">
              Zoom
            </p>
          </NavLink>
        </ul>

        <ul className="pt-5 flex flex-col gap-1 border-t-[1px] border-slate-400">
          <li className="py-3 px-5 flex gap-5 items-center text-xs">
            <img className="w-5 nav-icon" src={IMAGES.LogoutIcon} />
          </li>
        </ul>
        {/* </div> */}
      </aside>
    </>
  );
}
