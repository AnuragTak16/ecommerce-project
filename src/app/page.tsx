'use client';
import { useQuery } from '@tanstack/react-query';
import { Search, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useStore } from '@/lib/store';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function HomePage() {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    cartItems,
  } = useStore();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      return response.json();
    },
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch(
        'https://fakestoreapi.com/products/categories'
      );
      return response.json();
    },
  });

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: Product
  ) => {
    e.preventDefault();
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      useStore.getState();
      // .updateCartItemQuantity(product.id, existingItem.quantity + 1);
    } else {
      useStore.getState().addToCart({ ...product, quantity: 1 });
    }
  };

  const filteredProducts = products.filter((product: Product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' ||
      !selectedCategory ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <div className='w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
          <div className='text-blue-600 text-lg font-medium'>
            Loading products...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='bg-white rounded-lg shadow-sm border p-6 mb-8'>
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5' />
              <Input
                placeholder='Search for products...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-12 h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className='w-full sm:w-56 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500'>
                <SelectValue placeholder='All Categories' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Categories</SelectItem>
                {categories.map((category: string) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8'>
          {filteredProducts.map((product: Product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <Card className='group cursor-pointer hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-blue-300 bg-white overflow-hidden h-full'>
                <CardContent className='p-0'>
                  <div className='aspect-square overflow-hidden bg-gray-50 relative'>
                    <Image
                      src={product.image || '/placeholder.svg'}
                      alt={product.title}
                      fill
                      className='object-contain p-4 group-hover:scale-105 transition-transform duration-300'
                    />
                    <div className='absolute inset-0 0 bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300' />
                  </div>
                  <div className='p-6 flex flex-col h-48'>
                    <div className='flex-1 space-y-2 mb-4'>
                      <h3 className='font-semibold text-secondary line-clamp-2 text-lg leading-tight group-hover:text-primary transition-colors duration-200 min-h-[3.5rem]'>
                        {product.title}
                      </h3>
                      <p className='text-blue-600 font-bold text-2xl'>
                        ${product.price}
                      </p>
                    </div>
                    <div className='mt-auto space-y-3'>
                      <div className=''>
                        <span className='text-xs font-medium text-secondary capitalize bg-gray-100 px-3 py-1.5 rounded-full'>
                          {product.category}
                        </span>
                      </div>
                      <Button
                        onClick={(e) => handleAddToCart(e, product)}
                        size='sm'
                        className='w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2'
                      >
                        <ShoppingCart className='w-4 h-4' />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className='text-center py-16 bg-white rounded-lg shadow-sm border'>
            <div className='text-secondary mb-4'>
              <Search className='w-16 h-16 mx-auto' />
            </div>
            <h3 className='text-xl font-semibold text-secondary mb-2'>
              No products found
            </h3>
            <p className='text-secondary'>
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
