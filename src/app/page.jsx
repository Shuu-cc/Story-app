"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

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
    <div className="flex flex-col p-3 justify-center items-center gap-3">
      {isToken
        ? data.map((item, index) => (
            <div class="card bg-green-400 w-2/4 bg-base-100 card-xs text-white shadow-sm">
              <div class="card-body ">
                <h2 class="card-title font-bold">{item.name}</h2>
                <p>{item.description}</p>
              </div>
              <img src={item.photoUrl} className="w-full h-40" alt="" />
               {item.lat && item.lon && <MapView lat={item.lat} lon={item.lon} name={item.name} />}
            </div>
          ))
        : null}
    </div>
  );
}
