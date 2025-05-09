"use client";

import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex p-10 justify-between">
      <h1>DragonMap</h1>
      <Link href={"/auth/register"} className="btn btn-primary">register</Link>
    </div>
  );
};

export default Navbar;
