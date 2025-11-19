import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "../validation/signinSchema";
import type { SigninSchema } from "../validation/signinSchema";
import { signinUser } from "../APIs";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, // <- Include isSubmitting
  } = useForm<SigninSchema>({
    resolver: zodResolver(signinSchema),
  });

  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");

  const { setIsAuthenticated } = useAuthStore();

  const onSubmit = async (data: SigninSchema) => {
    try {
      setErrMsg("");
      const obj = {
        email: data.email,
        password: data.password,
      };
      console.log(obj);
      const res = await signinUser(obj);
      if (res.success == true) {
        localStorage.setItem("token", res.token);
        setIsAuthenticated(true);
        navigate("/dashboard");
      } else if (res.success == false) {
        setErrMsg("Incorrect password");
      }
    } catch (err) {
      setErrMsg("Can't login.");
    }
  };

  return (
    <main className="flex w-screen h-screen font-['Poppins']">
      <section className="w-[50%] h-full signup-bg rounded-r-[6rem]"></section>
      <section className="w-[50%] h-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[470px] shadow rounded-3xl flex flex-col items-center gap-[10px] py-16 px-14"
        >
          <h1 className="font-semibold text-2xl text-slate-800">
            Login to your account
          </h1>
          <div className="flex flex-col items-center justify-center gap-[10px] h-full w-full">
            <div className="w-full">
              <span className="text-xs text-slate-400">Email</span>
              <input
                type="email"
                {...register("email")}
                className="px-3 py-2 h-fit text-sm w-full border border-slate-300 outline-none rounded-md"
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="w-full">
              <span className="text-xs text-slate-400">Password</span>
              <input
                type="password"
                {...register("password")}
                className="px-3 py-2 h-fit text-sm w-full border border-slate-300 outline-none rounded-md"
              />
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
              <div className="text-xs text-blue-500 text-right mt-[10px]">
                <Link to="#">Forgot pasword</Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-bg text-white p-2 w-full h-fit rounded-md font-semibold text-sm transition-opacity duration-200 ${
                isSubmitting
                  ? "opacity-60 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              {isSubmitting ? "Loading..." : "Signin"}
            </button>

            {errMsg != "" && <p className="text-xs text-red-500">{errMsg}</p>}

            <div className="w-full flex items-center gap-3 text-slate-400">
              <span className="block w-full h-[1px] bg-slate-300"></span>
              OR
              <span className="block w-full h-[1px] bg-slate-300"></span>
            </div>

            <div className="text-xs text-slate-800">
              Don't have an account?{" "}
              <Link className="text-blue-500" to="/auth/signup">
                Signup now
              </Link>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
