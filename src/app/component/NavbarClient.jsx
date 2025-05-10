"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "./Navbar";

const NavbarClient = () => {
  const path = usePathname();
  const disablepath = ["/auth/login", "/auth/register"];
  return <div>{disablepath.includes(path) ? null : <Navbar />}</div>;
};

export default NavbarClient;
