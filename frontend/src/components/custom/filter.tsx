import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '@/lib/axios';
import { Form } from '@/components/ui/form';
import { FormFieldCustom } from '@/components/custom/form-field-custom';
import { Button } from '@/components/ui/button';
import { Memory } from '@/types/memory/memory';

export const FilterSchema = z.object({
  categoryId: z
    .string()
    .regex(/^\d+$/, 'Category id must be a positive number')
    .optional()
    .or(z.literal('')),
});

export function Filter({
  onFiltered,
}: {
  onFiltered: (data: Memory[]) => void;
}) {
  const form = useForm<z.infer<typeof FilterSchema>>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      categoryId: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FilterSchema>) {
    try {
      const params = new URLSearchParams();
      if (data.categoryId) {
        params.append('categoryId', data.categoryId);
      }

      const response = await api.get(`/memories/filter?${params.toString()}`);
      onFiltered(response.data);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-1/3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-row justify-between items-end gap-2"
        >
          <div className="w-3/4">
            <FormFieldCustom
              control={form.control}
              name={'categoryId'}
              label={'Category id'}
              placeholder={'Category id'}
              type={'number'}
            />
          </div>
          <Button variant="default" type="submit" className="w-1/4">
            Filter
          </Button>
        </form>
      </Form>
    </div>
  );
}
