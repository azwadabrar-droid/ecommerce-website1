import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Notification } from './components/ui/Notification';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import { CheckoutPage, OrderCompletePage } from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Pages that don't show header/footer
const FULLSCREEN_PATHS = ['/login', '/register'];

function Layout() {
  const location = useLocation();
  const isFullscreen = FULLSCREEN_PATHS.includes(location.pathname);

  return (
    <>
      <Notification />
      {!isFullscreen && <Header />}
      <main className={isFullscreen ? '' : 'min-h-screen'}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-complete" element={<OrderCompletePage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isFullscreen && <Footer />}
    </>
  );
}

function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-32 text-center">
      <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-500 mb-8">Sorry, the page you are looking for doesn't exist.</p>
      <div className="flex gap-4 justify-center">
        <a href="/" className="bg-primary text-white px-8 py-3 rounded font-medium hover:bg-primary-hover transition-colors">
          Back to Home
        </a>
        <a href="/shop" className="border border-gray-300 text-dark px-8 py-3 rounded font-medium hover:bg-gray-50 transition-colors">
          Browse Shop
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Layout />
      </AppProvider>
    </BrowserRouter>
  );
}
