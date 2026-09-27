import { create } from 'zustand';

export const useStore = create((set, get) => ({
  userRole: 'customer', // 'customer' | 'seller' | 'admin'
  setUserRole: (role) => set({ userRole: role }),

  products: [
    {
      id: 'prod-1',
      name: 'CYBERPUNK MATRIX HOODIE',
      tagline: 'Heavyweight 480GSM loopback cotton with lime contrast cords',
      category: 'Apparel',
      price: 180,
      rating: 4.9,
      reviewsCount: 42,
      stock: 35,
      variants: ['S', 'M', 'L', 'XL'],
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      description: 'Engineered for dystopian urban winters. Features weather-resistant coated panels, internal device straps, and reinforced stitching.',
      salesCount: 148,
      sellerId: 'seller-1'
    },
    {
      id: 'prod-2',
      name: 'TACTICAL CHRONO V2',
      tagline: 'Aerospace Grade 5 Titanium mechanical timekeeper',
      category: 'Accessories',
      price: 640,
      rating: 5.0,
      reviewsCount: 19,
      stock: 12,
      variants: ['Stealth Black', 'Brushed Titanium', 'Acid Neon'],
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      description: 'Water resistant to 300m. Ultra-luminescent lime markers with 72-hour power reserve automatic movement.',
      salesCount: 89,
      sellerId: 'seller-1'
    },
    {
      id: 'prod-3',
      name: 'MODULAR EXPEDITION PACK',
      tagline: 'Cordura 1000D magnetic fidlock attachment system',
      category: 'Gear',
      price: 290,
      rating: 4.8,
      reviewsCount: 31,
      stock: 24,
      variants: ['30L Standard', '45L Extended'],
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      description: 'Rapid-deploy modular compartments with waterproof taped YKK Aquaguard zippers and laptop isolation cradle.',
      salesCount: 112,
      sellerId: 'seller-2'
    },
    {
      id: 'prod-4',
      name: 'ACOUSTIC ZERO HEADPHONES',
      tagline: 'Planar magnetic planar drivers with active isolation',
      category: 'Electronics',
      price: 450,
      rating: 4.7,
      reviewsCount: 56,
      stock: 18,
      variants: ['Matte Noir', 'Raw Carbon'],
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      description: 'Audiophile grade studio acoustics tuned with neutral reference curve and replaceable magnetic memory foam pads.',
      salesCount: 204,
      sellerId: 'seller-2'
    },
    {
      id: 'prod-5',
      name: 'CARBON FIBRE SNEAKERS',
      tagline: 'Spring plate propulsion running shoes with lime tread',
      category: 'Footwear',
      price: 320,
      rating: 4.9,
      reviewsCount: 88,
      stock: 15,
      variants: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      description: 'Custom molded full carbon footplate embedded in nitrogen-infused responsive foam cushioning.',
      salesCount: 310,
      sellerId: 'seller-1'
    },
    {
      id: 'prod-6',
      name: 'MONOLITH ERGO CHAIR',
      tagline: 'Continuous lumbar articulation & unibody forged spine',
      category: 'Furniture',
      price: 890,
      rating: 5.0,
      reviewsCount: 14,
      stock: 8,
      variants: ['Midnight Onyx', 'Alabaster'],
      image: 'https://images.unsplash.com/photo-1580481077190-7361356a15fa?auto=format&fit=crop&w=800&q=80',
      description: 'Designed for marathon focus sessions. 4D dynamic armrests, breathable structural weave, and solid cast base.',
      salesCount: 45,
      sellerId: 'seller-3'
    }
  ],

  cart: [],
  wishlist: ['prod-2'],
  selectedCategory: 'All',
  searchQuery: '',
  priceRange: 1000,
  selectedVariant: {},

  orders: [
    {
      id: 'ORD-89421',
      date: '2026-03-24',
      items: [
        { id: 'prod-1', name: 'CYBERPUNK MATRIX HOODIE', price: 180, quantity: 1, variant: 'L' },
        { id: 'prod-5', name: 'CARBON FIBRE SNEAKERS', price: 320, quantity: 1, variant: 'US 10' }
      ],
      subtotal: 500,
      tax: 40,
      total: 540,
      status: 'Out for Delivery', // Placed, Processing, In Transit, Out for Delivery, Delivered
      trackingNumber: 'TRK-992104-LIME',
      estimatedDelivery: 'Today, by 6:00 PM',
      shippingAddress: '742 Evergreen Terrace, Sector 9, Neo-Veridia'
    },
    {
      id: 'ORD-77192',
      date: '2026-03-10',
      items: [
        { id: 'prod-4', name: 'ACOUSTIC ZERO HEADPHONES', price: 450, quantity: 1, variant: 'Matte Noir' }
      ],
      subtotal: 450,
      tax: 36,
      total: 486,
      status: 'Delivered',
      trackingNumber: 'TRK-881203-FEDX',
      estimatedDelivery: 'Delivered March 12, 2026',
      shippingAddress: '742 Evergreen Terrace, Sector 9, Neo-Veridia'
    }
  ],

  reviews: {
    'prod-1': [
      { id: 'rev-1', user: 'Alex V.', rating: 5, date: '2 days ago', comment: 'Quality is breathtaking. The lime accents give it an unmistakable cyber tech look.' },
      { id: 'rev-2', user: 'Kaelen M.', rating: 5, date: '1 week ago', comment: 'Heavyweight material, warm, fits perfectly oversized.' }
    ]
  },

  // Actions
  setCategory: (cat) => set({ selectedCategory: cat }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setPriceRange: (range) => set({ priceRange: range }),

  addToCart: (product, variant) => set((state) => {
    const existingIndex = state.cart.findIndex(
      (item) => item.id === product.id && item.variant === variant
    );
    if (existingIndex > -1) {
      const updated = [...state.cart];
      updated[existingIndex].quantity += 1;
      return { cart: updated };
    }
    return {
      cart: [...state.cart, { ...product, variant: variant || product.variants[0], quantity: 1 }]
    };
  }),

  removeFromCart: (index) => set((state) => ({
    cart: state.cart.filter((_, i) => i !== index)
  })),

  updateCartQuantity: (index, delta) => set((state) => {
    const updated = [...state.cart];
    const newQty = updated[index].quantity + delta;
    if (newQty <= 0) {
      return { cart: state.cart.filter((_, i) => i !== index) };
    }
    updated[index].quantity = newQty;
    return { cart: updated };
  }),

  clearCart: () => set({ cart: [] }),

  toggleWishlist: (productId) => set((state) => {
    if (state.wishlist.includes(productId)) {
      return { wishlist: state.wishlist.filter((id) => id !== productId) };
    }
    return { wishlist: [...state.wishlist, productId] };
  }),

  checkout: (shippingInfo) => {
    const state = get();
    if (state.cart.length === 0) return null;
    const subtotal = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = Math.round(subtotal * 0.08);
    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      items: [...state.cart],
      subtotal,
      tax,
      total: subtotal + tax,
      status: 'Placed',
      trackingNumber: `TRK-${Math.floor(100000 + Math.random() * 900000)}-KRN`,
      estimatedDelivery: '3 Business Days',
      shippingAddress: shippingInfo.address || '2049 Innovation Way, New District'
    };

    set((s) => ({
      orders: [newOrder, ...s.orders],
      cart: []
    }));
    return newOrder;
  },

  addProduct: (productData) => set((state) => ({
    products: [
      {
        ...productData,
        id: `prod-${Date.now()}`,
        rating: 5.0,
        reviewsCount: 1,
        salesCount: 0
      },
      ...state.products
    ]
  })),

  updateProductStock: (id, newStock) => set((state) => ({
    products: state.products.map((p) => (p.id === id ? { ...p, stock: newStock } : p))
  })),

  addReview: (productId, review) => set((state) => ({
    reviews: {
      ...state.reviews,
      [productId]: [
        ...(state.reviews[productId] || []),
        { ...review, id: `rev-${Date.now()}`, date: 'Just now' }
      ]
    }
  })),

  generateAiProductImage: async (prompt) => {
    // Simulated AI image generation generator for seller catalog
    const placeholderImages = [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80'
    ];
    return new Promise((resolve) => {
      setTimeout(() => {
        const selected = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
        resolve(selected);
      }, 1200);
    });
  }
}));
