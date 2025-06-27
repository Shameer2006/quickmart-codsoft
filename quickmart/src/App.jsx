import React, { useState, useEffect, createContext, useContext } from 'react';
import { ShoppingCart, User, Search, Filter, Star, Heart, CreditCard, Truck, Shield, ArrowLeft, Plus, Minus, X, Check, Eye, EyeOff, LogOut, Mail, MapPin } from 'lucide-react';

// Context for global state management
const AppContext = createContext();

// Sample product data
const sampleProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    originalPrice: 99.99,
    category: "Electronics",
    brand: "TechSound",
    rating: 4.5,
    reviews: 124,
    image: "/images/headphone.jpg",
    description: "Premium wireless headphones with noise cancellation and 30-hour battery life.",
    features: ["Noise Cancellation", "30hr Battery", "Bluetooth 5.0", "Fast Charging"],
    inStock: true,
    tags: ["wireless", "audio", "premium"]
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    originalPrice: 249.99,
    category: "Electronics",
    brand: "FitTech",
    rating: 4.3,
    reviews: 89,
    image: "/images/watch.jpg",
    description: "Advanced fitness tracking with heart rate monitor and GPS.",
    features: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant", "7-day Battery"],
    inStock: true,
    tags: ["fitness", "smart", "health"]
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    price: 24.99,
    originalPrice: 34.99,
    category: "Fashion",
    brand: "EcoWear",
    rating: 4.7,
    reviews: 203,
    image: "/images/tshert.jpg",
    description: "Sustainable, comfortable t-shirt made from 100% organic cotton.",
    features: ["100% Organic Cotton", "Sustainable", "Pre-shrunk", "Soft Feel"],
    inStock: true,
    tags: ["organic", "sustainable", "comfortable"]
  },
  {
    id: 4,
    name: "Professional Coffee Maker",
    price: 129.99,
    originalPrice: 159.99,
    category: "Households",
    brand: "BrewMaster",
    rating: 4.6,
    reviews: 156,
    image: "/images/coffee.jpg",
    description: "Programmable coffee maker with built-in grinder and thermal carafe.",
    features: ["Built-in Grinder", "Programmable", "Thermal Carafe", "Auto Shut-off"],
    inStock: true,
    tags: ["coffee", "programmable", "premium"]
  },
  {
    id: 5,
    name: "Leather Messenger Bag",
    price: 89.99,
    originalPrice: 119.99,
    category: "Fashion",
    brand: "CraftLeather",
    rating: 4.4,
    reviews: 78,
    image: "/images/bag.jpg",
    description: "Handcrafted genuine leather messenger bag perfect for work or travel.",
    features: ["Genuine Leather", "Handcrafted", "Multiple Pockets", "Adjustable Strap"],
    inStock: false,
    tags: ["leather", "professional", "handcrafted"]
  },
  {
    id: 6,
    name: "Gaming Mechanical Keyboard",
    price: 149.99,
    originalPrice: 179.99,
    category: "Electronics",
    brand: "GameTech",
    rating: 4.8,
    reviews: 267,
    image: "/images/keyboard.jpg",
    description: "RGB mechanical keyboard with customizable keys and tactile switches.",
    features: ["Mechanical Switches", "RGB Lighting", "Programmable Keys", "Gaming Mode"],
    inStock: true,
    tags: ["gaming", "mechanical", "rgb"]
  },
  {
    id: 7,
    name: "Fresh Organic Apples (1kg)",
    price: 3.49,
    originalPrice: 4.00,
    category: "Groceries",
    brand: "Nature's Best",
    rating: 4.9,
    reviews: 310,
    image: "/images/apple.jpg",
    description: "Crisp, sweet, and organically grown apples. Perfect for snacking or baking.",
    features: ["Organic", "Farm Fresh", "Rich in Vitamins"],
    inStock: true,
    tags: ["fruit", "organic", "healthy"]
  },
  {
    id: 8,
    name: "Premium Ballpoint Pens (Pack of 12)",
    price: 9.99,
    originalPrice: 12.00,
    category: "Stationeries",
    brand: "SmoothWrite",
    rating: 4.2,
    reviews: 95,
    image: "/images/pen.jpg",
    description: "Ergonomic design with smooth-flowing ink for effortless writing. Ideal for office and school.",
    features: ["Smooth Ink Flow", "Comfort Grip", "Retractable", "Assorted Colors"],
    inStock: true,
    tags: ["pen", "writing", "office", "school"]
  },
  {
    id: 9,
    name: "Stainless Steel Water Bottle",
    price: 19.99,
    originalPrice: 25.00,
    category: "Households",
    brand: "HydrateNow",
    rating: 4.7,
    reviews: 180,
    image: "/images/watterbottel.jpg",
    description: "Double-wall insulated bottle keeps drinks cold for 24 hours or hot for 12 hours.",
    features: ["BPA-Free", "Leak-Proof", "Insulated", "Durable"],
    inStock: true,
    tags: ["bottle", "reusable", "hydration"]
  },
  {
    id: 10,
    name: "Men's Casual Sneakers",
    price: 59.99,
    originalPrice: 79.99,
    category: "Fashion",
    brand: "UrbanStride",
    rating: 4.1,
    reviews: 105,
    image: "/images/shous.jpg",
    description: "Comfortable and stylish sneakers for everyday wear. Lightweight design.",
    features: ["Breathable Material", "Lightweight", "Durable Sole", "Lace-up"],
    inStock: true,
    tags: ["shoes", "footwear", "casual"]
  },
  {
    id: 11,
    name: "Notebook Set (3-Pack)",
    price: 14.99,
    originalPrice: 18.00,
    category: "Stationeries",
    brand: "PaperWorks",
    rating: 4.6,
    reviews: 70,
    image: "/images/notebooks.jpg",
    description: "High-quality, college-ruled notebooks with durable covers. Perfect for students and professionals.",
    features: ["College Ruled", "Durable Cover", "Perforated Pages"],
    inStock: true,
    tags: ["notebook", "paper", "school", "office"]
  },
  {
    id: 12,
    name: "Organic Pasta (500g)",
    price: 2.79,
    originalPrice: 3.50,
    category: "Groceries",
    brand: "GrainHarvest",
    rating: 4.8,
    reviews: 190,
    image: "/images/pasta.jpg",
    description: "Delicious and healthy organic pasta made from durum wheat semolina.",
    features: ["Organic", "Non-GMO", "Vegan"],
    inStock: true,
    tags: ["food", "pantry", "italian"]
  }
];

