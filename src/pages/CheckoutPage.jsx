import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/layout/Breadcrumb';

export function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '', lastName: '', company: '', address: '', apartment: '',
    city: '', phone: '', email: '', saveInfo: false, paymentMethod: 'card',
    cardNumber: '', cardName: '', expiry: '', cvv: '',
  });

  const shipping = cartTotal >= 140 ? 0 : 10;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    navigate('/order-complete');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">No items to checkout</h2>
        <Link to="/shop" className="text-primary hover:underline">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <Breadcrumb />
      <h1 className="text-2xl font-semibold mb-8">Billing Details</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10">
          {/* Left: Form */}
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2">First Name <span className="text-primary">*</span></label>
                <input name="firstName" value={form.firstName} onChange={handleChange} required
                  className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name <span className="text-primary">*</span></label>
                <input name="lastName" value={form.lastName} onChange={handleChange} required
                  className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Company Name (Optional)</label>
              <input name="company" value={form.company} onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Street Address <span className="text-primary">*</span></label>
              <input name="address" value={form.address} onChange={handleChange} required
                className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Apartment, floor, etc. (Optional)</label>
              <input name="apartment" value={form.apartment} onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Town/City <span className="text-primary">*</span></label>
              <input name="city" value={form.city} onChange={handleChange} required
                className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number <span className="text-primary">*</span></label>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} required
                  className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address <span className="text-primary">*</span></label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required
                  className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary" />
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="saveInfo" checked={form.saveInfo} onChange={handleChange}
                className="w-4 h-4 accent-primary" />
              <span className="text-sm">Save this information for faster check-out next time</span>
            </label>

            {/* Payment */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="font-semibold mb-4">Payment Method</h3>
              <div className="space-y-3 mb-5">
                {[
                  { id: 'card', label: 'Credit/Debit Card' },
                  { id: 'paypal', label: 'PayPal' },
                  { id: 'cod', label: 'Cash on Delivery' },
                ].map(method => (
                  <label key={method.id} className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="paymentMethod" value={method.id}
                      checked={form.paymentMethod === method.id} onChange={handleChange}
                      className="w-4 h-4 accent-primary" />
                    <span className="text-sm">{method.label}</span>
                  </label>
                ))}
              </div>

              {form.paymentMethod === 'card' && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium mb-2">Card Number</label>
                    <input name="cardNumber" value={form.cardNumber} onChange={handleChange}
                      placeholder="1234 5678 9012 3456" maxLength={19}
                      className="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Name on Card</label>
                    <input name="cardName" value={form.cardName} onChange={handleChange}
                      className="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary bg-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Expiry Date</label>
                      <input name="expiry" value={form.expiry} onChange={handleChange}
                        placeholder="MM/YY" maxLength={5}
                        className="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CVV</label>
                      <input name="cvv" value={form.cvv} onChange={handleChange}
                        placeholder="123" maxLength={4} type="password"
                        className="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary bg-white" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div>
            <div className="border border-gray-200 rounded-lg p-6 sticky top-24">
              <h3 className="font-semibold mb-5">Order Summary</h3>

              <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
                {cart.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="relative shrink-0 w-14 h-14 bg-[#F5F5F5] rounded-md overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover"
                        onError={e => e.target.src = 'https://placehold.co/56x56/f5f5f5/999?text=P'} />
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                      {item.selectedSize && <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>}
                    </div>
                    <span className="text-sm font-semibold shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-500' : ''}>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-base border-t border-gray-200 pt-3">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button type="submit"
                className="w-full mt-6 bg-primary text-white py-3.5 rounded font-semibold hover:bg-primary-hover transition-colors">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export function OrderCompletePage() {
  const orderId = `EXC-${Date.now().toString().slice(-6)}`;
  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <Breadcrumb />
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h1 className="text-3xl font-semibold mb-3">Order Placed Successfully!</h1>
        <p className="text-gray-500 mb-2">Thank you for your purchase. Your order has been confirmed.</p>
        <p className="text-sm text-gray-400 mb-8">Order ID: <span className="font-mono font-semibold text-dark">{orderId}</span></p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <h3 className="font-semibold mb-4">What happens next?</h3>
          <div className="space-y-3">
            {[
              { step: '1', label: 'Order Confirmation', desc: 'You will receive an email confirmation shortly' },
              { step: '2', label: 'Processing', desc: 'Your order is being prepared (1-2 business days)' },
              { step: '3', label: 'Shipped', desc: 'Your package is on its way to you' },
              { step: '4', label: 'Delivered', desc: 'Enjoy your purchase!' },
            ].map(item => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                  {item.step}
                </div>
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/orders" className="bg-primary text-white px-8 py-3 rounded font-medium hover:bg-primary-hover transition-colors">
            View My Orders
          </Link>
          <Link to="/shop" className="border border-gray-300 text-dark px-8 py-3 rounded font-medium hover:bg-gray-50 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
