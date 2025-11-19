import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSignupStore } from "../store/useSignupStore";
import { signupUser } from "../APIs";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function SignupOtp() {
  const { username, email, password, setEmail, setPassword, setUsername } =
    useSignupStore();

  const [errMsg, setErrMsg] = useState("");

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      otp: ["", "", "", "", "", ""],
    },
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const navigate = useNavigate();

  const { setIsAuthenticated } = useAuthStore();

  const onSubmit = async (data: any) => {
    const otpCode = data.otp.join("");
    const obj = {
      username,
      email,
      password,
      otp: otpCode,
    };

    setErrMsg("");
    try {
      const res = await signupUser(obj);
      if (res.success == true) {
        setEmail("");
        setPassword("");
        setUsername("");
        localStorage.setItem("token", res.token);
        setIsAuthenticated(true);
        navigate("/dashboard");
      } else if (res.success == false) {
        setErrMsg("Incorrect OTP.");
      }
    } catch (err) {
      setErrMsg("Can't create account.");
    }
  };

  return (
    <main className="flex w-screen h-screen font-['Poppins']">
      <section className="w-[50%] h-full flex items-center justify-center">
        <form
          className="w-[470px] shadow rounded-3xl flex flex-col items-center gap-[10px] py-16 px-14"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="font-semibold text-2xl text-slate-800">
            Enter OTP Code
          </h1>

          <div className="flex flex-col items-center justify-center gap-[10px] h-full w-full">
            <div className="flex justify-between gap-4">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <Controller
                  key={i}
                  control={control}
                  name={`otp.${i}`}
                  render={({ field }) => (
                    <input
                      {...field}
                      ref={(el) => {
                        inputRefs.current[i] = el;
                      }}
                      maxLength={1}
                      className="h-10 w-10 border border-slate-300 rounded-xl text-center outline-none"
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/, "");
                        field.onChange(value);
                        if (value && i < 5) inputRefs.current[i + 1]?.focus();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !field.value && i > 0) {
                          inputRefs.current[i - 1]?.focus();
                        }
                      }}
                    />
                  )}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-bg text-white p-2 w-full h-fit rounded-md font-semibold text-sm mt-4 transition ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Verifying..." : "Verify OTP"}
            </button>
            {errMsg != "" && <p className="text-xs text-red-500">{errMsg}</p>}
          </div>
        </form>
      </section>

      <section className="w-[50%] h-full signup-bg rounded-l-[6rem]"></section>
    </main>
  );
}
