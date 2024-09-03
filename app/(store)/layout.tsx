import Header from "@/components/Header";
import { cookies } from "next/headers";
import React from "react";

const Layout = ({ children }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

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
