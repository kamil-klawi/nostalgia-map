import { z } from 'zod';

export interface CreateMemory {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  title: string;
  description?: string;
  photoUrl?: string[];
  categoryId?: number;
}

export const CreateMemorySchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  city: z.string(),
  country: z.string(),
  title: z.string(),
  description: z.string().optional(),
  photoUrl: z.array(z.string()).optional(),
  categoryId: z.number().optional(),
});
