import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/layout/Breadcrumb';

const mockOrders = [
  {
    id: 'EXC-001234',
    date: 'December 15, 2023',
    status: 'Delivered',
    total: 450.00,
    items: [
      { name: 'HAVIT HV-G92 Gamepad', price: 120, qty: 1, image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=100&h=100&fit=crop' },
      { name: 'AK-900 Wired Keyboard', price: 330, qty: 1, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100&h=100&fit=crop' },
    ],
    address: '123 Main St, Dhaka, Bangladesh',
    tracking: 'BD123456789',
  },
  {
    id: 'EXC-001235',
    date: 'November 28, 2023',
    status: 'Processing',
    total: 320.00,
    items: [
      { name: 'IPS LCD Gaming Monitor', price: 320, qty: 1, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=100&h=100&fit=crop' },
    ],
    address: '456 Office Rd, Gulshan, Dhaka',
    tracking: null,
  },
  {
    id: 'EXC-001236',
    date: 'November 10, 2023',
    status: 'Shipped',
    total: 195.00,
    items: [
      { name: 'S-Series Comfort Chair', price: 195, qty: 1, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop' },
    ],
    address: '123 Main St, Dhaka, Bangladesh',
    tracking: 'BD987654321',
  },
];

const STATUS_COLORS = {
  Delivered: 'bg-green-100 text-green-700',
  Processing: 'bg-yellow-100 text-yellow-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Cancelled: 'bg-red-100 text-red-700',
  Pending: 'bg-gray-100 text-gray-700',
};

const ORDER_STEPS = ['Order Placed', 'Processing', 'Shipped', 'Delivered'];

export default function OrdersPage() {
  const { user } = useApp();
  const [expanded, setExpanded] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-200 mb-6" />
        <h2 className="text-2xl font-semibold mb-4">Please log in to view your orders</h2>
        <Link to="/login" className="bg-primary text-white px-8 py-3 rounded font-medium hover:bg-primary-hover transition-colors">
          Log In
        </Link>
      </div>
    );
  }

  const filters = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  const filtered = activeFilter === 'All'
    ? mockOrders
    : mockOrders.filter(o => o.status === activeFilter);

  const getStepIndex = (status) => {
    if (status === 'Processing') return 1;
    if (status === 'Shipped') return 2;
    if (status === 'Delivered') return 3;
    return 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <Breadcrumb />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">My Orders</h1>
        <span className="text-sm text-gray-500">{mockOrders.length} total orders</span>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-5 py-2 rounded-full text-sm whitespace-nowrap transition-colors
              ${activeFilter === f ? 'bg-primary text-white' : 'border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Package size={48} className="mx-auto text-gray-200 mb-4" />
          <p className="text-gray-500">No orders found for this filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(order => {
            const isOpen = expanded === order.id;
            const stepIdx = getStepIndex(order.status);

            return (
              <div key={order.id} className="border border-gray-200 rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
                {/* Order Header */}
                <div className="p-5 flex flex-wrap items-start gap-4 justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Package size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-mono font-semibold text-sm">{order.id}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{order.date}</p>
                      <p className="text-xs text-gray-500">{order.items.length} item{order.items.length > 1 ? 's' : ''} · ${order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 ml-auto">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-700'}`}>
                      {order.status}
                    </span>
                    <button
                      onClick={() => setExpanded(isOpen ? null : order.id)}
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isOpen && (
                  <div className="border-t border-gray-100 px-5 pb-5 pt-4">
                    {/* Progress Stepper */}
                    {order.status !== 'Cancelled' && (
                      <div className="mb-6">
                        <div className="flex items-center gap-0">
                          {ORDER_STEPS.map((step, i) => (
                            <div key={step} className="flex items-center flex-1 last:flex-none">
                              <div className="flex flex-col items-center">
                                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors
                                  ${i <= stepIdx ? 'bg-primary border-primary text-white' : 'border-gray-300 text-gray-300'}`}>
                                  {i < stepIdx ? '✓' : i + 1}
                                </div>
                                <span className={`text-xs mt-1 whitespace-nowrap ${i <= stepIdx ? 'text-primary font-medium' : 'text-gray-400'}`}>
                                  {step}
                                </span>
                              </div>
                              {i < ORDER_STEPS.length - 1 && (
                                <div className={`flex-1 h-0.5 mx-2 mb-4 ${i < stepIdx ? 'bg-primary' : 'bg-gray-200'}`} />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Items */}
                    <div className="space-y-3 mb-4">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <img src={item.image} alt={item.name}
                            className="w-14 h-14 rounded-md object-cover bg-white"
                            onError={e => e.target.src = 'https://placehold.co/56x56/f5f5f5/999?text=P'} />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                          </div>
                          <span className="text-sm font-semibold">${item.price}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer Info */}
                    <div className="flex flex-wrap gap-6 text-sm border-t border-gray-100 pt-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Delivery Address</p>
                        <p className="font-medium">{order.address}</p>
                      </div>
                      {order.tracking && (
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Tracking Number</p>
                          <p className="font-mono font-medium">{order.tracking}</p>
                        </div>
                      )}
                      <div className="ml-auto flex gap-2 items-start">
                        {order.status === 'Delivered' && (
                          <button className="text-xs bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover transition-colors">
                            Write Review
                          </button>
                        )}
                        <button className="text-xs border border-gray-200 text-dark px-4 py-2 rounded hover:border-primary hover:text-primary transition-colors">
                          Get Invoice
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
