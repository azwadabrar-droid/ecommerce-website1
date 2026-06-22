import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, User, Menu, X, ChevronDown, LogOut, Package, Settings } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Header = () => {
  const { cartCount, wishlist, user, logout, setSearchQuery, searchQuery } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Contact', path: '/contact' },
    { label: 'About', path: '/about' },
    { label: 'Sign Up', path: '/register' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-dark text-white py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <p className="text-center flex-1">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{' '}
            <Link to="/shop" className="font-semibold underline hover:text-primary">
              Shop Now
            </Link>
          </p>
          <div className="hidden md:flex items-center gap-2 text-xs">
            <span>English</span>
            <ChevronDown size={12} />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-dark shrink-0">
              Exclusive
            </Link>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-dark hover:text-primary transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Search + Icons */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-100 rounded px-4 py-2 gap-2 w-60">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm flex-1 outline-none text-dark placeholder-gray-400"
                />
                <button type="submit">
                  <Search size={16} className="text-dark cursor-pointer hover:text-primary" />
                </button>
              </form>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative p-1 hover:text-primary transition-colors">
                <Heart size={22} className="text-dark" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative p-1 hover:text-primary transition-colors">
                <ShoppingCart size={22} className="text-dark" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="p-1 hover:text-primary transition-colors"
                >
                  {user ? (
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  ) : (
                    <User size={22} className="text-dark" />
                  )}
                </button>

                {userDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-dark text-white rounded-lg shadow-xl py-2 z-50">
                    {user ? (
                      <>
                        <div className="px-4 py-2 border-b border-gray-600">
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                        <Link to="/profile" onClick={() => setUserDropdown(false)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-700 text-sm transition-colors">
                          <User size={15} /> Manage My Account
                        </Link>
                        <Link to="/orders" onClick={() => setUserDropdown(false)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-700 text-sm transition-colors">
                          <Package size={15} /> My Order
                        </Link>
                        <Link to="/wishlist" onClick={() => setUserDropdown(false)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-700 text-sm transition-colors">
                          <Heart size={15} /> My Wishlist
                        </Link>
                        <button onClick={() => { logout(); setUserDropdown(false); }}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-700 text-sm transition-colors w-full text-left">
                          <LogOut size={15} /> Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" onClick={() => setUserDropdown(false)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-700 text-sm transition-colors">
                          <User size={15} /> Login
                        </Link>
                        <Link to="/register" onClick={() => setUserDropdown(false)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-700 text-sm transition-colors">
                          <Settings size={15} /> Sign Up
                        </Link>
                        <Link to="/wishlist" onClick={() => setUserDropdown(false)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-700 text-sm transition-colors">
                          <Heart size={15} /> My Wishlist
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-1"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
              <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded px-4 py-2 gap-2 mb-4">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm flex-1 outline-none"
                />
                <button type="submit"><Search size={16} /></button>
              </form>
              <nav className="flex flex-col gap-3">
                {navLinks.map(link => (
                  <Link key={link.path} to={link.path} onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-dark hover:text-primary py-1">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
