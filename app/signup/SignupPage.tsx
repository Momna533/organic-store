"use client";

import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();
  const [signupData, setSignupData] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful");
        setSignupData({ name: "", email: "", password: "" });
        router.replace("/");
      } else {
        alert(data.message || "Failed to signup");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to signup");
    }
  };
  return (
    <form
      //   action={handleSignup}
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center border-transparent p-6 rounded-md shadow-2xl gap-4 w-96"
    >
      <h1 className="text-2xl text-[#6a9739]">Signup</h1>
      <div className="flex flex-col gap-2 w-full">
        <label className="flex flex-col gap-1 text-sm">
          Name:
          <input
            type="text"
            name="name"
            className="border rounded-md p-[6px]"
            onChange={handleChange}
            value={signupData.name}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Email:
          <input
            type="email"
            name="email"
            className="border rounded-md p-[6px]"
            onChange={handleChange}
            value={signupData.email}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Password:
          <input
            type="password"
            name="password"
            className="border rounded-md p-[6px]"
            onChange={handleChange}
            value={signupData.password}
          />
        </label>
      </div>
      <p className="w-full text-sm">
        Already have an account?{" "}
        <a href="/login" className="text-[#6a9739] capitalize">
          login
        </a>
      </p>
      <Button />
    </form>
  );
};

export default SignupPage;
