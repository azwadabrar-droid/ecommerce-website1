import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart, ShoppingCart, Truck, RefreshCw, Minus, Plus, Share2, Star
} from 'lucide-react';
import { getProductById, products } from '../data/products';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ui/ProductCard';
import { Rating } from '../components/ui/ProductCard';
import Breadcrumb from '../components/layout/Breadcrumb';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = getProductById(id);
  const { addToCart, toggleWishlist, isInWishlist } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
  const [activeTab, setActiveTab] = useState('description');
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
        <Link to="/shop" className="text-primary hover:underline">Back to Shop</Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const productImages = product.images || [product.image, product.image, product.image, product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const discountPercent = product.discount > 0 ? product.discount :
    product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  const reviews = [
    { id: 1, user: "Alex M.", rating: 5, date: "Dec 15, 2023", text: "Excellent product! Exactly as described and arrived quickly. Very happy with the purchase.", verified: true },
    { id: 2, user: "Sarah K.", rating: 4, date: "Dec 10, 2023", text: "Good quality and nice design. Shipping was fast. Would recommend to others.", verified: true },
    { id: 3, user: "John D.", rating: 5, date: "Dec 1, 2023", text: "Fantastic! The quality exceeded my expectations. Great value for the price.", verified: false },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      <Breadcrumb currentLabel={product.name} />

      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Images */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3 w-20 shrink-0">
            {productImages.slice(0, 4).map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-colors
                  ${activeImage === i ? 'border-primary' : 'border-transparent hover:border-gray-300'}`}
              >
                <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover bg-[#F5F5F5]"
                  onError={e => e.target.src = `https://placehold.co/80x80/f5f5f5/999?text=${i + 1}`} />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 bg-[#F5F5F5] rounded-lg overflow-hidden aspect-square">
            <img
              src={productImages[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={e => e.target.src = `https://placehold.co/500x500/f5f5f5/999?text=${encodeURIComponent(product.name)}`}
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-semibold text-dark mb-3">{product.name}</h1>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-4 mb-4">
            <Rating value={product.rating} count={product.reviews} />
            <span className="text-sm text-gray-400">|</span>
            <span className="text-sm text-[#00FF66]">In Stock</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-semibold text-primary">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
            )}
            {discountPercent > 0 && (
              <span className="bg-primary text-white text-sm px-2 py-0.5 rounded">-{discountPercent}%</span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed mb-6 pb-6 border-b border-gray-200">
            {product.description}
          </p>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm font-medium w-16 shrink-0">Colours:</span>
              <div className="flex gap-2">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-110
                      ${selectedColor === color ? 'border-dark ring-1 ring-dark ring-offset-1' : 'border-gray-300'}`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium w-16 shrink-0">Size:</span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 border rounded text-sm transition-colors
                      ${selectedSize === size ? 'bg-primary border-primary text-white' : 'border-gray-300 hover:border-primary'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            {/* Quantity */}
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-3 hover:bg-gray-50 transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="px-5 py-3 text-sm font-medium border-x border-gray-300 min-w-[50px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                className="px-3 py-3 hover:bg-gray-50 transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-white py-3 rounded font-medium flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors"
            >
              <ShoppingCart size={18} /> Add To Cart
            </button>

            {/* Wishlist */}
            <button
              onClick={() => toggleWishlist(product)}
              className={`w-12 h-12 rounded border flex items-center justify-center transition-all
                ${inWishlist ? 'bg-primary border-primary text-white' : 'border-gray-300 hover:border-primary hover:text-primary'}`}
            >
              <Heart size={18} className={inWishlist ? 'fill-white' : ''} />
            </button>
          </div>

          {/* Delivery Info */}
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <div className="flex items-center gap-4 p-4 border-b border-gray-200">
              <Truck size={20} className="text-dark shrink-0" />
              <div>
                <p className="text-sm font-medium">Free Delivery</p>
                <p className="text-xs text-gray-500">Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <RefreshCw size={20} className="text-dark shrink-0" />
              <div>
                <p className="text-sm font-medium">Return Delivery</p>
                <p className="text-xs text-gray-500">Free 30 Days Delivery Returns. <Link to="#" className="underline">Details</Link></p>
              </div>
            </div>
          </div>

          {/* Sold count */}
          <div className="mt-4 flex items-center gap-2">
            <div className="h-2 bg-gray-200 rounded-full flex-1">
              <div
                className="h-2 bg-primary rounded-full"
                style={{ width: `${Math.min(100, (product.sold / (product.sold + product.stock)) * 100)}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">{product.sold} sold</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-12">
        <div className="flex border-b border-gray-200 mb-6">
          {['description', 'additional', 'reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium capitalize transition-colors
                ${activeTab === tab ? 'border-b-2 border-dark text-dark' : 'text-gray-500 hover:text-dark'}`}
            >
              {tab === 'reviews' ? `Reviews (${product.reviews})` : tab === 'additional' ? 'Additional Information' : 'Description'}
            </button>
          ))}
        </div>

        {activeTab === 'description' && (
          <div className="text-sm text-gray-600 leading-relaxed max-w-2xl">
            <p className="mb-4">{product.description}</p>
            <p>This premium product is designed to meet the highest standards of quality and performance. Our team of experts has carefully crafted every detail to ensure you get the best possible experience.</p>
          </div>
        )}

        {activeTab === 'additional' && (
          <table className="text-sm w-full max-w-md">
            <tbody>
              {[
                ['Weight', '0.3 kg'],
                ['Dimensions', '15 x 10 x 5 cm'],
                ['Material', 'Premium Grade'],
                ['Warranty', '12 Months'],
                ['Country of Origin', 'Japan'],
              ].map(([key, val]) => (
                <tr key={key} className="border-b border-gray-100">
                  <td className="py-3 pr-8 font-medium text-dark w-40">{key}</td>
                  <td className="py-3 text-gray-600">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6 max-w-2xl">
            {reviews.map(rev => (
              <div key={rev.id} className="border-b border-gray-100 pb-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {rev.user.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{rev.user}</p>
                      <p className="text-xs text-gray-400">{rev.date}</p>
                    </div>
                  </div>
                  {rev.verified && (
                    <span className="text-xs text-[#00FF66] bg-green-50 px-2 py-0.5 rounded">Verified</span>
                  )}
                </div>
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} size={14} className={s <= rev.rating ? 'fill-[#FFAD33] text-[#FFAD33]' : 'text-gray-200'} />
                  ))}
                </div>
                <p className="text-sm text-gray-600">{rev.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-4 h-8 bg-primary rounded-sm" />
            <h2 className="text-xl font-semibold">Related Items</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
