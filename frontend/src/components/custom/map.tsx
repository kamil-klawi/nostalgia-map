'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Memory } from '@/types/memory/memory';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { renderToStaticMarkup } from 'react-dom/server';
import L from 'leaflet';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useState } from 'react';
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
  const [likeStatus, setLikeStatus] = useState<
    Record<number, { liked: boolean; loading: boolean }>
  >({});
  const token = localStorage.getItem('token');
  const heroIcon = createHeroIcon();

  const handleToggleLike = async (id: number) => {
    const current = likeStatus[id]?.liked ?? false;

    setLikeStatus((prev) => ({
      ...prev,
      [id]: { liked: current, loading: true },
    }));

    try {
      if (current) {
        await api.delete(`/memories/${id}/like`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await api.post(`/memories/${id}/like`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setLikeStatus((prev) => ({
        ...prev,
        [id]: { liked: !current, loading: false },
      }));
    } catch (error) {
      console.error(error);
      setLikeStatus((prev) => ({
        ...prev,
        [id]: { liked: current, loading: false },
      }));
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
            <div>
              <p className="font-bold text-md">{memory.categoryName}</p>
              <h1 className="font-bold text-lg">{memory.title}</h1>
              <p className="text-md">{memory.description}</p>
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
              <div className="flex flex-row justify-between items-center">
                <p>Likes: {memory.likeCount}</p>
                <p>{dayjs(memory.createdAt).format('DD.MM.YYYY')}</p>
              </div>
              <Button
                variant={likeStatus ? 'default' : 'destructive'}
                onClick={() => handleToggleLike(memory.id)}
              >
                {likeStatus ? 'Like' : 'Unlike'}
              </Button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
