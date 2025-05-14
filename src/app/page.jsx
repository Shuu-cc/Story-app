"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const MapView = dynamic(() => import("./component/MapView"), { ssr: false });

export default function Home() {
  const [data, setData] = useState([]);
  const [isToken, setToken] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    if (!token) {
      setToken(false);
      push("/auth/login");
    }
    const getData = async () => {
      const res = await fetch("https://story-api.dicoding.dev/v1/stories", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const resdata = await res.json();
      setToken(true);
      setData(resdata.listStory || []);
    };

    getData();
  }, []);

  console.log(data);

  return (
     <>
      <a href="#main" className="sr-only focus:not-sr-only p-2 bg-yellow-300 text-black">
        Skip to main content
      </a>

      <header className="bg-green-700 text-white p-4 w-full" role="banner">
        <h1 className="text-xl font-bold">Story App</h1>
      </header>

      <main id="main" className="flex flex-col items-center p-3 gap-3" role="main">
        <div className="flex justify-between items-center w-full max-w-2xl">
          <Link
            href="/tambah"
            className="px-4 py-2 bg-green-500 text-white rounded focus:outline focus:ring-2"
            aria-label="Tambahkan cerita baru"
          >
            ➕ Tambah Story
          </Link>
          <span className="text-sm text-gray-700">
            Mode: <b>{isToken ? "Login" : "Guest"}</b>
          </span>
        </div>

        {data.length > 0 ? (
          data.map((item, index) => (
            <article
              key={index}
              className="card bg-green-400 w-2/4 text-white shadow-sm"
              aria-labelledby={`story-${index}-title`}
            >
              <div className="card-body">
                <h2 id={`story-${index}-title`} className="card-title font-bold">
                  {item.name}
                </h2>
                <p>{item.description}</p>
              </div>
              <img
                src={item.photoUrl}
                className="w-full h-40 object-cover"
                alt={`Foto cerita oleh ${item.name}`}
              />
              {item.lat && item.lon && (
                <MapView lat={item.lat} lon={item.lon} name={item.name} />
              )}
            </article>
          ))
        ) : (
          <p className="text-gray-600" role="status">Belum ada story.</p>
        )}
      </main>

      <footer className="p-4 text-center text-sm text-gray-500" role="contentinfo">
        © 2025 Story App
      </footer>
    </>
  );
}
