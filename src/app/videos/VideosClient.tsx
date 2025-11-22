"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

type Video = {
  videoDetail_id?: number;
  videoTitle?: string;
  image?: string;
  fileName?: string;
};

function safeKey(value?: string | number) {
  return String(value ?? Math.random().toString(36).slice(2, 9));
}

interface VideosClientProps {
  videos: Video[];
}

export default function VideosClient({ videos }: VideosClientProps) {
  const [showOverlay, setShowOverlay] = useState<Record<string, boolean>>({});
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleOverlayClick = (key: string) => {
    setShowOverlay((prev) => ({ ...prev, [key]: false }));
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url; // fallback
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Videos</h1>
          <p className="text-lg text-gray-600">
            Explore our latest video content
          </p>
        </div>

        {videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No videos found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((v) => {
              const key = safeKey(v.videoDetail_id ?? v.videoTitle);
              const overlayVisible = showOverlay[key] !== false; // default true

              return (
                <article
                  key={key}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative">
                    {v.fileName && (
                      <div className="aspect-video">
                        <iframe
                          src={getEmbedUrl(v.fileName)}
                          title={v.videoTitle}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}

                    {overlayVisible && v.image && !imageErrors[key] && (
                      <div
                        className="absolute inset-0 cursor-pointer"
                        onClick={() => handleOverlayClick(key)}
                      >
                        <Image
                          src={v.image.startsWith('http') ? v.image : `https://newssiteimages.timesmed.com${v.image}`}
                          alt={v.videoTitle ?? "video thumbnail"}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                          onError={() => setImageErrors(prev => ({ ...prev, [key]: true }))}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="w-16 h-16 text-white drop-shadow-lg" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {v.videoTitle}
                    </h2>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
