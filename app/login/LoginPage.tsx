"use client";

import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

const setTokenCookie = (token) => {
  document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; ${
    process.env.NODE_ENV === "production" ? "SameSite=Strict; Secure" : ""
  }`;
};

const LoginPage = () => {
  const { pending } = useFormStatus();
  const router = useRouter();
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();
      if (res.ok) {
        setTokenCookie(data.token);
        // alert("Login successful");
        setLoginData({ email: "", password: "" });
        router.replace("/");
      } else {
        console.log(data.message);

        // alert(data.message || "Failed to login");
      }
    } catch (error) {
      console.error(error);
      // alert("Failed to login");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center border-transparent p-6 rounded-md shadow-2xl gap-4 w-96"
    >
      <h1 className="text-2xl text-[#6a9739]">Login</h1>
      <div className="flex flex-col gap-2 w-full">
        <label className="flex flex-col gap-1 text-sm">
          Email:
          <input
            type="email"
            name="email"
            className="border rounded-md p-[6px]"
            onChange={handleChange}
            value={loginData.email}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Password:
          <input
            type="password"
            name="password"
            className="border rounded-md p-[6px]"
            onChange={handleChange}
            value={loginData.password}
          />
        </label>
      </div>
      <p className="w-full text-sm">
        Don’t have an account?{" "}
        <a href="/signup" className="text-[#6a9739] capitalize">
          Sign up
        </a>
      </p>
      <button
        type="submit"
        disabled={pending}
        className="bg-[#6a9739] hover:bg-[#8bc34a] transition-all text-[#ffffff] border-transparent rounded-md py-2 px-8 capitalize"
      >
        {pending ? "submitting" : "submit"}
      </button>
    </form>
  );
};

export default LoginPage;