// Main App Component
function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    priceRange: [0, 500],
    rating: 0,
    inStock: false
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [message, setMessage] = useState(''); // Global message state

  // Simple message display handler
  const showGlobalMessage = (msg, type = 'success') => {
      setMessage({ text: msg, type: type });
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
  };

  // Context value
  const contextValue = {
    user, setUser,
    cart, setCart,
    wishlist, setWishlist,
    currentView, setCurrentView,
    selectedProduct, setSelectedProduct,
    searchQuery, setSearchQuery,
    filters, setFilters,
    showAuthModal, setShowAuthModal,
    authMode, setAuthMode,
    showGlobalMessage
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'Inter, sans-serif', color: '#1f2937' }}>
        <Header />
        <main>
          {currentView === 'home' && <HomePage />}
          {currentView === 'products' && <ProductsPage />}
          {currentView === 'product' && selectedProduct && <ProductDetailPage />}
          {currentView === 'cart' && <CartPage />}
          {currentView === 'checkout' && <CheckoutPage />}
          {currentView === 'profile' && <ProfilePage />}
        </main>
        {showAuthModal && <AuthModal />}

        {/* Global Message Display */}
        {message && (
            <div style={{
                position: 'fixed',
                top: '70px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: message.type === 'success' ? '#4CAF50' : '#f44336',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '5px',
                zIndex: 1000,
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                fontSize: '0.9em',
            }}>
                {message.text}
            </div>
        )}
      </div>
    </AppContext.Provider>
  );
}

