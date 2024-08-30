"use client";

import React, { ChangeEvent, FormEvent } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

interface SignupData {
  name: string;
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const { pending } = useFormStatus();
  const router = useRouter();
  const [signupData, setSignupData] = React.useState<SignupData>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      if (res.ok) {
        setSignupData({ name: "", email: "", password: "" });
        router.replace("/login");
      } else {
        const data = await res.json();
        console.log(data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center p-6 border-transparent rounded-md shadow-2xl gap-4 w-96"
      aria-labelledby="signup-form"
    >
      <h1 id="signup-form" className="text-2xl text-[#6a9739]">
        Signup
      </h1>
      <div className="flex flex-col gap-2 w-full">
        <label className="flex flex-col gap-1 text-sm">
          Name:
          <input
            type="text"
            name="name"
            className="border rounded-md p-[6px]"
            onChange={handleChange}
            value={signupData.name}
            aria-label="Name"
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
            aria-label="Email"
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
            aria-label="Password"
          />
        </label>
      </div>
      <p className="w-full text-sm">
        Already have an account?{" "}
        <a href="/login" className="text-[#6a9739] capitalize">
          Login
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

export default SignupPage;
