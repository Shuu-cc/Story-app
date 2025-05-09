"use client";

import { BaseURL } from "@/api/StoryList";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RegsterPages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { push } = useRouter();
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    let email = e.target.email.value;
    let username = e.target.name.value;
    let password = e.target.password.value;

    if(password.length < 8){
      setError("Password must be at least 8 characters");
    }

    try {
      const res = await fetch(`https://story-api.dicoding.dev/v1/register`, {
        method: "POST",
        body: JSON.stringify({
          name: username,
          email: email,
          password: password,
        }),
      });

      if (!res.ok) {
        setIsError(true);
      } else {
        e.target.reset();
        push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      {isError && <p className="text-red-500">{error}</p>}
      <form className="flex flex-col p-3 w-1/4 gap-3" onSubmit={handleRegister}>
        <input type="email" required placeholder="email" name="email" />
        <input type="text" required placeholder="username" name="name" />
        <input
          type="password"
          required
          placeholder="password"
          name="password"
        />
        <button
          type="submit"
          className="p-2 rounded-2xl text-white bg-purple-400"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegsterPages;