// Header Component
function Header() {
  const { user, cart, setCurrentView, setShowAuthModal, setAuthMode, searchQuery, setSearchQuery } = useContext(AppContext);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'sticky', top: '0', zIndex: '50' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}>
          {/* Logo */}
          <div
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => setCurrentView('home')}
          >
            <div style={{ background: 'linear-gradient(to right, #2563eb, #9333ea)', color: '#fff', fontWeight: 'bold', fontSize: '1.25rem', padding: '0.25rem 0.75rem', borderRadius: '0.5rem' }}>
              QuickMart
            </div>
          </div>

          {/* Search Bar */}
          <div style={{ flex: '1', maxWidth: '32rem', margin: '0 2rem' }}>
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', width: '1.25rem', height: '1.25rem' }} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2.5rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
                onKeyPress={(e) => e.key === 'Enter' && setCurrentView('products')}
              />
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setCurrentView('products')}
              style={{ color: '#4b5563', padding: '0.5rem 0.75rem', borderRadius: '0.375rem', fontWeight: '500', transition: 'color 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.color = '#2563eb'}
              onMouseOut={(e) => e.currentTarget.style.color = '#4b5563'}
            >
              Products
            </button>

            {/* Cart */}
            <button
              onClick={() => setCurrentView('cart')}
              style={{ position: 'relative', padding: '0.5rem', color: '#4b5563', transition: 'color 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.color = '#2563eb'}
              onMouseOut={(e) => e.currentTarget.style.color = '#4b5563'}
            >
              <ShoppingCart style={{ width: '1.5rem', height: '1.5rem' }} />
              {cartItemCount > 0 && (
                <span style={{ position: 'absolute', top: '-0.25rem', right: '-0.25rem', backgroundColor: '#ef4444', color: '#fff', fontSize: '0.75rem', borderRadius: '9999px', width: '1.25rem', height: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User */}
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => setCurrentView('profile')}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563', transition: 'color 0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#2563eb'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#4b5563'}
                >
                  <User style={{ width: '1.25rem', height: '1.25rem' }} />
                  <span style={{ display: 'none' /* md:inline */ }}>{user.name}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthMode('login');
                  setShowAuthModal(true);
                }}
                style={{ backgroundColor: '#2563eb', color: '#fff', padding: '0.5rem 1rem', borderRadius: '0.5rem', transition: 'background-color 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

// Home Page Component
function HomePage() {
  const { setCurrentView } = useContext(AppContext);

  // Featured products from different categories
  const featuredProducts = [
    sampleProducts.find(p => p.category === "Electronics"),
    sampleProducts.find(p => p.category === "Households"),
    sampleProducts.find(p => p.category === "Fashion"),
  ].filter(Boolean).slice(0, 3); // Ensure they exist and take max 3

  return (
    <div>
      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(to right, #2563eb, #9333ea)', color: '#fff', padding: '5rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.25rem' /* md:4rem */, fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Welcome to QuickMart
          </h1>
          <p style={{ fontSize: '1.25rem' /* md:1.5rem */, marginBottom: '2rem', opacity: '0.9' }}>
            Your one-stop shop for everything you need!
          </p>
          <button
            onClick={() => setCurrentView('products')}
            style={{ backgroundColor: '#fff', color: '#2563eb', padding: '0.75rem 2rem', borderRadius: '0.5rem', fontWeight: '600', fontSize: '1.125rem', transition: 'background-color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '4rem 0', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <Truck style={{ width: '3rem', height: '3rem', color: '#2563eb', margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Fast Shipping</h3>
              <p style={{ color: '#4b5563' }}>Quick delivery to your doorstep</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Shield style={{ width: '3rem', height: '3rem', color: '#2563eb', margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Secure Payment</h3>
              <p style={{ color: '#4b5563' }}>Your payment information is safe</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Star style={{ width: '3rem', height: '3rem', color: '#2563eb', margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Quality Products</h3>
              <p style={{ color: '#4b5563' }}>Carefully curated high-quality items</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '4rem 0', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>Featured Products</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button
              onClick={() => setCurrentView('products')}
              style={{ backgroundColor: '#2563eb', color: '#fff', padding: '0.75rem 2rem', borderRadius: '0.5rem', fontWeight: '600', transition: 'background-color 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            >
              View All Products
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Products Page Component
function ProductsPage() {
  const { searchQuery, filters, setFilters } = useContext(AppContext);
  const [showFilters, setShowFilters] = useState(false);

  // Filter products based on search and filters
  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesBrand = !filters.brand || product.brand === filters.brand;
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const matchesRating = product.rating >= filters.rating;
    const matchesStock = !filters.inStock || product.inStock;

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating && matchesStock;
  });

  const categories = [...new Set(sampleProducts.map(p => p.category))];
  const brands = [...new Set(sampleProducts.map(p => p.brand))];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>Products</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#fff', border: '1px solid #d1d5db', padding: '0.5rem 1rem', borderRadius: '0.5rem', transition: 'background-color 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
        >
          <Filter style={{ width: '1.25rem', height: '1.25rem' }} />
          <span>Filters</span>
        </button>
      </div>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Filters Sidebar */}
        {showFilters && (
          <div style={{ width: '16rem', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flexShrink: 0 }}>
            <h3 style={{ fontWeight: '600', marginBottom: '1rem' }}>Filters</h3>

            {/* Category Filter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: '0.375rem', padding: '0.5rem 0.75rem', outline: 'none' }}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Brand Filter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Brand</label>
              <select
                value={filters.brand}
                onChange={(e) => setFilters({...filters, brand: e.target.value})}
                style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: '0.375rem', padding: '0.5rem 0.75rem', outline: 'none' }}
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="500"
                value={filters.priceRange[1]}
                onChange={(e) => setFilters({...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value)]})}
                style={{ width: '100%' }}
              />
            </div>

            {/* Rating Filter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Minimum Rating</label>
              <select
                value={filters.rating}
                onChange={(e) => setFilters({...filters, rating: parseFloat(e.target.value)})}
                style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: '0.375rem', padding: '0.5rem 0.75rem', outline: 'none' }}
              >
                <option value="0">Any Rating</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
            </div>

            {/* In Stock Filter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) => setFilters({...filters, inStock: e.target.checked})}
                  style={{ borderRadius: '0.25rem', border: '1px solid #d1d5db', color: '#2563eb' }}
                />
                <span style={{ fontSize: '0.875rem' }}>In Stock Only</span>
              </label>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => setFilters({
                category: '',
                brand: '',
                priceRange: [0, 500],
                rating: 0,
                inStock: false
              })}
              style={{ width: '100%', backgroundColor: '#e5e7eb', color: '#374151', padding: '0.5rem 1rem', borderRadius: '0.375rem', transition: 'background-color 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d1d5db'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div style={{ flex: '1' }}>
          <div style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>
            Showing {filteredProducts.length} products
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Product Card Component
function ProductCard({ product }) {
  const { setCurrentView, setSelectedProduct, cart, setCart, wishlist, setWishlist, showGlobalMessage } = useContext(AppContext);

  const isInWishlist = wishlist.some(item => item.id === product.id);
  const isInCart = cart.some(item => item.id === product.id);

  const addToCart = (e) => {
    e.stopPropagation();
    if (!product.inStock) {
        showGlobalMessage('This product is currently out of stock.', 'error');
        return;
    }
    if (isInCart) {
      showGlobalMessage('Product already in cart. Update quantity in cart page.', 'info');
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      showGlobalMessage(`${product.name} added to cart!`);
    }
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
      showGlobalMessage(`${product.name} removed from wishlist.`, 'info');
    } else {
      setWishlist([...wishlist, product]);
      showGlobalMessage(`${product.name} added to wishlist!`);
    }
  };

  const viewProduct = () => {
    setSelectedProduct(product);
    setCurrentView('product');
  };

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden', transition: 'box-shadow 0.2s', cursor: 'pointer' }}
         onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'}
         onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}
    >
      <div style={{ position: 'relative' }} onClick={viewProduct}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: '12rem', objectFit: 'cover', transition: 'transform 0.3s' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        {discount > 0 && (
          <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', backgroundColor: '#ef4444', color: '#fff', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem', fontWeight: '600' }}>
            -{discount}%
          </div>
        )}
        <button
          onClick={toggleWishlist}
          style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', padding: '0.5rem', backgroundColor: '#fff', borderRadius: '9999px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', transition: 'background-color 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
        >
          <Heart style={{ width: '1.25rem', height: '1.25rem', color: isInWishlist ? '#ef4444' : '#9ca3af', fill: isInWishlist ? '#ef4444' : 'none' }} />
        </button>
        {!product.inStock && (
          <div style={{ position: 'absolute', inset: '0', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontWeight: '600' }}>Out of Stock</span>
          </div>
        )}
      </div>

      <div style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{product.brand}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Star style={{ width: '1rem', height: '1rem', fill: '#fbbf24', color: '#fbbf24' }} />
            <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>{product.rating} ({product.reviews})</span>
          </div>
        </div>

        <h3 style={{ fontWeight: '600', fontSize: '1.125rem', marginBottom: '0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' }} onClick={viewProduct}>
          {product.name}
        </h3>

        <p style={{ color: '#4b5563', fontSize: '0.875rem', marginBottom: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' }}>
          {product.description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb' }}>₹{product.price}</span>
            {product.originalPrice && (
              <span style={{ fontSize: '0.875rem', color: '#6b7280', textDecoration: 'line-through' }}>₹{product.originalPrice}</span>
            )}
          </div>

          <button
            onClick={addToCart}
            disabled={!product.inStock || isInCart}
            style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: '600', transition: 'background-color 0.2s',
              backgroundColor: !product.inStock || isInCart ? '#e5e7eb' : '#2563eb',
              color: !product.inStock || isInCart ? '#6b7280' : '#fff',
              cursor: !product.inStock || isInCart ? 'not-allowed' : 'pointer'
            }}
            onMouseOver={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#1d4ed8'; }}
            onMouseOut={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#2563eb'; }}
          >
            {isInCart ? 'In Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Product Detail Page Component
function ProductDetailPage() {
  const { selectedProduct, setCurrentView, cart, setCart, wishlist, setWishlist, showGlobalMessage } = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const isInWishlist = wishlist.some(item => item.id === selectedProduct.id);
  const cartItem = cart.find(item => item.id === selectedProduct.id);

  const addToCart = () => {
    if (!selectedProduct.inStock) {
        showGlobalMessage('This product is currently out of stock.', 'error');
        return;
    }
    if (cartItem) {
      setCart(cart.map(item =>
        item.id === selectedProduct.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
      showGlobalMessage(`Updated quantity of ${selectedProduct.name} in cart!`);
    } else {
      setCart([...cart, { ...selectedProduct, quantity }]);
      showGlobalMessage(`${selectedProduct.name} added to cart!`);
    }
  };

  const toggleWishlist = () => {
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item.id !== selectedProduct.id));
      showGlobalMessage(`${selectedProduct.name} removed from wishlist.`, 'info');
    } else {
      setWishlist([...wishlist, selectedProduct]);
      showGlobalMessage(`${selectedProduct.name} added to wishlist!`);
    }
  };

  const discount = selectedProduct.originalPrice ?
    Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100) : 0;

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
      <button
        onClick={() => setCurrentView('products')}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2563eb', transition: 'color 0.2s', marginBottom: '1.5rem' }}
        onMouseOver={(e) => e.currentTarget.style.color = '#1d4ed8'}
        onMouseOut={(e) => e.currentTarget.style.color = '#2563eb'}
      >
        <ArrowLeft style={{ width: '1.25rem', height: '1.25rem' }} />
        <span>Back to Products</span>
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' /* lg:grid-cols-2 */ }}>
        {/* Product Images */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}> {/* Center and give min-height */}
          <div style={{ width: '100%', maxWidth: '400px', aspectRatio: '1/1', backgroundColor: '#f3f4f6', borderRadius: '0.5rem', overflow: 'hidden' }}>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Product Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#2563eb', fontWeight: '500' }}>{selectedProduct.brand}</span>
              <button
                onClick={toggleWishlist}
                style={{ padding: '0.5rem', transition: 'background-color 0.2s', borderRadius: '9999px', border: 'none', background: 'none' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Heart style={{ width: '1.5rem', height: '1.5rem', color: isInWishlist ? '#ef4444' : '#9ca3af', fill: isInWishlist ? '#ef4444' : 'none' }} />
              </button>
            </div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>{selectedProduct.name}</h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    style={{ width: '1.25rem', height: '1.25rem', fill: i < Math.floor(selectedProduct.rating) ? '#fbbf24' : 'none', color: i < Math.floor(selectedProduct.rating) ? '#fbbf24' : '#d1d5db' }}
                  />
                ))}
                <span style={{ color: '#4b5563', marginLeft: '0.5rem' }}>({selectedProduct.reviews} reviews)</span>
              </div>
              <span style={{ padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem', fontWeight: '600',
                backgroundColor: selectedProduct.inStock ? '#d1fae5' : '#fee2e2',
                color: selectedProduct.inStock ? '#065f46' : '#991b1b'
              }}>
                {selectedProduct.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#2563eb' }}>₹{selectedProduct.price}</span>
            {selectedProduct.originalPrice && (
              <>
                <span style={{ fontSize: '1.5rem', color: '#6b7280', textDecoration: 'line-through' }}>₹{selectedProduct.originalPrice}</span>
                <span style={{ backgroundColor: '#ef4444', color: '#fff', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem', fontWeight: '600' }}>
                  Save {discount}%
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Description</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.5' }}>{selectedProduct.description}</p>
          </div>

          {/* Features */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem' }}>Features</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' /* md:grid-cols-2 */ }}>
              {selectedProduct.features.map((feature, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check style={{ width: '1rem', height: '1rem', color: '#10b981' }} />
                  <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontWeight: '500' }}>Quantity:</span>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '0.5rem', transition: 'background-color 0.2s', borderRadius: '0.5rem 0 0 0.5rem', border: 'none', background: 'none' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Minus style={{ width: '1rem', height: '1rem' }} />
                </button>
                <span style={{ padding: '0.5rem 1rem', fontWeight: '500' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ padding: '0.5rem', transition: 'background-color 0.2s', borderRadius: '0 0.5rem 0.5rem 0', border: 'none', background: 'none' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Plus style={{ width: '1rem', height: '1rem' }} />
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={addToCart}
                disabled={!selectedProduct.inStock}
                style={{ flex: '1', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', transition: 'background-color 0.2s',
                  backgroundColor: selectedProduct.inStock ? '#2563eb' : '#d1d5db',
                  color: selectedProduct.inStock ? '#fff' : '#6b7280',
                  cursor: selectedProduct.inStock ? 'pointer' : 'not-allowed'
                }}
                onMouseOver={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#1d4ed8'; }}
                onMouseOut={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#2563eb'; }}
              >
                {cartItem ? 'Update Cart' : 'Add to Cart'}
              </button>
              <button
                onClick={() => setCurrentView('cart')}
                style={{ padding: '0.75rem 1.5rem', border: '1px solid #2563eb', color: '#2563eb', borderRadius: '0.5rem', fontWeight: '600', transition: 'background-color 0.2s, color 0.2s' }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#e0f2fe'; e.currentTarget.style.color = '#1d4ed8'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#2563eb'; }}
              >
                View Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Cart Page Component
function CartPage() {
  const { cart, setCart, setCurrentView, showGlobalMessage } = useContext(AppContext);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCart(cart.filter(item => item.id !== id));
      showGlobalMessage('Item removed from cart.', 'info');
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
      showGlobalMessage('Cart quantity updated.', 'success');
    }
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
    showGlobalMessage('Item removed from cart.', 'info');
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 50 ? 0 : 9.99; // Free shipping over $50
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1rem', textAlign: 'center' }}>
        <ShoppingCart style={{ width: '6rem', height: '6rem', color: '#9ca3af', margin: '0 auto 1.5rem' }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>Your cart is empty</h2>
        <p style={{ color: '#4b5563', marginBottom: '2rem' }}>Looks like you haven't added any items to your cart yet.</p>
        <button
          onClick={() => setCurrentView('products')}
          style={{ backgroundColor: '#2563eb', color: '#fff', padding: '0.75rem 2rem', borderRadius: '0.5rem', fontWeight: '600', transition: 'background-color 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem' }}>Shopping Cart</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' /* lg:grid-cols-3 */ }}>
        {/* Cart Items */}
        <div style={{ gridColumn: 'span 2 / span 2', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cart.map(item => (
            <div key={item.id} style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '5rem', height: '5rem', objectFit: 'cover', borderRadius: '0.5rem' }}
                />
                <div style={{ flex: '1' }}>
                  <h3 style={{ fontWeight: '600', fontSize: '1.125rem' }}>{item.name}</h3>
                  <p style={{ color: '#4b5563', fontSize: '0.875rem' }}>{item.brand}</p>
                  <p style={{ color: '#2563eb', fontWeight: '600' }}>₹{item.price.toFixed(2)}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{ padding: '0.5rem', transition: 'background-color 0.2s', border: 'none', background: 'none' }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <Minus style={{ width: '1rem', height: '1rem' }} />
                    </button>
                    <span style={{ padding: '0.5rem 1rem', fontWeight: '500' }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{ padding: '0.5rem', transition: 'background-color 0.2s', border: 'none', background: 'none' }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <Plus style={{ width: '1rem', height: '1rem' }} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{ padding: '0.5rem', color: '#ef4444', transition: 'background-color 0.2s', borderRadius: '0.5rem', border: 'none', background: 'none' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <X style={{ width: '1.25rem', height: '1.25rem' }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', padding: '1.5rem', height: 'fit-content' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Order Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#4b5563' }}>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#4b5563' }}>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#4b5563' }}>Tax (8%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <hr style={{ borderTop: '1px dashed #d1d5db', margin: '0.5rem 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '1.125rem' }}>
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
          {shipping > 0 && (
            <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '0.5rem', fontSize: '0.875rem', color: '#1e40af' }}>
              Add ₹{(50 - subtotal).toFixed(2)} more for free shipping!
            </div>
          )}
          <button
            onClick={() => setCurrentView('checkout')}
            disabled={cart.length === 0}
            style={{ width: '100%', backgroundColor: '#2563eb', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', transition: 'background-color 0.2s', marginTop: '1.5rem',
              opacity: cart.length === 0 ? 0.6 : 1,
              cursor: cart.length === 0 ? 'not-allowed' : 'pointer'
            }}
            onMouseOver={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#1d4ed8'; }}
            onMouseOut={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#2563eb'; }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

// Checkout Page Component
function CheckoutPage() {
  const { cart, user, setCurrentView, setShowAuthModal, setAuthMode, showGlobalMessage, setCart } = useContext(AppContext);
  const [shippingAddress, setShippingAddress] = useState(user?.address || '');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
      if (!user) {
          showGlobalMessage('Please sign in to proceed with checkout.', 'error');
          setAuthMode('login');
          setShowAuthModal(true);
      }
      if (cart.length === 0) {
          showGlobalMessage('Your cart is empty. Please add items before checking out.', 'error');
          setCurrentView('products');
      }
  }, [user, cart, setCurrentView, setShowAuthModal, setAuthMode, showGlobalMessage]);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = () => {
    if (!user) {
      showGlobalMessage('You must be logged in to place an order.', 'error');
      setAuthMode('login');
      setShowAuthModal(true);
      return;
    }
    if (cart.length === 0) {
      showGlobalMessage('Your cart is empty!', 'error');
      setCurrentView('products');
      return;
    }
    if (!shippingAddress.trim()) {
      showGlobalMessage('Please enter your shipping address.', 'error');
      return;
    }

    setIsProcessing(true);
    // Simulate payment and order placement
    setTimeout(() => {
      setIsProcessing(false);
      showGlobalMessage(`Order placed successfully for ₹${total.toFixed(2)} using ${paymentMethod}! (Simulated)`, 'success');
      setCart([]); // Clear cart after simulated order
      setCurrentView('profile'); // Redirect to profile/orders page
    }, 2000); // Simulate API call delay
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem' }}>Checkout</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' /* lg:grid-cols-3 */ }}>
        <div style={{ gridColumn: 'span 2 / span 2', backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Shipping Address</h2>
          <textarea
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            placeholder="Enter your full shipping address, e.g., 123 Main St, Anytown, Anystate, 12345"
            rows="4"
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '1rem', resize: 'vertical' }}
          ></textarea>

          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', marginTop: '1.5rem' }}>Payment Method</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ borderRadius: '9999px', border: '1px solid #d1d5db', color: '#2563eb' }}
              />
              <CreditCard style={{ width: '1.25rem', height: '1.25rem', color: '#4b5563' }} />
              <span>Credit/Debit Card</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ borderRadius: '9999px', border: '1px solid #d1d5db', color: '#2563eb' }}
              />
              <img src="https://www.svgrepo.com/show/303157/paypal-2-logo.svg" alt="PayPal" style={{ width: '1.25rem', height: '1.25rem' }} />
              <span>PayPal</span>
            </label>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.75rem' }}>
            (Payment integration is simulated. In a real application, this would redirect to a payment gateway like Stripe or PayPal.)
          </p>
        </div>

        {/* Order Summary in Checkout */}
        <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', padding: '1.5rem', height: 'fit-content' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Order Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: '#4b5563' }}>{item.name} ({item.quantity})</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <hr style={{ borderTop: '1px dashed #d1d5db', margin: '0.5rem 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#4b5563' }}>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#4b5563' }}>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#4b5563' }}>Tax</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <hr style={{ borderTop: '1px solid #d1d5db', margin: '0.5rem 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.125rem' }}>
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={handlePlaceOrder}
            disabled={isProcessing || !user || cart.length === 0}
            style={{ width: '100%', backgroundColor: '#10b981', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', transition: 'background-color 0.2s', marginTop: '1.5rem',
              opacity: (isProcessing || !user || cart.length === 0) ? 0.6 : 1,
              cursor: (isProcessing || !user || cart.length === 0) ? 'not-allowed' : 'pointer'
            }}
            onMouseOver={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#059669'; }}
            onMouseOut={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#10b981'; }}
          >
            {isProcessing ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Profile Page Component
function ProfilePage() {
  const { user, setUser, setCurrentView, showGlobalMessage } = useContext(AppContext);

  // Simulated orders
  const [orders] = useState([
    { id: 'ORD001', date: '2023-10-26', total: 289.97, status: 'Delivered', items: [{ name: 'Wireless Bluetooth Headphones', quantity: 1 }, { name: 'Smart Fitness Watch', quantity: 1 }] },
    { id: 'ORD002', date: '2023-11-15', total: 54.00, status: 'Processing', items: [{ name: 'Organic Cotton T-Shirt', quantity: 2 }] },
  ]);

  const handleLogout = () => {
    setUser(null);
    showGlobalMessage('Logged out successfully!', 'success');
    setCurrentView('home');
  };

  if (!user) {
    return (
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1rem', textAlign: 'center' }}>
            <User style={{ width: '6rem', height: '6rem', color: '#9ca3af', margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>Please log in to view your profile.</h2>
            <button
              onClick={() => setCurrentView('login')} // Should open auth modal
              style={{ backgroundColor: '#2563eb', color: '#fff', padding: '0.75rem 2rem', borderRadius: '0.5rem', fontWeight: '600', transition: 'background-color 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            >
              Go to Login
            </button>
        </div>
    );
  }

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem' }}>My Profile</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' /* lg:grid-cols-3 */ }}>
        {/* User Info */}
        <div style={{ gridColumn: 'span 1 / span 1', backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', padding: '1.5rem', height: 'fit-content' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Account Details</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User style={{ width: '1rem', height: '1rem', color: '#4b5563' }} />
              <span style={{ fontWeight: '500' }}>Username:</span> {user.name}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail style={{ width: '1rem', height: '1rem', color: '#4b5563' }} />
              <span style={{ fontWeight: '500' }}>Email:</span> {user.email}
            </div>
            {user.address && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <MapPin style={{ width: '1rem', height: '1rem', color: '#4b5563', marginTop: '0.25rem' }} />
                    <span style={{ fontWeight: '500' }}>Address:</span> <p>{user.address}</p>
                </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#ef4444', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', transition: 'background-color 0.2s', marginTop: '1.5rem' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
          >
            <LogOut style={{ width: '1.25rem', height: '1.25rem' }} />
            Logout
          </button>
        </div>

        {/* Orders History */}
        <div style={{ gridColumn: 'span 2 / span 2', backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>My Orders</h2>
          {orders.length === 0 ? (
            <p style={{ color: '#6b7280' }}>You haven't placed any orders yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {orders.map(order => (
                <div key={order.id} style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 'bold' }}>Order #{order.id}</span>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Date: {order.date}</span>
                  </div>
                  <p style={{ color: '#4b5563', marginBottom: '0.5rem' }}>Items: {order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', color: '#2563eb' }}>Total: ₹{order.total.toFixed(2)}</span>
                    <span style={{ padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem', fontWeight: '600',
                      backgroundColor: order.status === 'Delivered' ? '#d1fae5' : (order.status === 'Processing' ? '#fefce8' : '#e0f2fe'),
                      color: order.status === 'Delivered' ? '#065f46' : (order.status === 'Processing' ? '#854d09' : '#1e40af')
                    }}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Auth Modal Component
function AuthModal() {
  const { setShowAuthModal, authMode, setAuthMode, setUser, showGlobalMessage } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (authMode === 'login') {
      // Simulate login API call
      setTimeout(() => {
        if (username === 'user' && password === 'password') { // Mock credentials
          setUser({ name: 'Test User', email: 'user@example.com', address: '123 Test St, Test City, TS 12345' });
          showGlobalMessage('Login successful!', 'success');
          setShowAuthModal(false);
        } else {
          showGlobalMessage('Invalid username or password.', 'error');
        }
        setIsSubmitting(false);
      }, 1000);
    } else { // Register mode
      // Simulate registration API call
      setTimeout(() => {
        // In a real app, you'd save this to a database
        showGlobalMessage(`User ${username} registered successfully! Please log in.`, 'success');
        setAuthMode('login'); // Switch to login after registration
        setUsername('');
        setEmail('');
        setPassword('');
        setIsSubmitting(false);
      }, 1000);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: '0', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '100' }}>
      <div style={{ backgroundColor: '#fff', borderRadius: '0.75rem', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', width: '100%', maxWidth: '28rem', padding: '2rem', position: 'relative' }}>
        <button
          onClick={() => setShowAuthModal(false)}
          style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', padding: '0.5rem', cursor: 'pointer', color: '#6b7280' }}
        >
          <X style={{ width: '1.5rem', height: '1.5rem' }} />
        </button>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem' }}>
          {authMode === 'login' ? 'Sign In' : 'Create Account'}
        </h2>

        <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '1rem' }}
          />
          {authMode === 'register' && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '1rem' }}
            />
          )}
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '1rem' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}
            >
              {showPassword ? <EyeOff style={{ width: '1.25rem', height: '1.25rem' }} /> : <Eye style={{ width: '1.25rem', height: '1.25rem' }} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{ backgroundColor: '#2563eb', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', transition: 'background-color 0.2s',
              opacity: isSubmitting ? 0.6 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
            onMouseOver={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#1d4ed8'; }}
            onMouseOut={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#2563eb'; }}
          >
            {isSubmitting ? 'Loading...' : (authMode === 'login' ? 'Sign In' : 'Register')}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#4b5563' }}>
          {authMode === 'login' ? (
            <>
              Don't have an account?{' '}
              <span
                onClick={() => setAuthMode('register')}
                style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setAuthMode('login')}
                style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Sign In
              </span>
            </>
          )}
        </p>
        {authMode === 'login' && (
             <p style={{ textAlign: 'center', fontSize: '0.75em', color: '#888', marginTop: '1em' }}>
                 (Hint: Use username "user" and password "password" to login)
             </p>
         )}
      </div>
    </div>
  );
}

export default App;
