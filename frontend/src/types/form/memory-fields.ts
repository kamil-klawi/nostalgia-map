import { UseFormReturn } from 'react-hook-form';
import { CreateMemorySchema } from '@/types/memory/create-memory';
import { z } from 'zod';

export type AddMemoryFieldsProps = {
  form: UseFormReturn<z.infer<typeof CreateMemorySchema>>;
};
