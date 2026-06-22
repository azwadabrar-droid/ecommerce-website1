import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Filter, Grid, List, ChevronDown, ChevronRight, X, SlidersHorizontal } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import Breadcrumb from '../components/layout/Breadcrumb';

const SORT_OPTIONS = [
  { value: 'default', label: 'Default Sorting' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest First' },
];

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $300', min: 100, max: 300 },
  { label: '$300 - $500', min: 300, max: 500 },
  { label: 'Over $500', min: 500, max: Infinity },
];

export default function ShopPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const [selectedCategory, setSelectedCategory] = useState(params.get('category') || '');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState(0);
  const [searchQuery, setSearchQuery] = useState(params.get('search') || '');
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState({ categories: true, price: true });
  const perPage = 12;

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    setSelectedCategory(p.get('category') || '');
    setSearchQuery(p.get('search') || '');
    setPage(1);
  }, [location.search]);

  // Filter & sort
  let filtered = [...products];

  if (selectedCategory) {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  const filter = params.get('filter');
  if (filter === 'flash-sale') filtered = filtered.filter(p => p.isFlashSale);
  if (filter === 'best-selling') filtered = filtered.filter(p => p.isBestSelling);

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }

  const { min, max } = PRICE_RANGES[priceRange];
  filtered = filtered.filter(p => p.price >= min && p.price <= max);

  switch (sortBy) {
    case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
    case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
    case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
    default: break;
  }

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const handleCategoryChange = (slug) => {
    setSelectedCategory(slug);
    setPage(1);
    const p = new URLSearchParams(location.search);
    if (slug) p.set('category', slug);
    else p.delete('category');
    navigate({ search: p.toString() });
    setSidebarOpen(false);
  };

  const SidebarContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <button
          onClick={() => setFilterOpen(f => ({ ...f, categories: !f.categories }))}
          className="flex items-center justify-between w-full font-semibold text-sm text-dark mb-3"
        >
          Category <ChevronDown size={14} className={`transition-transform ${filterOpen.categories ? 'rotate-180' : ''}`} />
        </button>
        {filterOpen.categories && (
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleCategoryChange('')}
                className={`text-sm w-full text-left py-1 px-2 rounded transition-colors ${!selectedCategory ? 'text-primary font-medium bg-red-50' : 'text-gray-600 hover:text-primary'}`}
              >
                All Products
              </button>
            </li>
            {categories.map(cat => (
              <li key={cat.id}>
                <button
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`text-sm w-full text-left py-1 px-2 rounded transition-colors flex items-center gap-2
                    ${selectedCategory === cat.slug ? 'text-primary font-medium bg-red-50' : 'text-gray-600 hover:text-primary'}`}
                >
                  <ChevronRight size={12} className="shrink-0" /> {cat.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <hr className="border-gray-200" />

      {/* Price Range */}
      <div>
        <button
          onClick={() => setFilterOpen(f => ({ ...f, price: !f.price }))}
          className="flex items-center justify-between w-full font-semibold text-sm text-dark mb-3"
        >
          Price Range <ChevronDown size={14} className={`transition-transform ${filterOpen.price ? 'rotate-180' : ''}`} />
        </button>
        {filterOpen.price && (
          <ul className="space-y-2">
            {PRICE_RANGES.map((range, i) => (
              <li key={i}>
                <button
                  onClick={() => { setPriceRange(i); setPage(1); }}
                  className={`text-sm w-full text-left py-1 px-2 rounded transition-colors
                    ${priceRange === i ? 'text-primary font-medium bg-red-50' : 'text-gray-600 hover:text-primary'}`}
                >
                  {range.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <hr className="border-gray-200" />

      {/* Clear Filters */}
      <button
        onClick={() => { setSelectedCategory(''); setPriceRange(0); setSortBy('default'); navigate('/shop'); }}
        className="text-sm text-primary hover:underline"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4">
      <Breadcrumb />

      <div className="flex gap-8">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:block w-56 shrink-0">
          <SidebarContent />
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <div className="relative bg-white w-72 p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold">Filters</h2>
                <button onClick={() => setSidebarOpen(false)}><X size={18} /></button>
              </div>
              <SidebarContent />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden flex items-center gap-2 text-sm border border-gray-200 rounded px-3 py-2 hover:border-primary hover:text-primary"
              >
                <SlidersHorizontal size={15} /> Filters
              </button>
              <p className="text-sm text-gray-500">
                Showing <span className="text-dark font-medium">{(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)}</span> of <span className="text-dark font-medium">{filtered.length}</span> results
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="text-sm border border-gray-200 rounded px-3 py-2 pr-8 appearance-none cursor-pointer focus:outline-none focus:border-primary"
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
              </div>

              {/* View Toggle */}
              <div className="flex items-center border border-gray-200 rounded overflow-hidden">
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 ${view === 'grid' ? 'bg-primary text-white' : 'hover:bg-gray-50'}`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2 ${view === 'list' ? 'bg-primary text-white' : 'hover:bg-gray-50'}`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory || priceRange > 0) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCategory && (
                <span className="flex items-center gap-1 bg-red-50 text-primary text-xs px-3 py-1 rounded-full">
                  {categories.find(c => c.slug === selectedCategory)?.name}
                  <button onClick={() => handleCategoryChange('')}><X size={12} /></button>
                </span>
              )}
              {priceRange > 0 && (
                <span className="flex items-center gap-1 bg-red-50 text-primary text-xs px-3 py-1 rounded-full">
                  {PRICE_RANGES[priceRange].label}
                  <button onClick={() => setPriceRange(0)}><X size={12} /></button>
                </span>
              )}
            </div>
          )}

          {/* Products Grid/List */}
          {paged.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🔍</p>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search terms.</p>
              <button onClick={() => { setSelectedCategory(''); setPriceRange(0); navigate('/shop'); }}
                className="bg-primary text-white px-8 py-3 rounded hover:bg-primary-hover transition-colors text-sm">
                Clear Filters
              </button>
            </div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {paged.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {paged.map(p => (
                <div key={p.id} className="flex gap-4 border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
                  <Link to={`/product/${p.id}`} className="shrink-0 w-32 h-32 bg-[#F5F5F5] rounded-md overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover"
                      onError={e => e.target.src = `https://placehold.co/128x128/f5f5f5/999?text=${encodeURIComponent(p.name)}`} />
                  </Link>
                  <div className="flex-1">
                    <Link to={`/product/${p.id}`}>
                      <h3 className="font-medium text-dark hover:text-primary mb-1">{p.name}</h3>
                    </Link>
                    <p className="text-sm text-gray-500 mb-2 line-clamp-2">{p.description}</p>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-primary font-semibold">${p.price}</span>
                      {p.originalPrice > p.price && <span className="text-gray-400 line-through text-sm">${p.originalPrice}</span>}
                    </div>
                    <button onClick={() => window.dispatchEvent(new CustomEvent('add-to-cart', { detail: p }))}
                      className="bg-primary text-white px-6 py-2 rounded text-sm hover:bg-primary-hover transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-9 h-9 rounded flex items-center justify-center border border-gray-200 hover:border-primary hover:text-primary disabled:opacity-40 transition-colors"
              >
                &lsaquo;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded text-sm font-medium transition-colors
                    ${page === p ? 'bg-primary text-white' : 'border border-gray-200 hover:border-primary hover:text-primary'}`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-9 h-9 rounded flex items-center justify-center border border-gray-200 hover:border-primary hover:text-primary disabled:opacity-40 transition-colors"
              >
                &rsaquo;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
