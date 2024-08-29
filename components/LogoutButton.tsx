"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const LogoutButton: React.FC = () => {
  const router = useRouter();
  const handleLogout = () => {
    const deleteCookie = (name: string) => {
      document.cookie = `${name}=; path=/; max-age=0; ${
        process.env.NODE_ENV === "production" ? "SameSite=Strict; Secure" : ""
      }`;
    };
    deleteCookie("token");
    router.replace("/login");
  };

  return <button onClick={handleLogout}>logout</button>;
};

export default LogoutButton;
