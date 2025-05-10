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
    <div className="flex justify-center items-center gap-3  w-full h-screen flex-col">
      <h1 className="text-3xl">Masuk dengan Akun</h1>
      <form className="flex flex-col p-3 w-full md:w-1/4 gap-3" onSubmit={handlelogin}>
        <input type="email" className="p-3 border rounded-2xl" required placeholder="email" name="email" />
        <input type="password" className="p-3 border rounded-2xl" required placeholder="password" name="password" />
        <button type="submit" className="p-2 rounded-2xl text-white bg-purple-400 pointer-coarse:">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPages;
