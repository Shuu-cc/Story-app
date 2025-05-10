"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const name = localStorage.getItem("name");
  const { push } = useRouter();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    push("/auth/login");
  };

  return (
    <div className="flex p-10 justify-between">
      <h1 className="text-green-400 font-semibold text-2xl">Story API</h1>
      {name ? (
        <div className="flex items-center gap-3">
          <p className="text-xl">{name}</p>
          <Link href="/auth/logout" onClick={handleLogout} className="px-4 py-2 bg-green-400 text-white">
            keluar
          </Link>
        </div>
      ) : (
        <Link href={"/auth/register"} className="px-4 py-2 bg-green-400 text-white ">
          Daftar / Masuk
        </Link>
      )}
    </div>
  );
};

export default Navbar;
