"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const LogoutButton: React.FC = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  return <button onClick={handleLogout}>logout</button>;
};

export default LogoutButton;
