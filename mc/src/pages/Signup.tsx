import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../validation/signupSchema";
import type { SignupSchema } from "../validation/signupSchema";
import { useSignupStore } from "../store/useSignupStore";
import { sendSignupOtp } from "../APIs";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const navigate = useNavigate();

  const { setUsername, setEmail, setPassword } = useSignupStore();
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data: SignupSchema) => {
    const name = `${data.firstName.trim()} ${data.lastName.trim()}`;
    setUsername(name);
    setEmail(data.email);
    setPassword(data.password);
    setErrorMsg("");

    try {
      const obj = {
        email: data.email,
      };
      const res = await sendSignupOtp(obj);
      if (res.success == true) {
        navigate("/auth/signup-otp");
      } else {
        setUsername("");
        setEmail("");
        setPassword("");
        setErrorMsg("Email already exists.");
      }
    } catch (err: any) {
      setUsername("");
      setEmail("");
      setPassword("");
      setErrorMsg("Can't create account.");
    }
  };

  return (
    <>
      <main className="flex w-screen h-screen font-['Poppins']">
        <section className="w-[50%] h-full flex items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[470px] shadow rounded-3xl flex flex-col items-center gap-[10px] py-16 px-14"
          >
            <h1 className="font-semibold text-2xl text-slate-800">
              Create an account.
            </h1>
            <div className="flex flex-col items-center justify-center gap-[10px] h-full w-full">
              <div className="flex gap-3 w-full">
                <div className="w-full">
                  <span className="text-xs text-slate-400">First Name</span>
                  <input
                    {...register("firstName")}
                    className="px-3 py-2 h-fit text-sm w-full border border-slate-300 outline-none rounded-md"
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <span className="text-xs text-slate-400">Last Name</span>
                  <input
                    {...register("lastName")}
                    className="px-3 py-2 h-fit text-sm w-full border border-slate-300 outline-none rounded-md"
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full">
                <span className="text-xs text-slate-400">Email</span>
                <input
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
              </div>

              <div className="w-full">
                <span className="text-xs text-slate-400">Confirm Password</span>
                <input
                  type="password"
                  {...register("confirmPassword")}
                  className="px-3 py-2 h-fit text-sm w-full border border-slate-300 outline-none rounded-md"
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn-bg text-white p-2 w-full h-fit rounded-md cursor-pointer font-semibold text-sm "
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loading..." : "Signup"}
              </button>

              {errorMsg != "" && (
                <p className="text-xs text-red-500">{errorMsg}</p>
              )}

              <div className="w-full flex items-center gap-3 text-slate-400">
                <span className="block w-full h-[1px] bg-slate-300"></span>
                OR
                <span className="block w-full h-[1px] bg-slate-300"></span>
              </div>

              <div className="text-xs text-slate-800">
                Already have an account?{" "}
                <Link className="text-blue-500" to="/auth/signin">
                  Signin now
                </Link>
              </div>
            </div>
          </form>
        </section>
        <section className="w-[50%] h-full signup-bg rounded-l-[6rem]"></section>
      </main>
    </>
  );
}
