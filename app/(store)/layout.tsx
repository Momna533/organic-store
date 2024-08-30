"use client";

import Header from "@/components/Header";
import React, { useEffect, useState } from "react";

const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return undefined;
};

const Layout = ({ children }) => {
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    setToken(getCookie("token"));
  }, []);

  if (!token) {
    return <h1>No token present</h1>;
  }

  return (
    <div>
      <Header />
      <div className="bg-[#f8f6f3]">{children}</div>
      <div>footer</div>
    </div>
  );
};

export default Layout;
