'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Memory } from '@/types/memory/memory';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { renderToStaticMarkup } from 'react-dom/server';
import L from 'leaflet';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';

type MapProps = {
  memories: Memory[];
};

const createHeroIcon = () => {
  const svgString = renderToStaticMarkup(
    <MapPinIcon className="h-8 w-8 text-red-500" />,
  );

  return L.divIcon({
    html: svgString,
    className: '',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

export default function Map({ memories }: MapProps) {
  const [token, setToken] = useState<string | null>(null);
  const [likeStatus, setLikeStatus] = useState<Record<number, boolean>>({});
  const [localLikeCounts, setLocalLikeCounts] = useState<
    Record<number, number>
  >(() => {
    const counts: Record<number, number> = {};
    memories.forEach((m) => {
      counts[m.id] = m.likeCount;
    });
    return counts;
  });
  const heroIcon = createHeroIcon();

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (!tokenFromStorage) return;
    setToken(tokenFromStorage);

    (async function fetchLikedMemories() {
      try {
        const response = await api.get<number[]>('/memories/liked', {
          headers: { Authorization: `Bearer ${tokenFromStorage}` },
        });

        const likedMap: Record<number, boolean> = {};
        response.data.forEach((id) => {
          likedMap[id] = true;
        });

        setLikeStatus(likedMap);
      } catch (error) {
        console.error('Error fetching liked memories:', error);
      }
    })();
  }, []);

  const handleToggleLike = async (memoryId: number) => {
    if (!token) return;
    const isLiked = likeStatus[memoryId] ?? false;

    try {
      if (isLiked) {
        await api.delete(`/memories/${memoryId}/like`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLocalLikeCounts((prev) => ({
          ...prev,
          [memoryId]: (prev[memoryId] || 1) - 1,
        }));
      } else {
        await api.post(`/memories/${memoryId}/like`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLocalLikeCounts((prev) => ({
          ...prev,
          [memoryId]: (prev[memoryId] || 0) + 1,
        }));
      }

      setLikeStatus((prev) => ({ ...prev, [memoryId]: !isLiked }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MapContainer
      center={[54.4889, 18.5318]}
      zoom={12}
      style={{
        height: '100dvh',
        width: '100%',
        zIndex: '0',
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {memories.map((memory) => (
        <Marker
          key={memory.id}
          position={[memory.latitude, memory.longitude]}
          icon={heroIcon}
        >
          <Popup>
            <div className="w-60">
              <p className="font-semibold text-sm w-fit">
                {memory.categoryName}
              </p>
              <h1 className="font-bold text-lg">{memory.title}</h1>
              <p className="text-sm">{memory.description}</p>
              {memory.photoUrl &&
                memory.photoUrl.map((url, index) => (
                  <div
                    key={index}
                    className="relative w-full aspect-square rounded overflow-hidden"
                  >
                    <Image
                      src={url}
                      alt={`photo ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority={index === 0}
                    />
                  </div>
                ))}
              <p className="text-sm">Author: {memory.userFullName}</p>
              <div className="flex flex-row justify-between items-center text-xs">
                <span>Likes: {localLikeCounts[memory.id]}</span>
                <span>{dayjs(memory.createdAt).format('DD.MM.YYYY')}</span>
              </div>
              {token && (
                <Button
                  className="w-full text-sm font-bold"
                  variant={likeStatus[memory.id] ? 'destructive' : 'secondary'}
                  onClick={() => handleToggleLike(memory.id)}
                >
                  {likeStatus[memory.id] ? 'Unlike' : 'Like'}
                </Button>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
