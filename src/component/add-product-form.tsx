'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { CheckCircle } from 'lucide-react';

const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  image: z.string().url('Must be a valid URL'),
});

type ProductForm = z.infer<typeof productSchema>;

export function AddProductForm() {
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
    reset,
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data: ProductForm) => {
    console.log('Mock product submission:', data);
    alert('Product added successfully! (This is a mock submission)');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-2'>
          <Label htmlFor='title' className='text-sm font-medium text-secondary'>
            Product Title
          </Label>
          <Input
            id='title'
            {...register('title')}
            placeholder='Enter product title'
            className='h-11 border-secondary focus:border-blue-500 focus:ring-blue-500'
          />
          {errors.title && (
            <p className='text-red-500 text-sm flex items-center gap-1 mt-1'>
              {errors.title.message}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='price' className='text-sm font-medium text-secondary'>
            Price ($)
          </Label>
          <Input
            id='price'
            type='number'
            step='0.01'
            {...register('price', { valueAsNumber: true })}
            placeholder='0.00'
            className='h-11 border-secondary focus:border-blue-500 focus:ring-blue-500'
          />
          {errors.price && (
            <p className='text-red-500 text-sm flex items-center gap-1 mt-1'>
              {errors.price.message}
            </p>
          )}
        </div>
      </div>

      <div className='space-y-2'>
        <Label
          htmlFor='category'
          className='text-sm font-medium text-secondary'
        >
          Category
        </Label>
        <Select onValueChange={(value) => setValue('category', value)}>
          <SelectTrigger className='h-11 border-secondary focus:border-blue-500 focus:ring-blue-500'>
            <SelectValue placeholder='Select a category' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='electronics'>Electronics</SelectItem>
            <SelectItem value='jewelery'>Jewelery</SelectItem>
            <SelectItem value="men's clothing">Men&apos;s Clothing</SelectItem>
            <SelectItem value="women's clothing">
              Women&apos;s Clothing
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.category && (
          <p className='text-red-500 text-sm flex items-center gap-1 mt-1'>
            {errors.category.message}
          </p>
        )}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='image' className='text-sm font-medium text-secondary  '>
          Image URL
        </Label>
        <Input
          id='image'
          {...register('image')}
          placeholder='https://example.com/image.jpg'
          className='h-11 border-secondary focus:border-blue-500 focus:ring-blue-500'
        />
        {errors.image && (
          <p className='text-red-500 text-sm flex items-center gap-1 mt-1'>
            {errors.image.message}
          </p>
        )}
      </div>

      <div className='space-y-2'>
        <Label
          htmlFor='description'
          className='text-sm font-medium text-secondary'
        >
          Description
        </Label>
        <Textarea
          id='description'
          {...register('description')}
          placeholder='Enter detailed product description'
          rows={4}
          className='border-secondary focus:border-blue-500 focus:ring-blue-500 resize-none'
        />
        {errors.description && (
          <p className='text-red-500 text-sm flex items-center gap-1 mt-1'>
            {errors.description.message}
          </p>
        )}
      </div>

      <div className='pt-4 border-t border-secondary'>
        <Button
          type='submit'
          className='w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-base'
        >
          <CheckCircle className='w-5 h-5 mr-2' />
          Add Product to Store
        </Button>
      </div>
    </form>
  );
}
