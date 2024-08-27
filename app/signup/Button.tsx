"use client";

import React from "react";
import { useFormStatus } from "react-dom";

const Button = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-[#6a9739] hover:bg-[#8bc34a] transition-all text-[#ffffff] border-transparent rounded-md py-2 px-8 capitalize"
    >
      {pending ? "submitting" : "submit"}
    </button>
  );
};

export default Button;
