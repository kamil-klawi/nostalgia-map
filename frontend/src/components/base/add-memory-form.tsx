import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FormFieldCustom } from '@/components/custom/form-field-custom';
import { AddMemoryFieldsProps } from '@/types/form/memory-fields';
import { z } from 'zod';
import { toast } from 'sonner';
import { CreateMemorySchema } from '@/types/memory/create-memory';
import api from '@/lib/axios';
import { Form } from '@/components/ui/form';
import { XCircleIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

export function AddMemoryForm({ form }: AddMemoryFieldsProps) {
  const token = localStorage.getItem('token');
  async function onSubmit(data: z.infer<typeof CreateMemorySchema>) {
    try {
      await api.post('/memories/create', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Create new memory!');
      form.reset();
    } catch (error) {
      toast.error('Creating new memory failed. Please try again.');
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild className="w-1/4">
        <Button variant="default">Add memory</Button>
      </DialogTrigger>
      <DialogContent style={{ padding: '2rem' }}>
        <DialogHeader>
          <DialogTitle>Add memory</DialogTitle>
          <DialogDescription>
            You can share stories from specific places with others – it's like
            traveling through emotions, time, and experiences.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <FormFieldCustom
                control={form.control}
                name={'latitude'}
                label={'Latitude'}
                placeholder={'Latitude'}
                type={'number'}
              />
              <FormFieldCustom
                control={form.control}
                name={'longitude'}
                label={'Longitude'}
                placeholder={'Longitude'}
                type={'number'}
              />
              <FormFieldCustom
                control={form.control}
                name={'city'}
                label={'City'}
                placeholder={'City'}
                type={'text'}
              />
              <FormFieldCustom
                control={form.control}
                name={'country'}
                label={'Country'}
                placeholder={'Country'}
                type={'text'}
              />
              <FormFieldCustom
                control={form.control}
                name={'title'}
                label={'Title'}
                placeholder={'Title'}
                type={'text'}
              />
              <FormFieldCustom
                control={form.control}
                name={'description'}
                label={'Description'}
                placeholder={'Description'}
                type={'text'}
                description={
                  'Not required, but you can provide it for better experience.'
                }
              />
              <FormFieldCustom
                control={form.control}
                name={'photoUrl'}
                label={'Photo url'}
                placeholder={'Photo url'}
                type={'url'}
                description={
                  'Not required, but you can provide it for better experience.'
                }
              />
              <FormFieldCustom
                control={form.control}
                name={'categoryId'}
                label={'Category id'}
                placeholder={'Category id'}
                type={'number'}
                description={
                  'Not required, but you can provide it for better experience.'
                }
              />
            </div>
            <DialogFooter style={{ padding: '1rem 0' }}>
              <DialogClose asChild>
                <Button variant="outline">
                  <XCircleIcon /> Cancel
                </Button>
              </DialogClose>
              <Button type="submit">
                <PaperAirplaneIcon /> Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
