"use client";

import Image from "next/image";

export default function Home() {
  const handleButtpn = () => {
    alert("hello");
  };

  return (
    <div className="">
      <button onClick={handleButtpn} className="btn btn-primary flex">
        Hello
      </button>
    </div>
  );
}
