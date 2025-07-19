'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Filter } from '@/components/custom/filter';
import { Memory } from '@/types/memory/memory';
import api from '@/lib/axios';
import { AddMemoryForm } from '@/components/base/add-memory-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateMemorySchema } from '@/types/memory/create-memory';
import styles from '@/styles/page/home.module.scss';

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
    <main className={styles.main}>
      <div className={styles.container}>
        <Filter onFiltered={setMemories} />
        <AddMemoryForm form={form} />
      </div>
      <Map memories={memories} />
    </main>
  );
}
