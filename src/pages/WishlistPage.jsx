import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Rating } from '../components/ui/ProductCard';
import Breadcrumb from '../components/layout/Breadcrumb';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useApp();

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4">
        <Breadcrumb />
        <div className="text-center py-24">
          <Heart size={64} className="mx-auto text-gray-200 mb-6" />
          <h2 className="text-2xl font-semibold mb-3">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-8">Save items you love and come back to them later.</p>
          <Link to="/shop" className="bg-primary text-white px-10 py-3 rounded font-medium hover:bg-primary-hover transition-colors">
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <Breadcrumb />

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-medium">Wishlist (<span className="text-primary">{wishlist.length}</span>)</h1>
        <button
          onClick={() => wishlist.forEach(p => addToCart(p, 1))}
          className="border border-dark text-dark px-8 py-2.5 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Move All To Bag
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {wishlist.map(product => {
          const discount = product.originalPrice > product.price
            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
            : product.discount || 0;

          return (
            <div key={product.id} className="group relative">
              {/* Image Box */}
              <div className="relative bg-[#F5F5F5] rounded-md overflow-hidden aspect-square mb-3">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={e => {
                      e.target.src = `https://placehold.co/300x300/f5f5f5/999?text=${encodeURIComponent(product.name)}`;
                    }}
                  />
                </Link>

                {/* Discount Badge */}
                {discount > 0 && (
                  <span className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-0.5 rounded">
                    -{discount}%
                  </span>
                )}

                {/* Remove from Wishlist */}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-primary hover:text-white transition-colors"
                >
                  <Trash2 size={14} />
                </button>

                {/* Add to Cart - hover overlay */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="w-full py-2.5 bg-dark text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary transition-colors"
                  >
                    <ShoppingCart size={15} />
                    Add To Cart
                  </button>
                </div>
              </div>

              {/* Info */}
              <Link to={`/product/${product.id}`}>
                <h3 className="text-sm font-medium text-dark hover:text-primary transition-colors line-clamp-1 mb-1">
                  {product.name}
                </h3>
              </Link>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-primary font-semibold text-sm">${product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-gray-400 text-sm line-through">${product.originalPrice}</span>
                )}
              </div>
              <Rating value={product.rating} count={product.reviews} small />
            </div>
          );
        })}
      </div>

      {/* Just For You Section */}
      <section className="mt-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-4 h-8 bg-primary rounded-sm" />
            <h2 className="text-xl font-semibold">Just For You</h2>
          </div>
          <Link to="/shop" className="border border-gray-300 text-dark px-6 py-2 rounded text-sm hover:border-primary hover:text-primary transition-colors">
            See All
          </Link>
        </div>
        {/* Placeholder recommended items based on wishlist categories */}
        <p className="text-sm text-gray-500">Browse our full shop to discover more products you'll love.</p>
      </section>
    </div>
  );
}
