'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Filter } from '@/components/custom/filter';
import { Memory } from '@/types/memory/memory';
import api from '@/lib/axios';
import { AddMemoryForm } from '@/components/base/add-memory-form';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateMemorySchema } from '@/types/memory/create-memory';

const Map = dynamic(() => import('@/components/custom/map'), { ssr: false });

export default function Home() {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    api.get('/memories').then((res) => setMemories(res.data));
  }, []);

  const form = useForm<z.infer<typeof CreateMemorySchema>>({
    resolver: zodResolver(CreateMemorySchema),
    defaultValues: {
      latitude: 0,
      longitude: 0,
      city: '',
      country: '',
      title: '',
    },
  });

  return (
    <main>
      <div className="flex items-end justify-center h-fit m-0 gap-4">
        <Filter onFiltered={setMemories} />
        <div className="w-1/3">
          <AddMemoryForm form={form} />
        </div>
      </div>
      <Map memories={memories} />
    </main>
  );
}
