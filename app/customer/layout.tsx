import React from "react";
import { Nav, Navlink } from "../components/Nav";
// export const dynamic = "force-dynamic";
export default function CustomerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Nav>
        <Navlink href="/">Home</Navlink>
        <Navlink href="/products">Products</Navlink>
        <Navlink href="/orders">My orders</Navlink>
      </Nav>
      <div className="container my-6 mx-auto">{children}</div>
    </>
  );
}
