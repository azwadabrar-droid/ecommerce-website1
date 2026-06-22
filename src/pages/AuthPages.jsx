import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

const sideImage = "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=900&fit=crop";

export function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    // Mock auth - accept any email/password
    if (form.email && form.password.length >= 6) {
      login({
        name: form.email.split('@')[0].charAt(0).toUpperCase() + form.email.split('@')[0].slice(1),
        email: form.email,
        id: Date.now(),
      });
      navigate('/');
    } else {
      setError('Please enter a valid email and password (min 6 characters).');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img src={sideImage} alt="Shopping" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-end p-12">
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-2">Exclusive</h2>
            <p className="text-lg opacity-80">The best place to shop online</p>
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-semibold mb-3">Log in to Exclusive</h1>
          <p className="text-gray-500 text-sm mb-8">Enter your details below</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                name="email"
                type="email"
                placeholder="Email or Phone Number"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-primary transition-colors bg-transparent"
              />
            </div>
            <div className="relative">
              <input
                name="password"
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-primary transition-colors bg-transparent pr-10"
              />
              <button type="button" onClick={() => setShowPass(s => !s)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button type="submit"
                className="bg-primary text-white px-10 py-3.5 rounded font-medium hover:bg-primary-hover transition-colors text-sm">
                Log In
              </button>
              <Link to="/forgot-password" className="text-primary text-sm hover:underline">
                Forgot Password?
              </Link>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google Sign In */}
          <button className="w-full border border-gray-200 py-3 rounded flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors text-sm font-medium">
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Sign in with Google
          </button>

          <p className="text-center text-sm mt-6 text-gray-500">
            Don't have account?{' '}
            <Link to="/register" className="text-dark underline font-medium hover:text-primary">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    login({ name: form.name, email: form.email, phone: form.phone, id: Date.now() });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img src={sideImage} alt="Shopping" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-end p-12">
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-2">Exclusive</h2>
            <p className="text-lg opacity-80">The best place to shop online</p>
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-semibold mb-3">Create an account</h1>
          <p className="text-gray-500 text-sm mb-8">Enter your details below</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required
              className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-primary transition-colors bg-transparent" />
            <input name="email" type="email" placeholder="Email or Phone Number" value={form.email} onChange={handleChange} required
              className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-primary transition-colors bg-transparent" />
            <input name="phone" type="tel" placeholder="Phone Number (Optional)" value={form.phone} onChange={handleChange}
              className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-primary transition-colors bg-transparent" />
            <div className="relative">
              <input name="password" type={showPass ? 'text' : 'password'} placeholder="Password" value={form.password} onChange={handleChange} required
                className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-primary transition-colors bg-transparent pr-10" />
              <button type="button" onClick={() => setShowPass(s => !s)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button type="submit"
              className="w-full bg-primary text-white py-3.5 rounded font-medium hover:bg-primary-hover transition-colors text-sm">
              Create Account
            </button>
          </form>

          {/* Google */}
          <button className="w-full border border-gray-200 py-3 rounded flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors text-sm font-medium mt-4">
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Sign up with Google
          </button>

          <p className="text-center text-sm mt-6 text-gray-500">
            Already have account?{' '}
            <Link to="/login" className="text-dark underline font-medium hover:text-primary">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
