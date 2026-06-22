import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [compareList, setCompareList] = useState([]);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Cart actions
  const addToCart = (product, quantity = 1, selectedColor = null, selectedSize = null) => {
    setCart(prev => {
      const existing = prev.find(item =>
        item.id === product.id &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize
      );
      if (existing) {
        return prev.map(item =>
          item.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity, selectedColor, selectedSize }];
    });
    showNotification(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId, selectedColor, selectedSize) => {
    setCart(prev => prev.filter(item =>
      !(item.id === productId &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize)
    ));
    showNotification('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId, quantity, selectedColor, selectedSize) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor, selectedSize);
      return;
    }
    setCart(prev => prev.map(item =>
      item.id === productId &&
      item.selectedColor === selectedColor &&
      item.selectedSize === selectedSize
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Wishlist actions
  const addToWishlist = (product) => {
    setWishlist(prev => {
      if (prev.find(item => item.id === product.id)) {
        showNotification('Already in wishlist', 'info');
        return prev;
      }
      showNotification(`${product.name} added to wishlist!`);
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
    showNotification('Removed from wishlist', 'info');
  };

  const isInWishlist = (productId) => wishlist.some(item => item.id === productId);

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // User actions
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    showNotification(`Welcome back, ${userData.name}!`);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    showNotification('Logged out successfully', 'info');
  };

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart, updateCartQuantity, clearCart, cartTotal, cartCount,
      wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist,
      compareList, setCompareList,
      user, login, logout,
      searchQuery, setSearchQuery,
      notification, showNotification,
    }}>
      {children}
    </AppContext.Provider>
  );
};
