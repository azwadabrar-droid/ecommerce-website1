import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Truck, Headphones, ShieldCheck } from 'lucide-react';

// product data
import {
  flashSaleProducts, bestSellingProducts, featuredProducts, categories, testimonials,
} from '../data/products';

// real Figma assets
import heroIphone14        from '../assets/images/hero-iphone14.jpg';
import heroShoppingWomen   from '../assets/images/hero-shopping-women.jpg';
import heroFashionHat      from '../assets/images/hero-fashion-hat.jpg';
import iconApple           from '../assets/icons/logo-apple.png';
import badgeGooglePlay     from '../assets/icons/badge-google-play.png';
import badgeAppStore       from '../assets/icons/badge-app-store.png';
import imgQRCode           from '../assets/icons/qr-code.png';
import personManBlue       from '../assets/images/person-man-blue.png';
import personWoman         from '../assets/images/person-woman-business.png';
import personManSuit       from '../assets/images/person-man-suit.png';
import imgPS5Console       from '../assets/images/product-ps5-console.png';
import imgJBLSpeaker       from '../assets/images/product-jbl-speaker.png';
import imgAmazonSpeaker    from '../assets/images/product-amazon-speaker.png';
import imgJacketGreen      from '../assets/images/product-jacket-green.png';
import imgGucciPerfume     from '../assets/images/product-gucci-perfume.png';

import ProductCard from '../components/ui/ProductCard';
import { SectionHeader } from '../components/ui/Notification';

/* ─── Countdown ──────────────────────────────────────────────────── */
const CountdownTimer = () => {
  const [t, setT] = useState(3 * 3600 + 23 * 60 + 19);
  useEffect(() => { const id = setInterval(() => setT(v => Math.max(0, v - 1)), 1000); return () => clearInterval(id); }, []);
  const h = String(Math.floor(t / 3600)).padStart(2, '0');
  const m = String(Math.floor((t % 3600) / 60)).padStart(2, '0');
  const s = String(t % 60).padStart(2, '0');
  const Box = ({ v, label }) => (
    <div className="flex flex-col items-center">
      <span className="text-xs font-medium text-dark mb-1">{label}</span>
      <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center shadow font-bold text-xl text-dark">{v}</div>
    </div>
  );
  return (
    <div className="flex items-end gap-3">
      <Box v="03" label="Days" />
      <span className="text-primary font-bold text-3xl pb-3">:</span>
      <Box v={h} label="Hours" />
      <span className="text-primary font-bold text-3xl pb-3">:</span>
      <Box v={m} label="Minutes" />
      <span className="text-primary font-bold text-3xl pb-3">:</span>
      <Box v={s} label="Seconds" />
    </div>
  );
};

const CountdownSmall = () => {
  const [t, setT] = useState(5 * 3600 + 30 * 60 + 45);
  useEffect(() => { const id = setInterval(() => setT(v => Math.max(0, v - 1)), 1000); return () => clearInterval(id); }, []);
  const h = String(Math.floor(t / 3600)).padStart(2, '0');
  const m = String(Math.floor((t % 3600) / 60)).padStart(2, '0');
  const s = String(t % 60).padStart(2, '0');
  const boxes = [
    { v: h,    l: 'Hours'   },
    { v: '05', l: 'Days'    },
    { v: m,    l: 'Minutes' },
    { v: s,    l: 'Seconds' },
  ];
  return (
    <div className="flex items-center gap-4">
      {boxes.map((b, i) => (
        <div key={i}
          className="w-16 h-16 rounded-full border-2 border-white bg-transparent flex flex-col items-center justify-center leading-none">
          <span className="text-white font-bold text-lg">{b.v}</span>
          <span className="text-white text-[10px] mt-0.5">{b.l}</span>
        </div>
      ))}
    </div>
  );
};

/* ─── Hero Slider ────────────────────────────────────────────────── */
const heroSlides = [
  { id: 1, badge: 'iPhone 14 Series', title: 'Up to 10%\noff Voucher',      img: heroIphone14,      bg: '#000000' },
  { id: 2, badge: 'Summer Sale',      title: 'Best Collection\nof the Season', img: heroShoppingWomen, bg: '#181818' },
  { id: 3, badge: 'Latest Fashion',   title: 'Exclusive\nStyle Awaits',      img: heroFashionHat,    bg: '#111111' },
];

