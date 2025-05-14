"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [name, setName] = useState(null);
  const { push } = useRouter();

  useEffect(() => {
    // localStorage hanya tersedia di client (browser)
    const storedName = localStorage.getItem("name");
    if (storedName) setName(storedName);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    push("/auth/login");
  };

  return (
    <nav className="flex p-10 justify-between items-center" role="navigation" aria-label="Navigasi utama">
      <h1 className="text-green-400 font-semibold text-2xl">Story API</h1>
      {name ? (
        <div className="flex items-center gap-3">
          <p className="text-xl" aria-label="Nama pengguna saat ini">{name}</p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-green-400 text-white"
            aria-label="Keluar dari akun"
          >
            Keluar
          </button>
        </div>
      ) : (
        <Link
          href="/auth/register"
          className="px-4 py-2 bg-green-400 text-white"
          aria-label="Daftar atau Masuk"
        >
          Daftar / Masuk
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
