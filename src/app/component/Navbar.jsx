"use client";

import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex p-10 justify-between">
      <h1>DragonMap</h1>
      <Link href={"/login"} className="btn btn-primary">Login</Link>
    </div>
  );
};

export default Navbar;
