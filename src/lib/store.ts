import { create } from 'zustand';

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface Store {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  cartItems: CartItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addToCart: (product: any) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

export const useStore = create<Store>((set) => ({
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  selectedCategory: '',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  cartItems: [],
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === product.id
      );
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        cartItems: [
          ...state.cartItems,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1,
          },
        ],
      };
    }),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cartItems:
        quantity <= 0
          ? state.cartItems.filter((item) => item.id !== id)
          : state.cartItems.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
    })),
  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),
  clearCart: () => set({ cartItems: [] }),
}));
