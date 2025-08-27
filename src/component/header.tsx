'use client';
import { ShoppingCart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import Link from 'next/link';

export default function Header() {
  const { cartItems } = useStore();
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className='bg-white shadow-sm border-b'>
      <div className='max-w-7xl mx-auto px-4 py-6'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <Link href='/'>
              <h1 className='text-3xl font-bold text-secondary transition-colors cursor-pointer'>
                E-Commerce Store
              </h1>
            </Link>
            <p className='text-secondary mt-1'>
              Discover amazing products at great prices
            </p>
          </div>
          <div className='flex items-center gap-4'>
            <Link href='/add-product'>
              <Button className='bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 sm:px-6 text-sm sm:text-base'>
                <Plus className='w-4 h-4 mr-1 sm:mr-2' />
                <span className='hidden xs:inline'>Add Product</span>
                <span className='xs:hidden'>Add</span>
              </Button>
            </Link>
            <Link href='/cart'>
              <Button
                variant='outline'
                className='relative border-gray-300 hover:bg-gray-50 bg-transparent p-2 sm:px-3 sm:py-2'
              >
                <ShoppingCart className='w-5 h-5 text-secondary' />
                {cartItemCount > 0 && (
                  <span className='absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center'>
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
