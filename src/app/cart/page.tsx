'use client';

import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Minus, Plus, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useStore();

  if (cartItems.length === 0) {
    return (
      <div className='min-h-screen  py-8'>
        <div className='max-w-4xl mx-auto px-4'>
          <div className='flex items-center gap-52 mb-8'>
            <Link href='/'>
              <Button variant='ghost' size='sm' className='text-secondary '>
                <ArrowLeft className='w-4 h-4 mr-2' />
                Back to Products
              </Button>
            </Link>
            <h1 className='text-3xl font-bold text-secondary'>Shopping Cart</h1>
          </div>

          <Card className='text-center py-16'>
            <CardContent>
              <ShoppingCart className='w-16 h-16 text-secondary mx-auto mb-4' />
              <h2 className='text-xl font-semibold text-secondary mb-2'>
                Your cart is empty
              </h2>
              <p className='text-secondary mb-6'>
                Add some products to get started!
              </p>
              <Link href='/'>
                <Button className='bg-blue-600 hover:bg-blue-700'>
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-4xl mx-auto px-4'>
        <div className='flex items-center justify-between mb-8'>
          <div className='flex items-center gap-52'>
            <Link href='/'>
              <Button
                variant='ghost'
                size='sm'
                className='text-blue-600 hover:text-blue-700'
              >
                <ArrowLeft className='w-4 h-4 mr-2' />
                Back to Products
              </Button>
            </Link>
            <h1 className='text-3xl font-bold text-secondary'>Shopping Cart</h1>
          </div>
        </div>

        <div className='grid gap-6 lg:grid-cols-3 w-[1500px]'>
          <div className='lg:col-span-2 space-y-4'>
            {cartItems.map((item) => (
              <Card key={item.id} className='overflow-hidden'>
                <CardContent className='p-6'>
                  <div className='flex gap-4'>
                    <div className='relative w-20 h-20 flex-shrink-0'>
                      <Image
                        src={item.image || '/placeholder.svg'}
                        alt={item.title}
                        width={200}
                        height={200}
                        className='object-contain rounded-lg'
                      />
                    </div>

                    <div className='flex-1 min-w-0'>
                      <h3 className='font-semibold text-secondary mb-2 line-clamp-2'>
                        {item.title}
                      </h3>
                      <p className='text-lg font-bold text-blue-600 mb-4'>
                        ${item.price.toFixed(2)}
                      </p>

                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className='w-8 h-8 p-0'
                          >
                            <Minus className='w-4 h-4' />
                          </Button>
                          <span className='font-semibold text-secondary min-w-[2rem] text-center'>
                            {item.quantity}
                          </span>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className='w-8 h-8 p-0'
                          >
                            <Plus className='w-4 h-4' />
                          </Button>
                        </div>

                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => removeFromCart(item.id)}
                          className='text-red-600 hover:text-red-700 hover:bg-red-50'
                        >
                          <Trash2 className='w-4 h-4' />
                        </Button>
                      </div>
                    </div>

                    <div className='text-right'>
                      <p className='text-lg font-bold text-gray-900'>
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
