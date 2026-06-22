import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/layout/Breadcrumb';

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, cartTotal } = useApp();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4">
        <Breadcrumb />
        <div className="text-center py-24">
          <ShoppingBag size={64} className="mx-auto text-gray-200 mb-6" />
          <h2 className="text-2xl font-semibold mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/shop" className="bg-primary text-white px-10 py-3 rounded font-medium hover:bg-primary-hover transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const shipping = cartTotal >= 140 ? 0 : 10;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <Breadcrumb />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 pb-4 border-b border-gray-200 text-sm font-medium text-dark">
            <span>Product</span>
            <span className="text-center">Price</span>
            <span className="text-center">Quantity</span>
            <span className="text-center">Subtotal</span>
            <span />
          </div>

          <div className="divide-y divide-gray-100">
            {cart.map((item, idx) => (
              <div key={idx} className="py-5 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center">
                {/* Product */}
                <div className="flex items-center gap-4">
                  <Link to={`/product/${item.id}`} className="w-16 h-16 bg-[#F5F5F5] rounded-md overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover"
                      onError={e => e.target.src = `https://placehold.co/64x64/f5f5f5/999?text=P`} />
                  </Link>
                  <div>
                    <Link to={`/product/${item.id}`} className="text-sm font-medium text-dark hover:text-primary line-clamp-2">{item.name}</Link>
                    {item.selectedColor && (
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-3 h-3 rounded-full border" style={{ backgroundColor: item.selectedColor }} />
                        <span className="text-xs text-gray-500">{item.selectedColor}</span>
                      </div>
                    )}
                    {item.selectedSize && <p className="text-xs text-gray-500 mt-0.5">Size: {item.selectedSize}</p>}
                  </div>
                </div>

                {/* Price */}
                <div className="text-sm text-center">
                  <span className="md:hidden text-gray-500 mr-2">Price:</span>
                  <span className="font-medium">${item.price}</span>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-center">
                  <div className="flex items-center border border-gray-200 rounded overflow-hidden">
                    <button onClick={() => updateCartQuantity(item.id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                      className="px-2.5 py-2 hover:bg-gray-50 transition-colors">
                      <Minus size={12} />
                    </button>
                    <span className="px-4 py-2 text-sm font-medium border-x border-gray-200 min-w-[40px] text-center">
                      {item.quantity}
                    </span>
                    <button onClick={() => updateCartQuantity(item.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                      className="px-2.5 py-2 hover:bg-gray-50 transition-colors">
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="text-sm font-semibold text-primary text-center">
                  <span className="md:hidden text-gray-500 font-normal mr-2">Subtotal:</span>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)}
                  className="text-gray-400 hover:text-primary transition-colors p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
            <Link to="/shop" className="border border-dark text-dark px-8 py-3 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
              Return To Shop
            </Link>
            <button className="border border-dark text-dark px-8 py-3 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
              Update Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="border border-dark rounded-md p-6">
            <h3 className="font-semibold text-lg mb-5">Cart Total</h3>

            <div className="space-y-4 mb-5">
              <div className="flex justify-between text-sm pb-4 border-b border-gray-200">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm pb-4 border-b border-gray-200">
                <span className="text-gray-600">Shipping:</span>
                <span className={`font-medium ${shipping === 0 ? 'text-green-500' : ''}`}>
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm pb-4 border-b border-gray-200">
                <span className="text-gray-600">Tax (8%):</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span className="text-lg">${total.toFixed(2)}</span>
              </div>
            </div>

            {shipping > 0 && (
              <p className="text-xs text-gray-500 mb-4">
                Add ${(140 - cartTotal).toFixed(2)} more to get free shipping!
              </p>
            )}

            <Link to="/checkout"
              className="w-full bg-primary text-white py-3 rounded font-medium flex items-center justify-center hover:bg-primary-hover transition-colors">
              Proceed to Checkout
            </Link>
          </div>

          {/* Coupon */}
          <div className="mt-6">
            <h4 className="font-medium text-sm mb-3">Coupon Code</h4>
            <div className="flex gap-2">
              <input type="text" placeholder="Coupon Code"
                className="flex-1 border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
              <button className="bg-primary text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-primary-hover transition-colors whitespace-nowrap">
                Apply Coupon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
