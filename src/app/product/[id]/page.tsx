'use client';

import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { ShoppingCart, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useStore();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', params.id],
    queryFn: async () => {
      const response = await fetch(
        `https://fakestoreapi.com/products/${params.id}`
      );
      return response.json();
    },
  });

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <div className='w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
          <div className='text-blue-600 text-lg font-medium'>
            Loading product...
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-secondary mb-4'>
            Product not found
          </h1>
          <Link href='/'>
            <Button className='bg-blue-600 hover:bg-blue-700 text-white'>
              <ArrowLeft className='w-4 h-4 mr-2' />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-4 py-4'>
          <Link href='/'>
            <Button
              variant='ghost'
              className='text-secondary hover:text-gray-900 p-2'
            >
              <ArrowLeft className='w-5 h-5 mr-2' />
              Back to Products
            </Button>
          </Link>
        </div>
      </header>

      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='bg-white rounded-xl shadow-sm border overflow-hidden'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-0'>
            <div className='p-8 bg-gray-50'>
              <div className='aspect-square bg-white rounded-xl overflow-hidden border shadow-sm relative'>
                <Image
                  src={product.image || '/placeholder.svg'}
                  alt={product.title}
                  fill
                  className='object-contain p-8'
                />
              </div>
            </div>

            <div className='p-8 lg:p-12 space-y-8'>
              <div className='space-y-4'>
                <div className='flex items-center gap-2'>
                  <Tag className='w-4 h-4 text-secondary' />
                  <span className='text-sm font-medium text-secondary capitalize bg-gray-100 px-3 py-1.5 rounded-full'>
                    {product.category}
                  </span>
                </div>
                <h1 className='text-3xl lg:text-4xl font-bold text-secondary leading-tight'>
                  {product.title}
                </h1>
                <p className='text-4xl font-bold text-blue-600'>
                  ${product.price}
                </p>
              </div>

              <div className='space-y-4'>
                <h2 className='text-xl font-semibold text-secondary'>
                  Product Description
                </h2>
                <p className='text-secondary leading-relaxed text-lg'>
                  {product.description}
                </p>
              </div>

              <div className='pt-6 border-t border-gray-200'>
                <Button
                  onClick={handleAddToCart}
                  className='w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-xl shadow-sm hover:shadow-md transition-all duration-200'
                >
                  <ShoppingCart className='w-6 h-6 mr-3' />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
