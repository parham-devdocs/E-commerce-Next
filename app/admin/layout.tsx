import React from "react";
import { Nav, Navlink } from "../components/Nav";

export default function AdminLayout({children}:Readonly<{children:React.ReactNode}>) {
    return (
      <>
        <Nav>
          <Navlink href="/">Dashboard</Navlink>
          <Navlink href="/admin/products">Products</Navlink>
          <Navlink href="/admin/users">Customers</Navlink>
          <Navlink href="/admin/orders">Sales</Navlink>
        </Nav>
        <div className="container my-6">{children}</div>
      </>
    );
}