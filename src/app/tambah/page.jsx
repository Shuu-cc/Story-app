"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const AddPage = () => {
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [loading, setLoading] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const router = useRouter();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({video: true});
      videoRef.current.srcObject = stream;
      setCameraOn(true);
    } catch (err) {
      alert("Gagal mengakses kamera. Cek izin browser.");
      console.error(err);
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
      setPhoto(file);
    }, "image/jpeg");
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setCameraOn(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token tidak ditemukan.");
      return router.push("/auth/login");
    }
    if (!description || !photo) {
      alert("Deskripsi dan foto wajib diisi.");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("photo", photo);
    if (lat) formData.append("lat", lat);
    if (lon) formData.append("lon", lon);

    setLoading(true);
    try {
      const res = await fetch("https://story-api.dicoding.dev/v1/stories", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const result = await res.json();
      setLoading(false);
      if (res.ok) {
        alert("Story berhasil ditambahkan!");
        router.push("/");
      } else {
        alert(result.message || "Gagal menambahkan story.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengirim data.");
      setLoading(false);
    }
  };

  return (
     <>
      <a href="#main" className="sr-only focus:not-sr-only p-2 bg-yellow-300 text-black">
        Skip to main content
      </a>
      <header className="bg-blue-700 text-white p-4">
        <h1 className="text-xl font-bold">Tambah Story</h1>
      </header>

      <main id="main" className="p-6 max-w-xl mx-auto" role="main">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" aria-label="Form Tambah Story">
          <div>
            <label htmlFor="desc" className="block font-medium">Deskripsi</label>
            <textarea
              id="desc"
              className="border p-2 rounded w-full"
              placeholder="Deskripsi cerita..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="photoUpload" className="block font-medium">Unggah Foto</label>
            <input
              id="photoUpload"
              type="file"
              accept="image/*"
              className="border p-2 rounded w-full"
              onChange={(e) => setPhoto(e.target.files[0])}
              aria-describedby="photoHelp"
            />
            <small id="photoHelp" className="text-gray-600">
              Pilih file dari galeri atau gunakan kamera di bawah.
            </small>
          </div>

          {photo && (
            <p className="text-sm text-green-600" aria-live="polite">
              Gambar siap diunggah: {photo.name}
            </p>
          )}

          <section aria-label="Kamera">
            {!cameraOn ? (
              <button
                type="button"
                onClick={startCamera}
                className="bg-yellow-500 text-white py-2 rounded"
                aria-label="Aktifkan kamera perangkat"
              >
                Aktifkan Kamera
              </button>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  className="w-full rounded"
                  aria-label="Pratinjau kamera"
                />
                <button
                  type="button"
                  onClick={captureImage}
                  className="bg-green-600 text-white py-2 rounded"
                  aria-label="Ambil gambar dari kamera"
                >
                  Ambil Foto
                </button>
                <button
                  type="button"
                  onClick={stopCamera}
                  className="bg-gray-500 text-white py-2 rounded"
                  aria-label="Nonaktifkan kamera"
                >
                  Matikan Kamera
                </button>
                <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
              </>
            )}
          </section>

          <div>
            <label htmlFor="lat">Latitude (opsional)</label>
            <input
              id="lat"
              type="number"
              className="border p-2 rounded w-full"
              placeholder="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              inputMode="decimal"
            />
          </div>

          <div>
            <label htmlFor="lon">Longitude (opsional)</label>
            <input
              id="lon"
              type="number"
              className="border p-2 rounded w-full"
              placeholder="Longitude"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
              inputMode="decimal"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded"
            aria-busy={loading}
            aria-label="Kirim data cerita"
          >
            {loading ? "Mengirim..." : "Tambah Story"}
          </button>
        </form>
      </main>

      <footer className="text-center p-4 text-sm text-gray-500" role="contentinfo">
        © 2025 Story App
      </footer>
    </>
  );
};

export default AddPage;
