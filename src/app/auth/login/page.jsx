"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { push } = useRouter();
  const [error, setError] = useState("");

  const handlelogin = async (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;

    try {
      const res = await fetch("https://story-api.dicoding.dev/v1/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const responData = await res.json();
      if (res.ok) {
        const token = responData.loginResult.token;
        const name = responData.loginResult.name;
        const userID = responData.loginResult.userId;

        localStorage.setItem("token", token);
        localStorage.setItem("name", name);
        localStorage.setItem("userID", userID);
        
        push("/");
      } else {
        setError(responData.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
     <>
      <a href="#main" className="sr-only focus:not-sr-only p-2 bg-yellow-300 text-black">
        Skip to main content
      </a>

      <main id="main" className="flex justify-center items-center gap-3 w-full h-screen flex-col" role="main">
        <h1 className="text-3xl" aria-label="Judul halaman login">Masuk dengan Akun</h1>

        <form
          className="flex flex-col p-3 w-full md:w-1/4 gap-3"
          onSubmit={handlelogin}
          aria-label="Form login akun"
        >
          <div>
            <label htmlFor="email" className="block font-medium">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="p-3 border rounded-2xl w-full"
              required
              placeholder="email@contoh.com"
              aria-required="true"
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-medium">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="p-3 border rounded-2xl w-full"
              required
              placeholder="••••••••"
              aria-required="true"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm" role="alert" aria-live="assertive">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="p-2 rounded-2xl text-white bg-purple-400"
            disabled={isLoading}
            aria-busy={isLoading}
            aria-label="Tombol login"
          >
            {isLoading ? "Memproses..." : "Login"}
          </button>
        </form>
      </main>
    </>
  );
};

export default LoginPages;
