"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Photo = {
  id: string;
  url: string;
  createdAt: string;
};

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchPhotos() {
      setLoading(true);
      const res = await fetch("/api/admin/gallery");
      const albums = await res.json();

      let allPhotos: Photo[] = [];
      albums.forEach((album: any) => {
        if (album.photos) {
          allPhotos = allPhotos.concat(
            album.photos.map((photo: any) => ({
              id: photo.id,
              url: photo.imageUrl,
              createdAt: photo.uploadDate,
            }))
          );
        }
      });

      allPhotos.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setPhotos(allPhotos.slice(0, 7));
      setLoading(false);
    }

    fetchPhotos();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <section className="w-full max-w-[1400px] mx-auto py-10 bg-white rounded-2xl">
      <h2 className="text-center font-extrabold text-4xl text-[#a50303] mb-7 tracking-wide">
        Recent Highlights from Our Gallery
      </h2>
      <div className="flex gap-1 flex-wrap justify-center py-3">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="rounded-xl p-3 w-[340px] h-[260px] flex items-center justify-center"
          >
            <img
              src={photo.url}
              alt=""
              className="w-[320px] h-[240px] object-cover rounded-lg bg-black shadow-md border border-[#a50303]"
            />
          </div>
        ))}
      </div>
      <div className="text-center mt-7">
        <button
          onClick={() => router.push("/gallery")}
          className="bg-[#a50303] text-white font-bold text-xl py-3 px-10 rounded-lg cursor-pointer transition-colors duration-200 shadow-md hover:bg-[#870202]"
        >
          View All
        </button>
      </div>
    </section>
  );
}
