import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingCart, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Rating = ({ value, count, small = false }) => {
  return (
    <div className={`flex items-center gap-${small ? '1' : '2'}`}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            size={small ? 12 : 14}
            className={star <= Math.floor(value) ? 'fill-[#FFAD33] text-[#FFAD33]' : 'text-gray-300'}
          />
        ))}
      </div>
      {count !== undefined && (
        <span className={`text-gray-400 ${small ? 'text-xs' : 'text-sm'}`}>({count})</span>
      )}
    </div>
  );
};

const ProductCard = ({ product, showQuickActions = true }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const [hovered, setHovered] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const discountPercent = product.discount > 0 ? product.discount :
    product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <div
      className="group relative bg-white rounded overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Container */}
      <div className="relative bg-[#F5F5F5] overflow-hidden rounded-md aspect-square">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = `https://placehold.co/300x300/f5f5f5/999?text=${encodeURIComponent(product.name)}`;
            }}
          />
        </Link>

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <span className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded">
            -{discountPercent}%
          </span>
        )}

        {/* New Badge */}
        {product.badge && !discountPercent && (
          <span className={`absolute top-3 left-3 text-white text-xs px-2 py-1 rounded
            ${product.badge === 'NEW' ? 'bg-[#00FF66] text-dark' : 'bg-primary'}`}>
            {product.badge}
          </span>
        )}

        {/* Action Buttons */}
        {showQuickActions && (
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              onClick={() => toggleWishlist(product)}
              className={`w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200 ${inWishlist ? 'bg-primary text-white' : 'text-dark'}`}
            >
              <Heart size={14} className={inWishlist ? 'fill-white' : ''} />
            </button>
            <Link
              to={`/product/${product.id}`}
              className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200 text-dark"
            >
              <Eye size={14} />
            </Link>
          </div>
        )}

        {/* Add to Cart - shows on hover */}
        <div className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${hovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          <button
            onClick={() => addToCart(product)}
            className="w-full py-2.5 bg-dark text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary transition-colors"
          >
            <ShoppingCart size={16} />
            Add To Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="pt-3 pb-1">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-dark hover:text-primary transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-primary font-semibold text-sm">${product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-gray-400 text-sm line-through">${product.originalPrice}</span>
          )}
        </div>
        <Rating value={product.rating} count={product.reviews} />

        {/* Color Options */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-1.5 mt-2">
            {product.colors.slice(0, 4).map((color, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full border border-gray-300 cursor-pointer hover:scale-125 transition-transform"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { Rating };
export default ProductCard;
