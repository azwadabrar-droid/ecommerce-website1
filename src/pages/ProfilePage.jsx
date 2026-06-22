import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, Heart, MapPin, Settings, LogOut, Camera, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/layout/Breadcrumb';

const sidebarItems = [
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'orders', label: 'My Orders', icon: Package },
  { id: 'wishlist', label: 'My Wishlist', icon: Heart },
  { id: 'address', label: 'My Address', icon: MapPin },
  { id: 'settings', label: 'Account Settings', icon: Settings },
];

export default function ProfilePage() {
  const { user, login, logout } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Please log in to view your account</h2>
        <Link to="/login" className="bg-primary text-white px-8 py-3 rounded font-medium hover:bg-primary-hover transition-colors">
          Log In
        </Link>
      </div>
    );
  }

  const handleSave = () => {
    login({ ...user, name: form.name, email: form.email, phone: form.phone });
    setEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const savedAddresses = [
    { id: 1, label: 'Home', address: '123 Main Street, Dhaka, Bangladesh', phone: '+880 1712-345678', isDefault: true },
    { id: 2, label: 'Work', address: '456 Office Road, Gulshan, Dhaka', phone: '+880 1812-987654', isDefault: false },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <Breadcrumb />

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="w-56 shrink-0 hidden md:block">
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Manage My Account</p>
            <ul className="space-y-1">
              {sidebarItems.map(item => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 text-sm px-3 py-2.5 rounded-md transition-colors text-left
                        ${activeTab === item.id ? 'bg-red-50 text-primary font-medium' : 'text-gray-600 hover:text-primary hover:bg-gray-50'}`}
                    >
                      <Icon size={15} />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 text-sm px-3 py-2.5 rounded-md text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
            >
              <LogOut size={15} /> Log Out
            </button>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Mobile tab selector */}
          <div className="md:hidden flex overflow-x-auto gap-2 mb-6 pb-2">
            {sidebarItems.map(item => {
              const Icon = item.icon;
              return (
                <button key={item.id} onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap shrink-0 transition-colors
                    ${activeTab === item.id ? 'bg-primary text-white' : 'border border-gray-200 text-gray-600'}`}>
                  <Icon size={13} /> {item.label}
                </button>
              );
            })}
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-primary">Edit Your Profile</h2>
              </div>

              {/* Avatar */}
              <div className="flex items-center gap-5 mb-8">
                <div className="relative">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <button className="absolute bottom-0 right-0 w-6 h-6 bg-dark rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors">
                    <Camera size={12} />
                  </button>
                </div>
                <div>
                  <p className="font-semibold text-lg">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    disabled={!editing}
                    className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary disabled:opacity-70" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    disabled={!editing} type="email"
                    className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary disabled:opacity-70" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    disabled={!editing} type="tel" placeholder="Your phone number"
                    className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary disabled:opacity-70" />
                </div>
              </div>

              {/* Password Section */}
              {editing && (
                <div className="border-t border-gray-200 pt-5 mb-6">
                  <p className="text-sm font-medium mb-4">Password Changes</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['currentPassword', 'newPassword', 'confirmPassword'].map(field => (
                      <div key={field} className="relative">
                        <label className="block text-xs text-gray-500 mb-1 capitalize">
                          {field.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <input type={showPass ? 'text' : 'password'}
                          value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                          className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary pr-10" />
                        <button type="button" onClick={() => setShowPass(s => !s)}
                          className="absolute right-3 bottom-3 text-gray-400">
                          {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 justify-end">
                {editing ? (
                  <>
                    <button onClick={() => setEditing(false)}
                      className="border border-gray-300 text-dark px-6 py-2.5 rounded text-sm hover:bg-gray-50 transition-colors">
                      Cancel
                    </button>
                    <button onClick={handleSave}
                      className="bg-primary text-white px-8 py-2.5 rounded text-sm font-medium hover:bg-primary-hover transition-colors">
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button onClick={() => setEditing(true)}
                    className="bg-primary text-white px-8 py-2.5 rounded text-sm font-medium hover:bg-primary-hover transition-colors">
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">My Orders</h2>
              <div className="space-y-4">
                {[
                  { id: 'EXC-001', date: 'Dec 15, 2023', status: 'Delivered', total: 450, items: 3 },
                  { id: 'EXC-002', date: 'Nov 28, 2023', status: 'Processing', total: 320, items: 2 },
                  { id: 'EXC-003', date: 'Nov 10, 2023', status: 'Shipped', total: 195, items: 1 },
                ].map(order => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-5 hover:border-primary transition-colors">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="font-mono font-semibold text-sm">{order.id}</p>
                        <p className="text-xs text-gray-500 mt-1">{order.date} · {order.items} items</p>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium
                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-blue-100 text-blue-600'}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">${order.total}</p>
                      <button className="text-sm text-primary hover:underline">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">My Wishlist</h2>
              <p className="text-gray-500 text-sm mb-4">
                Visit your <Link to="/wishlist" className="text-primary hover:underline">wishlist page</Link> to manage your saved items.
              </p>
              <Link to="/wishlist" className="bg-primary text-white px-8 py-3 rounded text-sm font-medium hover:bg-primary-hover transition-colors inline-block">
                View Wishlist
              </Link>
            </div>
          )}

          {/* Address Tab */}
          {activeTab === 'address' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">My Addresses</h2>
                <button className="bg-primary text-white px-6 py-2 rounded text-sm font-medium hover:bg-primary-hover transition-colors">
                  + Add New Address
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedAddresses.map(addr => (
                  <div key={addr.id} className={`border rounded-lg p-5 relative ${addr.isDefault ? 'border-primary' : 'border-gray-200'}`}>
                    {addr.isDefault && (
                      <span className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-0.5 rounded">Default</span>
                    )}
                    <p className="font-semibold mb-1">{addr.label}</p>
                    <p className="text-sm text-gray-600 mb-1">{addr.address}</p>
                    <p className="text-sm text-gray-600 mb-3">{addr.phone}</p>
                    <div className="flex gap-3">
                      <button className="text-sm text-primary hover:underline">Edit</button>
                      <button className="text-sm text-gray-400 hover:text-primary">Delete</button>
                      {!addr.isDefault && (
                        <button className="text-sm text-gray-400 hover:text-primary">Set as Default</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
              <div className="space-y-4">
                {[
                  { label: 'Email Notifications', desc: 'Receive order updates and promotions' },
                  { label: 'SMS Notifications', desc: 'Get delivery updates via SMS' },
                  { label: 'Two-Factor Authentication', desc: 'Add an extra layer of security' },
                  { label: 'Newsletter Subscription', desc: 'Stay updated with latest deals' },
                ].map((setting, i) => (
                  <div key={i} className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div>
                      <p className="text-sm font-medium">{setting.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{setting.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={i < 2} />
                      <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                    </label>
                  </div>
                ))}
                <div className="pt-4">
                  <button onClick={handleLogout}
                    className="bg-primary text-white px-8 py-3 rounded text-sm font-medium hover:bg-primary-hover transition-colors">
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