const HeroSlider = () => {
  const [cur, setCur] = useState(0);
  useEffect(() => { const id = setInterval(() => setCur(c => (c + 1) % heroSlides.length), 5000); return () => clearInterval(id); }, []);
  const slide = heroSlides[cur];
  return (
    <div className="relative overflow-hidden rounded-lg flex-1" style={{ background: slide.bg, minHeight: 340 }}>
      <div className="px-8 md:px-14 py-12 flex items-center justify-between gap-6 h-full">
        <div className="text-white max-w-xs z-10">
          <div className="flex items-center gap-3 mb-4">
            <img src={iconApple} alt="logo" className="w-6 h-6 invert opacity-80" />
            <span className="text-sm text-gray-300">{slide.badge}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold leading-snug mb-6 whitespace-pre-line">{slide.title}</h1>
          <Link to="/shop" className="flex items-center gap-2 text-white border-b border-white pb-0.5 hover:text-primary hover:border-primary transition-colors text-sm font-medium w-fit">
            Shop Now <ArrowRight size={16} />
          </Link>
        </div>
        <div className="hidden md:flex w-60 h-60 lg:w-72 lg:h-72 shrink-0 items-center justify-center">
          <img src={slide.img} alt={slide.badge} className="w-full h-full object-cover rounded-lg" />
        </div>
      </div>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, i) => (
          <button key={i} onClick={() => setCur(i)}
            className={`rounded-full transition-all duration-300 ${i === cur ? 'bg-primary w-5 h-2.5' : 'bg-white/40 w-2.5 h-2.5'}`} />
        ))}
      </div>
      <button onClick={() => setCur(c => (c - 1 + heroSlides.length) % heroSlides.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors">
        <ChevronLeft size={16} />
      </button>
      <button onClick={() => setCur(c => (c + 1) % heroSlides.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors">
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

/* ─── Category Sidebar ───────────────────────────────────────────── */
const CategorySidebar = () => (
  <div className="hidden lg:block border-r border-gray-200 pr-6 min-w-[200px]">
    <ul className="space-y-3">
      {categories.map(cat => (
        <li key={cat.id}>
          <Link to={`/shop?category=${cat.slug}`}
            className="flex items-center text-sm text-dark hover:text-primary transition-colors group">
            <span className="group-hover:underline">{cat.name}</span>
            <ChevronRight size={13} className="ml-auto text-gray-400 group-hover:text-primary" />
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

/* ─── SVG Category Icons ─────────────────────────────────────────── */
const IconPhone = ({ active }) => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : 'currentColor'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
);
const IconComputer = ({ active }) => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : 'currentColor'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8,21 12,17 16,21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const IconWatch = ({ active }) => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : 'currentColor'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="6"/><polyline points="12,10 12,12 13,13"/>
    <path d="M9 2h6l1 4H8L9 2z"/><path d="M8 18l1 4h6l1-4"/>
  </svg>
);
const IconCamera = ({ active }) => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : 'currentColor'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);
const IconHeadphones = ({ active }) => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : 'currentColor'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/>
    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
  </svg>
);
const IconGamepad = ({ active }) => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : 'currentColor'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/>
    <circle cx="15" cy="11" r="1" fill={active ? '#fff' : 'currentColor'}/><circle cx="17" cy="13" r="1" fill={active ? '#fff' : 'currentColor'}/>
    <path d="M6 6h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2l-2 2H8l-2-2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/>
  </svg>
);

/* ─── Category Cards ─────────────────────────────────────────────── */
const categoryItems = [
  { name: 'Phones',      Icon: IconPhone,      slug: 'electronics' },
  { name: 'Computers',   Icon: IconComputer,   slug: 'electronics' },
  { name: 'SmartWatch',  Icon: IconWatch,       slug: 'electronics' },
  { name: 'Camera',      Icon: IconCamera,      slug: 'electronics' },
  { name: 'HeadPhones',  Icon: IconHeadphones,  slug: 'electronics' },
  { name: 'Gaming',      Icon: IconGamepad,     slug: 'electronics' },
];

const CategoryCards = () => {
  const [active, setActive] = useState(null);
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
      {categoryItems.map((cat, i) => {
        const isActive = active === i;
        return (
          <Link key={i} to={`/shop?category=${cat.slug}`}
            onClick={() => setActive(i)}
            className={`flex flex-col items-center justify-center gap-3 py-6 border rounded-md transition-all duration-200 cursor-pointer
              ${isActive
                ? 'bg-primary border-primary text-white'
                : 'border-gray-200 text-dark hover:bg-primary hover:border-primary hover:text-white group'
              }`}>
            <cat.Icon active={isActive} />
            <span className="text-sm font-medium">{cat.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

/* ─── Products Carousel ──────────────────────────────────────────── */
const ProductsCarousel = ({ products: prods }) => {
  const ref = useRef(null);
  const scroll = dir => ref.current?.scrollBy({ left: dir * 280, behavior: 'smooth' });
  return (
    <div className="relative">
      <button onClick={() => scroll(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
        <ChevronLeft size={18} />
      </button>
      <div ref={ref} className="flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {prods.map(p => (
          <div key={p.id} className="snap-start shrink-0 w-56 md:w-60">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      <button onClick={() => scroll(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

/* ─── Testimonials ───────────────────────────────────────────────── */
const avatarMap = { personManBlue, personWoman, personManSuit };

const TestimonialsCarousel = () => {
  const [cur, setCur] = useState(0);
  const t = testimonials[cur];
  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <img src={avatarMap[t.avatarKey]} alt={t.name}
            className="w-16 h-16 rounded-full object-cover object-top border-2 border-primary bg-gray-100" />
          <div>
            <p className="font-semibold">{t.name}</p>
            <p className="text-sm text-gray-500">{t.role}</p>
          </div>
        </div>
        <div className="flex gap-0.5 mb-4">
          {[1,2,3,4,5].map(s => <span key={s} className={s <= t.rating ? 'text-[#FFAD33]' : 'text-gray-300'}>★</span>)}
        </div>
        <p className="text-sm text-gray-600 leading-relaxed italic">"{t.text}"</p>
      </div>
      <div className="flex items-center justify-end gap-2 mt-4">
        <button onClick={() => setCur(c => (c - 1 + testimonials.length) % testimonials.length)}
          className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
          <ChevronLeft size={14} />
        </button>
        <button onClick={() => setCur(c => (c + 1) % testimonials.length)}
          className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

/* ─── Page ───────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6 items-stretch">
          <CategorySidebar />
          <HeroSlider />
        </div>
      </section>

      {/* Flash Sales */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
          <div>
            <SectionHeader tag="Today's" title="Flash Sales" className="mb-4" />
            <CountdownTimer />
          </div>
          <div className="hidden md:flex gap-2">
            <button className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><ChevronLeft size={18} /></button>
            <button className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><ChevronRight size={18} /></button>
          </div>
        </div>
        <ProductsCarousel products={flashSaleProducts} />
        <div className="flex justify-center mt-10">
          <Link to="/shop?filter=flash-sale" className="bg-primary text-white px-12 py-3 rounded text-sm font-medium hover:bg-primary-hover transition-colors">
            View All Products
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4"><hr className="border-gray-200" /></div>

      {/* Browse by Category */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader tag="Categories" title="Browse By Category" className="mb-0" />
          <div className="hidden md:flex gap-2">
            <button className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><ChevronLeft size={18} /></button>
            <button className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><ChevronRight size={18} /></button>
          </div>
        </div>
        <CategoryCards />
      </section>

      <div className="max-w-7xl mx-auto px-4"><hr className="border-gray-200" /></div>

      {/* Best Selling */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-8">
          <SectionHeader tag="This Month" title="Best Selling Products" className="mb-0" />
          <Link to="/shop?filter=best-selling" className="hidden md:block bg-primary text-white px-8 py-3 rounded text-sm font-medium hover:bg-primary-hover transition-colors">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {bestSellingProducts.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Music Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-dark text-white rounded-lg overflow-hidden relative flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12 gap-8">
          <div className="absolute bottom-0 right-1/4 w-56 h-56 rounded-full border-[40px] border-gray-700 opacity-20 pointer-events-none" />
          <div className="relative z-10">
            <span className="text-[#00FF66] text-sm font-semibold">Categories</span>
            <h2 className="text-3xl md:text-4xl font-semibold mt-2 mb-6 max-w-xs leading-snug">
              Enhance Your Music Experience
            </h2>
            <CountdownSmall />
            <Link to="/shop?category=electronics"
              className="mt-8 inline-block bg-[#00FF66] text-dark font-semibold px-8 py-3 rounded hover:bg-green-400 transition-colors">
              Buy Now!
            </Link>
          </div>
          <img src={imgJBLSpeaker} alt="JBL Speaker"
            className="relative z-10 w-56 md:w-64 object-contain drop-shadow-2xl" />
        </div>
      </section>

      {/* Explore Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <SectionHeader tag="Our Products" title="Explore Our Products" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          {featuredProducts.slice(0, 8).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="flex justify-center">
          <Link to="/shop" className="bg-primary text-white px-12 py-3 rounded text-sm font-medium hover:bg-primary-hover transition-colors">
            View All Products
          </Link>
        </div>
      </section>

      {/* New Arrival */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <SectionHeader tag="Featured" title="New Arrival" />
        {/* Grid: left big card + right 2-row stack — fixed heights matching Figma */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ height: 560 }}>

          {/* LEFT — PlayStation 5 full height */}
          <Link to="/product/15"
            className="relative bg-[#111] rounded-lg overflow-hidden group block">
            {/* PS5 console fills the card, object-cover so it looks bold */}
            <img src={imgPS5Console} alt="PlayStation 5"
              className="absolute inset-0 w-full h-full object-contain object-center scale-95 group-hover:scale-100 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
            <div className="absolute bottom-8 left-8 text-white z-10">
              <h3 className="text-2xl font-semibold mb-1">PlayStation 5</h3>
              <p className="text-sm text-gray-300 mb-3 max-w-[200px]">
                Black and White version of the PS5 coming out on sale.
              </p>
              <span className="text-sm font-medium underline underline-offset-2 hover:text-primary">Shop Now</span>
            </div>
          </Link>

          {/* RIGHT column — top banner + 2 small cards */}
          <div className="flex flex-col gap-4 h-full">

            {/* Top right — Women's Collections using fashion hat photo */}
            <Link to="/shop?category=womens-fashion"
              className="relative bg-[#111] rounded-lg overflow-hidden group block flex-1">
              <img src={heroFashionHat} alt="Women's Collections"
                className="absolute inset-0 w-full h-full object-cover object-top opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
              <div className="absolute bottom-6 left-6 text-white z-10">
                <h3 className="text-xl font-semibold mb-1">Women's Collections</h3>
                <p className="text-xs text-gray-300 mb-2">Featured woman collections that give you another vibe.</p>
                <span className="text-sm font-medium underline underline-offset-2 hover:text-primary">Shop Now</span>
              </div>
            </Link>

            {/* Bottom two small cards */}
            <div className="grid grid-cols-2 gap-4" style={{ height: 220 }}>

              {/* Speakers — Amazon Echo */}
              <Link to="/product/20"
                className="relative bg-[#111] rounded-lg overflow-hidden group block">
                <img src={imgAmazonSpeaker} alt="Speakers"
                  className="absolute inset-0 w-full h-full object-contain object-center p-4 opacity-85 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white z-10">
                  <h3 className="text-base font-semibold mb-0.5">Speakers</h3>
                  <p className="text-[11px] text-gray-300 mb-1.5">Amazon wireless speakers</p>
                  <span className="text-xs font-medium underline underline-offset-2 hover:text-primary">Shop Now</span>
                </div>
              </Link>

              {/* Perfume — Gucci Intense Oud */}
              <Link to="/product/17"
                className="relative bg-[#111] rounded-lg overflow-hidden group block">
                <img src={imgGucciPerfume} alt="Perfume"
                  className="absolute inset-0 w-full h-full object-contain object-center p-3 opacity-85 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white z-10">
                  <h3 className="text-base font-semibold mb-0.5">Perfume</h3>
                  <p className="text-[11px] text-gray-300 mb-1.5">GUCCI INTENSE OUD EDP</p>
                  <span className="text-xs font-medium underline underline-offset-2 hover:text-primary">Shop Now</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <SectionHeader tag="Testimonial" title="What Our Customers Say" />
        <TestimonialsCarousel />
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-4">
          {[
            { icon: <Truck size={36} />,       title: 'FREE AND FAST DELIVERY',  desc: 'Free delivery for all orders over $140' },
            { icon: <Headphones size={36} />,  title: '24/7 CUSTOMER SERVICE',   desc: 'Friendly 24/7 customer support'          },
            { icon: <ShieldCheck size={36} />, title: 'MONEY BACK GUARANTEE',    desc: 'We return money within 30 days'          },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-dark rounded-full flex items-center justify-center text-white ring-8 ring-gray-200">{s.icon}</div>
              <div>
                <h4 className="font-semibold text-sm uppercase tracking-wide">{s.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
